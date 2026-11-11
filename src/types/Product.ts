
type Review = {
    rating: number;
    comment?: string;
    date: string;
    reviewerName: string;
    reviewerEmail?: string;
};

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