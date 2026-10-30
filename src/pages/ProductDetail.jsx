import { useEffect, useState } from "react";
import {Link, useParams } from "react-router";
import styles from "./ProductDetail.module.css"

function ProductDetail() {
    // 사용자가 "저 상품 상세 내용을 보고 싶어"를 요청한 상황
    // 백엔드에게 "저 상품"의 상세 내용을 받아와야 함
    // "저 상품" 예를 들어 4번 상품이라고 한 정보는 "경로"에 있음

    const{ id } = useParams(); // 경로상 동적 라우팅의 값을 react-router가 갖고 있고 그 정보를 받아와야 함
    const [rating, setRating] = useState(0);
    // 4 라는, 사용자가 원하는 상품 번호를 알아왔으니
    // 백엔드에게 4번 상품 정보를 요청, 가공, 저장
    // 화면에 출력

    // 님들이 구현해라이

    const [detail, setDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        fetch(`https://dummyjson.com/products/${id}`)
            .then(res => res.json())
            .then(json => {
                setDetail(json);
                setLoading(false);
            })
            .catch(err => {
                console.log(err)
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (detail === null) {
        return <p>상품에 대한 상세 정보를 불러오지 못했습니다.</p>;
    }

    return (
        <div className={styles.container}>
            <Link to={"/"} className={styles.backButton}>
                &larr; 목록으로 돌아가기
            </Link>
            <div className={styles.descriptionTop}>
                <div className={styles.imgContainer}>
                    <img src={detail.images} alt={detail.title} />
                    <img src={detail.thumbnail} alt={detail.title} />
                </div>
                <div>
                    <div style={{ fontWeight: "bold" }}>{detail.title}</div>
                    <div style={{ color: "#64748B" }}>{detail.shippingInformation}</div>
                    <div style={{ color: "grey", textDecoration: "line-through" }}>
                        {detail.price}
                    </div>
                    <div style={{ color: "red" }}>{detail.discountPercentage}% discount</div>
                    <div style={{ color: "#2563EB", fontWeight: "bold" }}>{detail.price}</div>
                </div>
            </div>
            <div className={styles.descriptionBottom}>
                <div className={styles.text}>{detail.description}</div>
                <div className={styles.reviewList}>
                    {detail.reviews.map((item, index) => {
                        return (
                            <div key={index} className={styles.review}>
                                <div>{item.rating}</div>
                                <div>{item.comment}</div>
                                <div>{item.date}</div>
                                <div>{item.reviewerName}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;