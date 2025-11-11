"use client";

import Image from "next/image";
import Link from "next/link";
import { LucideShoppingBasket } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import no_image from "/img/default_logo.png";

interface Product {
  id: number;
  name: string;
  price?: number;
  brand_name?: string;
  category_name?: string;
  images?: { id: number; image_url: string }[];
}

type ProductProps = {
  products: Product[];
};

export default function ProductCard({ products }: ProductProps) {
  const { addToCart } = useCart();

  return (
    <div
      className="
        grid 
        gap-6 
        sm:gap-7
        md:gap-8
        [grid-template-columns:repeat(auto-fill,minmax(200px,1fr))]
      "
    >
      {products?.map((product) => {
        const imageUrl =
          product.images && product.images.length > 0
            ? product.images[0].image_url
            : no_image.src;

        return (
          <Link key={product.id} href={`/product/${product.id}`}>
            <div className="rounded-xl border border-gray-200 shadow hover:shadow-lg hover:scale-[1.02] transition duration-300 flex flex-col bg-white">
              <div className="relative w-full aspect-square overflow-hidden rounded-t-xl bg-slate-100">
                <Image
                  src={imageUrl}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="px-3 py-3 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="font-normal text-gray-800 text-base line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-1">
                    {product.brand_name || ""}{" "}
                    {product.category_name
                      ? `• ${product.category_name}`
                      : ""}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <span className="font-bold text-[#1d3b86]">
                    {product.price
                      ? `${product.price.toLocaleString()}₮`
                      : "Үнэ тодорхойгүй"}
                  </span>
                  <button
                    type="button"
                    className="bg-[#d49943] hover:bg-[#1d3b86] text-white p-2 rounded-full shadow-md transition"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      addToCart({
                        id: product.id,
                        name: product.name,
                        price: product.price ?? 0,
                        image_url: imageUrl,
                        quantity: 1,
                      });
                    }}
                  >
                    <LucideShoppingBasket size={18} />
                  </button>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
