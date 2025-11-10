"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

type ProductProps = {
  product: {
    id: number;
    product_name: string;
    product_image: string;
    price: number;
    discount_price?: number | null;
    category_name?: string;
  };
};

export default function ProductCard({ product }: ProductProps) {
  const {
    id,
    product_name,
    product_image,
    price,
    discount_price,
    category_name,
  } = product;

  return (
    <div className="group relative bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden border border-gray-100">
      {/* Image Section */}
      <Link href={`/product/${id}`}>
        <div className="relative w-full h-56 overflow-hidden">
          <Image
            src={product_image || "/no-image.png"}
            alt={product_name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {discount_price && (
            <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
              -{Math.round(((price - discount_price) / price) * 100)}%
            </span>
          )}
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4 flex flex-col gap-2">
        {category_name && (
          <p className="text-xs text-gray-400 uppercase tracking-wide">
            {category_name}
          </p>
        )}
        <Link
          href={`/product/${id}`}
          className="text-gray-800 font-medium text-sm line-clamp-2 group-hover:text-blue-700 transition"
        >
          {product_name}
        </Link>

        {/* Price */}
        <div className="flex items-center gap-2 mt-1">
          {discount_price ? (
            <>
              <p className="text-lg font-semibold text-red-500">
                ₮{discount_price.toLocaleString()}
              </p>
              <p className="text-sm text-gray-400 line-through">
                ₮{price.toLocaleString()}
              </p>
            </>
          ) : (
            <p className="text-lg font-semibold text-gray-800">
              ₮{price.toLocaleString()}
            </p>
          )}
        </div>

        {/* Add to Cart */}
        <button
          className="mt-2 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-xl transition"
          onClick={() => console.log("Add to cart:", id)}
        >
          <ShoppingCart size={16} />
          Сагсанд нэмэх
        </button>
      </div>
    </div>
  );
}
