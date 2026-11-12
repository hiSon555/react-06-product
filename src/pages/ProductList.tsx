import { useEffect, useState } from "react";
import { Link } from "react-router";
import type { ProductDetails, ProductLists } from "../types/Product.ts";
import { Message } from "../style/CommonStyle.ts";
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    padding: 32px 16px;
`;

const Title = styled.h1`
    font-size: 28px;
    margin-bottom: 24px;
`;

const ListWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
`;

const Card = styled(Link)`
    border: 1px solid #e5e5e5;
    border-radius: 12px;
    overflow: hidden;
    background: white;
    text-decoration: none;
    width: calc(25% - 15px);

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.12);
    }
`;

const Thumbnail = styled.img`
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    background-color: #f3f3f3;
`;

const Info = styled.div`
    padding: 12px 16px 16px;
`;

const Name = styled.h3`
    font-size: 16px;
    margin-bottom: 6px;
`;

const Price = styled.p`
    font-weight: bold;
    color: #2563eb;
`;

function ProductList() {
    //      list의 타입은?  초기값으로 array가 들어갔으니 타입 array
    //      배열이라는 타입은 무언가 데이터 덩어리를 여러개 가질 수 있다는 타입
    //      any[]   (X)     => 확실한 걸로 추론이 가능한지, 가능성을 갖고 추론을 해주지 않음
    //      never[] (O)     =>
    //      배열 값을 변수나 state에 사용한다면, 꼭 타입 명시가 필요함

    const [list, setList] = useState<ProductDetails[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://dummyjson.com/products?limit=12")
            .then(res =>
                // 백엔드에게 받아서 온 내용이 담긴 res엔 모든 내용이 다 담겨있음
                // 모든 내용을 가공 처리함
                res.json(),
            )
            .then((json: ProductLists) => {
                // 모든내용을 가공한 결과물이 json으로 옴
                // []이었다면 그 자리에 저장하려 하니
                // 프로퍼티 값만 남기고 나머지는 다 버림
                setList(json.products);
                setLoading(false);
            })
            .catch((err: unknown) => {
                if (err instanceof Error) {
                    console.error(err.message);
                } else {
                    console.log("알 수 없는 에러 : " + err);
                }
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <Message>LOADING...</Message>;
    }
    if (list.length === 0) {
        return <Message>상품을 찾을 수 없거나, 오류가 발생되었습니다.</Message>;
    }

    return (
        <Container>
            <Title>상품 목록</Title>
            <ListWrap>
                {list.map(item => {
                    return (
                        <Card to={`/product/${item.id}`} key={item.id}>
                            <Thumbnail src={item.thumbnail} alt={item.title} />
                            <Info>
                                <Name>{item.title}</Name>
                                <Price>${item.price}</Price>
                            </Info>
                        </Card>
                    );
                })}
            </ListWrap>
        </Container>
    );
}

export default ProductList;
