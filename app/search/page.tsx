"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "@/components/products/ProductCard";
import SkeletonCard from "@/components/SkeletonCard";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/product/search?q=${query}`
        );
        setProducts(res.data);
      } catch (err) {
        console.error("Хайлтын алдаа:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-lg font-semibold mb-6 text-gray-800">
        “{query}” хайлтын үр дүн
      </h1>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {[...Array(8)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : products.length > 0 ? (
        <ProductCard products={products} />
      ) : (
        <p className="text-gray-500 text-center">Таны хайсан бараа олдсонгүй 😕</p>
      )}
    </div>
  );
}
