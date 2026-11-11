import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import styles from "./ProductDetail.module.css";
import type { ProductDetails } from "../types/Product.ts";

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
        return <div className={styles.loading}>Loading....</div>;
    }

    if (!detail) {
        return <div className={styles.empty}>상품에 대한 상세 정보를 불러오지 못했습니다.</div>;
    }

    return (
        <div className={styles.container}>
            <Link to={"/"} className={styles.backButton}>
                &larr; 목록으로 돌아가기
            </Link>
            <div className={styles.descriptionTop}>
                <div className={styles.imgContainer}>
                    <img src={detail.images[0]} alt={detail.title} />
                    <img src={detail.thumbnail} alt={detail.title} />
                </div>
                <div className={styles.info}>
                    <div style={{ fontWeight: "bold" }}>{detail.title}</div>
                    <div className={styles.badge}>{detail.category}</div>
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
