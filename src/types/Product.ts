
type Review = {
    rating: number;
    comment?: string;
    date: string;
    reviewerName: string;
    reviewerEmail?: string;
};

// 그러면, 매 백엔드 요청을 보내서 데이터를 받아올 때
// 이 모든 내용들을 타입으로 지정해서 써야 되는가?
export type ProductDetails = {
    id: number;
    title: string;
    price: number;
    discountPercentage?: number;
    thumbnail: string;
    category?: string;
    shippingInformation?: string;
    description: string;
    images: string[];
    reviews: Review[];
};

export type ProductLists = {
    products: ProductDetails[];
}