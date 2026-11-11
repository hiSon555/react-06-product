import { useEffect, useState } from "react";
import styles from "./ProductList.module.css";
import { Link } from "react-router";
import type { ProductDetails, ProductLists } from "../types/Product.ts";

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
        return <div className={styles.loading}>LOADING...</div>
    }
    if (list.length === 0) {
        return <div className={styles.loading}>상품을 찾을 수 없거나, 오류가 발생되었습니다.</div>;
    }

    return <div className={styles.container}>
        <h1 className={styles.title}>상품 목록</h1>
        <div className={styles.listWrap}>
            {list.map((item) => {
                return <Link to={`/product/${item.id}`} key={item.id} className={styles.card}>
                    <img src={item.thumbnail} alt={item.title} className={styles.thumbnail}/>
                    <div className={styles.info
                         }>
                        <h3 className={styles.name}>{item.title}</h3>
                        <p className={styles.price}>${item.price}</p>
                    </div>
                </Link>
            })}
        </div>
    </div>;
}

export default ProductList;
