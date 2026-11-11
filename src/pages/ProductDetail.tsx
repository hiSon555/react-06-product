import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { ProductDetails } from "../types/Product.ts";
import { BackBtn, Message } from "../style/CommonStyle.ts";
import styled from "styled-components";

const Container = styled.div`
    padding: 32px 16px;
    margin: 0 auto;
    height: 100vh;
    width: 100%;
    max-width: 1000px;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 10px;
    gap: 10px;
`;

const DescriptionTop = styled.div`
    display: flex;
    align-items: center;
    font-size: 1.4rem;
    gap: 32px;
`;

const ImgContainer = styled.div`
    width: 50%;
    max-width: 500px;
    max-height: 300px;
    object-fit: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background-color: #f8f9fb;

    img {
        width: 150px;
        height: 150px;
    }
`;

const Info = styled.div`
    width: 50%;
`;

const Badge = styled.div`
    width: 60px;
    font-size: 12px;
    font-weight: 600;
    padding: 2px 10px;
    border-radius: 999px;
    background-color: #eef2ff;
    color: #3730a3;
    text-align: center;
`;

const DescriptionBottom = styled.div`
    display: flex;
    justify-content: space-between;
    flex: 1;
    gap: 20px;
    background-color: #f1f5f9;
`;

const Text = styled.div`
    width: 50%;
    overflow-wrap: break-word;
`;

const ReviewList = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 20px;
`;

const Review = styled.div`
    display: flex;
    flex-direction: column;
`;

function ProductDetail() {
    const { id } = useParams();

    const [detail, setDetail] = useState<ProductDetails | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${id}`)
            .then(res => res.json())
            .then((json: ProductDetails) => setDetail(json))
            .catch((err: unknown) => {
                if (err instanceof Error) {
                    console.error(err.message);
                } else {
                    console.log("알 수 없는 에러 " + err); }
                })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <Message>Loading....</Message>;
    }

    if (!detail) {
        return <Message>상품에 대한 상세 정보를 불러오지 못했습니다.</Message>;
    }

    return (
        <Container>
            <BackBtn to={"/"}>
                &larr; 목록으로 돌아가기
            </BackBtn>
            <DescriptionTop>
                <ImgContainer>
                    <img src={detail.images[0]} alt={detail.title} />
                    <img src={detail.thumbnail} alt={detail.title} />
                </ImgContainer>
                <Info>
                    <div style={{ fontWeight: "bold" }}>{detail.title}</div>
                    <Badge>{detail.category}</Badge>
                    <div style={{ color: "#64748B" }}>{detail.shippingInformation}</div>
                    <div style={{ color: "grey", textDecoration: "line-through" }}>
                        {detail.price}
                    </div>
                    <div style={{ color: "red" }}>{detail.discountPercentage}% discount</div>
                    <div style={{ color: "#2563EB", fontWeight: "bold" }}>{detail.price}</div>
                </Info>
            </DescriptionTop>
            <DescriptionBottom>
                <Text>{detail.description}</Text>
                <ReviewList>
                    {detail.reviews.map((item, index) => {
                        return (
                            <Review key={index}>
                                <div>{item.rating}</div>
                                <div>{item.comment}</div>
                                <div>{item.date}</div>
                                <div>{item.reviewerName}</div>
                            </Review>
                        );
                    })}
                </ReviewList>
            </DescriptionBottom>
        </Container>
    );
}

export default ProductDetail;
