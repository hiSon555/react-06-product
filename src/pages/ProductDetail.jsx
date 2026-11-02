import { useEffect, useState } from "react";
import {Link, useParams } from "react-router";
import styles from "./ProductDetail.module.css"

function ProductDetail() {
    // 사용자가 "저 상품 상세 내용을 보고 싶어"를 요청한 상황
    // 백엔드에게 "저 상품"의 상세 내용을 받아와야 함
    // "저 상품" 예를 들어 4번 상품이라고 한 정보는 "경로"에 있음

    const{ id } = useParams(); // 경로상 동적 라우팅의 값을 react-router가 갖고 있고 그 정보를 받아와야 함
    // 4 라는, 사용자가 원하는 상품 번호를 알아왔으니
    // 백엔드에게 4번 상품 정보를 요청, 가공, 저장
    // 화면에 출력

    // 님들이 구현해라이

    const [detail, setDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        fetch(`https://dummyjson.com/products/${id}`)
            .then(res => res.json())
            .then(json => setDetail(json))
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
                // .finally(함수) 메서드는 메서드 체인으로
                // then을 통해 성공 시나리오든, catch를 통한 실패 시나리오든
                // 상관없이 마지막에 실행되어야 하는 내용을 기록
    }, []);

    // 초기 렌더링에는 loading이 true이므로, 이 아래 if가 출력
    if (loading) {
        return <div className={styles.loading}>Loading...</div>;
    }

    // useEffect가 발동해서 fetch가 실행되는데
    // 정상적으로 데이터를 받아오든, 받아오지 못하든 loading은 false가 됨
    // 이 아래로 내려오는데 실패되면 product state는 갱신되지 못하고 null로 남아있음
    if (!detail) {
        return <div className={styles.empty}>상품에 대한 상세 정보를 불러오지 못했습니다.</div>;
    }

    // loading도 false이고, product도 있는 상황
    return (
        <div className={styles.container}>
            {/*
                react-router가 주소를 관리하는 방식은
                "실제 브라우저의 주소"를 갱신하는 게 아니라,
                부소 표시줄에 "보여지는 것만" 바꿔 쓰는 것

                react는 SPA(Single Page Application)
                        => 브라우저가 관리하는 페이지가 하나

                react-router에서 불러온 Link 컴포넌트는
                a 태그로 화면에는 그려지며,
                그러한 기능 (보여지는 것만 바꿔준다는) 이
                포함되어 있는 컴포넌트

                a 태그 = inline 요소(크기값이 없으니 마진이 불가)
                => display: inline-block이나 block으로 줘서 크기를 줘야 함
            */}
            <Link to={"/"} className={styles.backButton}>
                &larr; 목록으로 돌아가기
            </Link>
            <div className={styles.descriptionTop}>
                <div className={styles.imgContainer}>
                    <img src={detail.images} alt={detail.title} />
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