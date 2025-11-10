// 'use client';

// import React, { useEffect, useState } from 'react';
// import { LucideShoppingBasket, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
// import Image from 'next/image';
// import Link from 'next/link';

// type Product = {
//     id: number;
//     name: string;
//     description?: string;
//     price?: number;
//     stock?: number;
//     image_urls?: string[]; // assume relative paths stored, e.g. ["img1.jpg"]
//     brand_name?: string;
//     category_name?: string;
// };

// interface Props {
//     params: { id: string };
// }

// export default function ProductPage({ params }: Props) {
//     const id = params.id;
//     const [product, setProduct] = useState<Product | null>(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const [mainIndex, setMainIndex] = useState(0);
//     const [qty, setQty] = useState(1);
//     const [related, setRelated] = useState<Product[]>([]);

//     useEffect(() => {
//         const fetchProduct = async () => {
//             try {
//                 setLoading(true);
//                 const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product/${id}`);
//                 if (!res.ok) throw new Error('Product not found');
//                 const json = await res.json();
//                 setProduct(json);
//                 setMainIndex(0);

//                 // fetch related by category (simple)
//                 if (json.category_name) {
//                     const rel = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product?category=${encodeURIComponent(json.category_name)}&limit=8`);
//                     if (rel.ok) {
//                         const relJson = await rel.json();
//                         setRelated(relJson.filter((p: Product) => p.id !== json.id));
//                     }
//                 }
//             } catch (err: any) {
//                 console.error(err);
//                 setError(err.message || 'Алдаа гарлаа');
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchProduct();
//     }, [id]);

//     const addToCart = () => {
//         if (!product) return;
//         const cart = JSON.parse(localStorage.getItem('cart') || '[]');
//         const existing = cart.find((c: any) => c.id === product.id);
//         if (existing) {
//             existing.qty = Math.min((existing.qty || 0) + qty, product.stock ?? 9999);
//         } else {
//             cart.push({
//                 id: product.id,
//                 name: product.name,
//                 price: product.price || 0,
//                 qty,
//                 image: product.image_urls?.[0] || null,
//             });
//         }
//         localStorage.setItem('cart', JSON.stringify(cart));
//         alert('Сагсанд нэмэгдлээ');
//     };

//     if (loading) return <div className="py-20 text-center text-gray-500">Ачааллаж байна...</div>;
//     if (error) return <div className="py-20 text-center text-red-500">{error}</div>;
//     if (!product) return <div className="py-20 text-center text-gray-500">Бараа олдсонгүй</div>;

//     const baseImgUrl = (path: string) => {
//         return path.startsWith('http') ? path : `${process.env.NEXT_PUBLIC_API_URL}${path.startsWith('/') ? '' : '/'}${path}`;
//     };

//     return (
//         <div className="max-w-7xl mx-auto px-4 py-10">
//             {/* Breadcrumb */}
//             <div className="text-sm text-gray-500 mb-4">
//                 <Link href="/" className="hover:underline">Нүүр</Link>
//                 <span className="mx-2">/</span>
//                 {product.category_name ? (<Link href={`/category/${encodeURIComponent(product.category_name)}`} className="hover:underline">{product.category_name}</Link>) : null}
//                 <span className="mx-2">/</span>
//                 <span className="text-gray-800">{product.name}</span>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 {/* Left: images */}
//                 <div>
//                     <div className="rounded-lg border overflow-hidden">
//                         <div className="relative w-full aspect-square bg-slate-100">
//                             {product.image_urls && product.image_urls.length > 0 ? (
//                                 <Image
//                                     src={baseImgUrl(product.image_urls[mainIndex])}
//                                     alt={product.name}
//                                     fill
//                                     className="object-cover transition-transform duration-500 hover:scale-105"
//                                 />
//                             ) : (
//                                 <div className="w-full h-full flex items-center justify-center text-gray-400">Зураг алга</div>
//                             )}
//                         </div>
//                     </div>

//                     {/* thumbnails */}
//                     {product.image_urls && product.image_urls.length > 1 && (
//                         <div className="flex gap-3 mt-4 overflow-x-auto">
//                             {product.image_urls.map((u, i) => (
//                                 <button
//                                     key={i}
//                                     onClick={() => setMainIndex(i)}
//                                     className={`w-20 h-20 rounded-md overflow-hidden border ${i === mainIndex ? 'ring-2 ring-offset-1 ring-[#d49943]' : 'border-gray-200'}`}
//                                 >
//                                     <div className="relative w-full h-full">
//                                         <Image src={baseImgUrl(u)} alt={`${product.name}-${i}`} fill className="object-cover" />
//                                     </div>
//                                 </button>
//                             ))}
//                         </div>
//                     )}
//                 </div>

//                 {/* Right: info */}
//                 <div>
//                     <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">{product.name}</h1>
//                     <p className="text-sm text-gray-500 mt-2">{product.brand_name ? `${product.brand_name} • ` : ''}{product.category_name}</p>

//                     <div className="mt-6 flex items-center gap-4">
//                         <div className="text-3xl font-bold text-[#1d3b86]">
//                             {product.price ? `${Number(product.price).toLocaleString()}₮` : 'Үнэ тодорхойгүй'}
//                         </div>
//                         <div className="text-sm text-gray-500">
//                             {product.stock && product.stock > 0 ? <span className="text-green-600">Бэлэн: {product.stock}</span> : <span className="text-red-500">Бэлэнгүй</span>}
//                         </div>
//                     </div>

