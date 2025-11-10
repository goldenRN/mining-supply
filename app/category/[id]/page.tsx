// 'use client';

// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import Image from 'next/image';
// import { useParams, useRouter } from 'next/navigation';

// export default function CategoryPage() {
//   const { id } = useParams();
//   const router = useRouter();

//   const [categories, setCategories] = useState<any[]>([]);
//   const [category, setCategory] = useState<any | null>(null);
//   const [products, setProducts] = useState<any[]>([]);
//   const [sort, setSort] = useState('new');

//   const fetchData = async () => {
//     try {
//       const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/category/${id}`);
//       setCategories(res.data.categories || []);
//       setCategory(res.data.category);
//       setProducts(res.data.products || []);
//     } catch (err) {
//       console.error('Fetch error:', err);
//     }
//   };

//   useEffect(() => {
//     if (id) fetchData();
//   }, [id]);

//   // 🧮 Sort
//   const sortedProducts = [...products].sort((a, b) => {
//     if (sort === 'new') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
//     if (sort === 'old') return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
//     if (sort === 'price-asc') return a.price - b.price;
//     if (sort === 'price-desc') return b.price - a.price;
//     return 0;
//   });

//   if (!category)
//     return <div className="text-center text-gray-500 mt-20">Ачаалж байна...</div>;

//   return (
//     <div className="flex max-w-7xl mx-auto min-h-screen text-black">
//       {/* --- Sidebar --- */}
//       <aside className="w-64 p-6 border-r border-gray-200 bg-gray-50 space-y-6">
//         <h2 className="font-bold text-lg text-gray-800 mb-4">Бүх ангилал</h2>
//         <div className="space-y-3">
//           {categories.map((cat) => (
//             <div
//               key={cat.category_id}
//               onClick={() => router.push(`/category/${cat.category_id}`)}
//               className={`cursor-pointer p-2 rounded-md transition ${
//                 Number(id) === cat.category_id
//                   ? 'bg-blue-100 text-blue-700 font-semibold'
//                   : 'hover:bg-gray-100 text-gray-700'
//               }`}
//             >
//               <div className="flex items-center gap-2">
//                 {cat.category_image && (
//                   <img
//                     src={cat.category_image}
//                     alt={cat.category_name}
//                     className="w-8 h-8 rounded-md object-cover"
//                   />
//                 )}
//                 <span>{cat.category_name}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </aside>

//       {/* --- Main --- */}
//       <main className="flex-1 p-10 bg-white">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-2xl font-bold text-gray-800">{category.category_name}</h1>
//           <select
//             value={sort}
//             onChange={(e) => setSort(e.target.value)}
//             className="border border-gray-300 rounded px-3 py-2 text-sm"
//           >
//             <option value="new">Шинэ нь эхэндээ</option>
//             <option value="old">Хуучин нь эхэндээ</option>
//             <option value="price-asc">Үнэ өсөхөөр</option>
//             <option value="price-desc">Үнэ буурахаар</option>
//           </select>
//         </div>

