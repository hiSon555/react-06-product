import { useEffect, useState } from "react";
import { Link } from "react-router";
import type { ProductDetails, ProductLists } from "../types/Product.ts";
import {Message} from "../style/CommonStyle.ts";
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
    const [list, setList] = useState<ProductDetails[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://dummyjson.com/products?limit=12")
            .then(res => res.json())
            .then((json:ProductLists) => {
                setList(json.products);
                setLoading(false);
            })
            .catch((err:unknown) => {
                if (err instanceof Error) {
                    console.error(err.message);
                } else {
                console.log("알 수 없는 에러 : " + err); }
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <Message>LOADING...</Message>
    }
    if (list.length === 0) {
        return <Message>상품을 찾을 수 없거나, 오류가 발생되었습니다.</Message>;
    }

    return <Container>
        <Title>상품 목록</Title>
        <ListWrap>
            {list.map((item) => {
                return <Card to={`/product/${item.id}`} key={item.id}>
                    <Thumbnail src={item.thumbnail} alt={item.title}/>
                    <Info>
                        <Name>{item.title}</Name>
                        <Price>${item.price}</Price>
                    </Info>
                </Card>
            })}
        </ListWrap>
    </Container>;
}

export default ProductList;