//                     {/* Qty + Add to cart */}
//                     <div className="mt-6 flex items-center gap-4">
//                         <div className="flex items-center border rounded-md overflow-hidden">
//                             <button
//                                 onClick={() => setQty((q) => Math.max(1, q - 1))}
//                                 className="px-3 py-2 bg-gray-100"
//                                 aria-label="decrease"
//                             >-</button>
//                             <input
//                                 type="number"
//                                 value={qty}
//                                 onChange={(e) => setQty(Math.max(1, Number(e.target.value || 1)))}
//                                 className="w-20 text-center outline-none p-2"
//                                 min={1}
//                                 max={product.stock ?? 9999}
//                             />
//                             <button
//                                 onClick={() => setQty((q) => Math.min((product.stock ?? 9999), q + 1))}
//                                 className="px-3 py-2 bg-gray-100"
//                                 aria-label="increase"
//                             >+</button>
//                         </div>

//                         <button
//                             onClick={addToCart}
//                             className="flex items-center gap-2 bg-[#d49943] hover:bg-[#bf7e30] text-white px-4 py-3 rounded-md shadow"
//                         >
//                             <LucideShoppingBasket size={18} />
//                             Сагсанд нэмэх
//                         </button>

//                         <button
//                             className="flex items-center gap-2 border px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50"
//                             onClick={() => {
//                                 const fav = JSON.parse(localStorage.getItem('fav') || '[]');
//                                 if (!fav.find((f: any) => f.id === product.id)) {
//                                     fav.push({ id: product.id, name: product.name, image: product.image_urls?.[0] || null });
//                                     localStorage.setItem('fav', JSON.stringify(fav));
//                                     alert('Жагсаалтад нэмэгдлээ');
//                                 } else {
//                                     alert('Өмнө нь нэмэгдсэн байна');
//                                 }
//                             }}
//                         >
//                             <Heart size={16} /> Хадгалах
//                         </button>
//                     </div>

//                     {/* Short specs / meta */}
//                     <div className="mt-6 text-sm text-gray-600 space-y-2">
//                         <div><strong>Брэнд:</strong> {product.brand_name || '-'}</div>
//                         <div><strong>Ангилал:</strong> {product.category_name || '-'}</div>
//                         <div><strong>SKU:</strong> {product.id}</div>
//                     </div>

//                     {/* Description */}
//                     <div className="mt-10 max-w-3xl">
//                         <h3 className="text-lg font-semibold mb-2">Тайлбар</h3>
//                         <p className="text-gray-700 whitespace-pre-line">{product.description || 'Тайлбар байхгүй.'}</p>
//                     </div>
//                 </div>
//             </div>



//             {/* Related */}
//             {related.length > 0 && (
//                 <div className="mt-12">
//                     <h3 className="text-xl font-semibold mb-4">Төcтэй бараа</h3>
//                     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
//                         {related.map((p) => (
//                             <Link key={p.id} href={`/product/${p.id}`} className="rounded-lg border p-2 hover:shadow-md transition">
//                                 <div className="relative w-full aspect-square bg-slate-100 overflow-hidden rounded">
//                                     {p.image_urls && p.image_urls.length > 0 ? (
//                                         <Image src={p.image_urls[0]} alt={p.name} fill className="object-cover" />
//                                     ) : <div className="flex items-center justify-center text-gray-400">Зураггүй</div>}
//                                 </div>
//                                 <div className="mt-2 text-sm font-medium text-gray-800 line-clamp-1">{p.name}</div>
//                                 <div className="mt-1 text-sm text-[#1d3b86] font-semibold">{p.price ? `${Number(p.price).toLocaleString()}₮` : '-'}</div>
//                             </Link>
//                         ))}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }


"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import ProductCard from "@/components/products/ProductCard"; // таны барааны карт компонент
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "all";

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts(tab);
  }, [tab]);

  const fetchProducts = async (type: string) => {
    try {
      setLoading(true);
      let url = `${process.env.NEXT_PUBLIC_API_URL}/api/product`;

      if (type === "new") url += "?sort=new";
      if (type === "popular") url += "?sort=popular";
      if (type === "discount") url += "?discount=true";

      const res = await axios.get(url);
      setProducts(res.data);
    } catch (err) {
      console.error("Бараа татахад алдаа:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Бараанууд</h1>

      <Tabs defaultValue={tab}>
        <TabsList className="flex flex-wrap gap-3 mb-6 bg-gray-100 p-2 rounded-xl">
          <TabsTrigger value="all" asChild>
            <a href="/products" className={tab === "all" ? "bg-white shadow px-4 py-2 rounded-lg" : "px-4 py-2"}>
              Бүх бараа
            </a>
          </TabsTrigger>

          <TabsTrigger value="new" asChild>
            <a href="/products?tab=new" className={tab === "new" ? "bg-white shadow px-4 py-2 rounded-lg" : "px-4 py-2"}>
              🆕 Шинэ бараа
            </a>
          </TabsTrigger>

          <TabsTrigger value="popular" asChild>
            <a href="/products?tab=popular" className={tab === "popular" ? "bg-white shadow px-4 py-2 rounded-lg" : "px-4 py-2"}>
              🔥 Эрэлттэй
            </a>
          </TabsTrigger>

          <TabsTrigger value="discount" asChild>
            <a href="/products?tab=discount" className={tab === "discount" ? "bg-white shadow px-4 py-2 rounded-lg" : "px-4 py-2"}>
              💸 Хямдралтай
            </a>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={tab}>
          {loading ? (
            <div className="text-center py-20 text-gray-500">Уншиж байна...</div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 text-gray-400">Бараа олдсонгүй 😔</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
