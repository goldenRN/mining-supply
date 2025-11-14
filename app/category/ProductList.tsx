"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "@/components/products/ProductCard";

interface ProductListProps {
    categoryId: number | null;
    subId?: number | null;
    catName: string | null;
    subcatName?: string | null;
    description?: string | null;
}

export default function ProductList({
    categoryId,
    subId,
    catName,
    subcatName,
    description
}: ProductListProps) {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [sort, setSort] = useState("new");

    useEffect(() => {
        if (!categoryId && !subId) return;

        const fetchProducts = async () => {
            try {
                setLoading(true);
                const url = subId
                    ? `${process.env.NEXT_PUBLIC_API_URL}/api/product/products-by-category/${categoryId}?sub=${subId}`
                    : `${process.env.NEXT_PUBLIC_API_URL}/api/product/products-by-category/${categoryId}`;
                const res = await axios.get(url);
                setProducts(res.data.products || []);
            } catch (err) {
                console.error("Fetch products error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [categoryId, subId]);

    // 🔹 Эрэмбэлэлт
    const sortedProducts = [...products].sort((a, b) => {
        if (sort === "new")
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        if (sort === "old")
            return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        if (sort === "price-asc") return a.price - b.price;
        if (sort === "price-desc") return b.price - a.price;
        return 0;
    });

    // 🔹 Хоосон subcatName шалгах
    const validSubcatName =
        subcatName && subcatName !== "null" && subcatName.trim() !== ""
            ? subcatName
            : null;

    if (loading)
        return (
            <div className="flex-1 flex justify-center items-center">
                ⏳ Уншиж байна...
            </div>
        );

    return (
        <div className="flex-1 px-8">
            <main className="flex-1 p-8">
                <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
                    {(catName || validSubcatName) && (
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">
                                {catName}
                                {catName && validSubcatName ? " - " : ""}
                                {validSubcatName}
                            </h1>
                            {description && description !== "null" && description.trim() !== "" && (
                                <p className="text-gray-500 text-sm mt-1">{description}</p>
                            )}
                            {products.length > 0 && (
                                <p className="text-gray-500 text-sm mt-1">
                                    Нийт {products.length} бараа
                                </p>
                            )}
                        </div>
                    )}

                    <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-600">Эрэмбэлэх:</label>
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="new">Шинэ нь эхэндээ</option>
                            <option value="old">Хуучин нь эхэндээ</option>
                            <option value="price-asc">Үнэ өсөхөөр</option>
                            <option value="price-desc">Үнэ буурахаар</option>
                        </select>
                    </div>
                </div>

                {sortedProducts.length === 0 ? (
                    <p className="text-gray-500 text-center mt-20">Бараа олдсонгүй.</p>
                ) : (
                    <ProductCard products={sortedProducts} />
                )}
            </main>
        </div>
    );
}