//         {/* Products */}
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//           {sortedProducts.length === 0 ? (
//             <p className="text-gray-500">Бараа олдсонгүй.</p>
//           ) : (
//             sortedProducts.map((p) => (
//               <div
//                 key={p.id}
//                 className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden shadow hover:shadow-md transition"
//               >
//                 <Image
//                   src={
//                     p.images?.[0]?.image_url
//                       ? `${p.images[0].image_url}`
//                       : '/img/no-image.png'
//                   }
//                   alt={p.name}
//                   width={400}
//                   height={400}
//                   className="object-cover w-full h-56"
//                 />
//                 <div className="p-4">
//                   <h3 className="font-semibold text-sm mb-1">{p.name}</h3>
//                   <p className="text-gray-700 text-sm">
//                     {p.price.toLocaleString()}₮
//                   </p>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { LucideShoppingBasket } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/app/context/CartContext';
import no_image from '/img/default_logo.png';
export default function CategoryPage() {
    const { id } = useParams();
    const router = useRouter();
    const { addToCart } = useCart();
    const [categories, setCategories] = useState<any[]>([]);
    const [category, setCategory] = useState<any | null>(null);
    const [products, setProducts] = useState<any[]>([]);
    const [sort, setSort] = useState('new');

    const fetchData = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/category/${id}`);
            setCategories(res.data.categories || []);
            setCategory(res.data.category);
            setProducts(res.data.products || []);
        } catch (err) {
            console.error('Fetch error:', err);
        }
    };

    useEffect(() => {
        if (id) fetchData();
    }, [id]);

    const sortedProducts = [...products].sort((a, b) => {
        if (sort === 'new') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        if (sort === 'old') return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        if (sort === 'price-asc') return a.price - b.price;
        if (sort === 'price-desc') return b.price - a.price;
        return 0;
    });

    if (!category)
        return (
            <div className="flex justify-center items-center min-h-screen text-gray-500">
                Ачаалж байна...
            </div>
        );

    return (
        <div className="flex max-w-7xl mx-auto min-h-screen py-10 bg-gray-50 text-gray-800">
            {/* --- Sidebar --- */}
            <aside className="w-64 px-5 border-r border-gray-200 shadow-sm hidden md:block">
                <h2 className="font-bold text-md mb-5 text-gray-800"> Ангилал</h2>
                <div className="space-y-2">
                    {categories.map((cat) => (
                        <motion.div
                            key={cat.category_id}
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                            onClick={() => router.push(`/category/${cat.category_id}`)}
                            className={`cursor-pointer flex items-center gap-3 p-2 rounded-lg border transition-all duration-200 ${Number(id) === cat.category_id
                                ? 'bg-blue-50  text-blue-700 font-semibold'
                                : 'border-transparent hover:bg-gray-100'
                                }`}
                        >
                            {cat.category_image && (
                                <Image
                                    src={cat.category_image}
                                    alt={cat.category_name}
                                    width={32}
                                    height={32}
                                    className="rounded-md object-cover w-8 h-8"
                                />
                            )}
                            <span className='text-sm'>{cat.category_name}</span>
                        </motion.div>
                    ))}
                </div>
            </aside>

            {/* --- Main --- */}
            <main className="flex-1 p-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">{category.category_name}</h1>
                        <p className="text-gray-500 text-sm mt-1">
                            Нийт {products.length} бараа
                        </p>
                    </div>

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

                {/* Products Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
                >
                    {sortedProducts.length === 0 ? (
                        <p className="text-gray-500 col-span-full text-center">
                            😕 Бараа олдсонгүй.
                        </p>
                    ) : (
                        sortedProducts.map((product) => {
                            const imageUrl: string =
                                product.images && product.images.length > 0
                                    ? product.images[0].image_url
                                    : no_image.src;
                            //   <motion.div
                            //     key={p.id}
                            //     layout
                            //     whileHover={{ scale: 1.03 }}
                            //     transition={{ type: 'spring', stiffness: 300 }}
                            //     className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                            //   >
                            //     <div className="relative w-full h-56">
                            //       <Image
                            //         src={
                            //           p.images?.[0]?.image_url
                            //             ? p.images[0].image_url
                            //             : '/img/no-image.png'
                            //         }
                            //         alt={p.name}
                            //         fill
                            //         className="object-cover"
                            //       />
                            //     </div>
                            //     <div className="p-4 space-y-1">
                            //       <h3 className="font-semibold text-base truncate">{p.name}</h3>
                            //       <p className="text-gray-700 font-medium text-sm">
                            //         {p.price.toLocaleString()}₮
                            //       </p>
                            //     </div>
                            //   </motion.div>
                            return (
                                <Link key={product.id} href={`/product/${product.id}`}>
                                    <div className="rounded-xl border border-gray-200 shadow hover:shadow-xl hover:scale-[1.02] transition duration-300 flex flex-col bg-white">
                                        <div className="w-full p-1">
                                            <div className="relative w-full aspect-square overflow-hidden rounded-lg bg-slate-100">
                                                <Image
                                                    src={imageUrl}
                                                    alt={product.name}
                                                    width={50}
                                                    height={50}
                                                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                        </div>

                                        <div className="px-3 py-3 flex flex-col flex-grow justify-between">
                                            <div>
                                                <h3 className="font-normal text-gray-800 text-base line-clamp-1">{product.name}</h3>
                                                <p className="text-sm text-gray-500 line-clamp-1">
                                                    {product.brand_name || ''} {product.category_name ? `• ${product.category_name}` : ''}
                                                </p>
                                            </div>

                                            <div className="flex items-center justify-between mt-3">
                                                <span className="font-bold text-[#1d3b86]">
                                                    {product.price ? `${product.price.toLocaleString()}₮` : 'Үнэ тодорхойгүй'}
                                                </span>
                                                <button
                                                    type="button"
                                                    className="bg-[#d49943] hover:bg-[#1d3b86] text-white p-2 rounded-full shadow-md transition"
                                                    onClick={(e) => {
                                                        e.preventDefault() // 👈 Link чиглэлд явахгүй
                                                        e.stopPropagation()
                                                        addToCart({
                                                            id: product.id,
                                                            name: product.name,
                                                            price: product.price ?? 0,
                                                            image_url: imageUrl,
                                                            quantity: 1,
                                                        })
                                                    }}
                                                >
                                                    <LucideShoppingBasket size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                    )}
                </motion.div>
            </main>
        </div>
    );
}
