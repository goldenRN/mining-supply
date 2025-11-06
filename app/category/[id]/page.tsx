'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

export default function CategoryPage() {
  const { id } = useParams();
  const router = useRouter();

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

  // 🧮 Sort
  const sortedProducts = [...products].sort((a, b) => {
    if (sort === 'new') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    if (sort === 'old') return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    if (sort === 'price-asc') return a.price - b.price;
    if (sort === 'price-desc') return b.price - a.price;
    return 0;
  });

  if (!category)
    return <div className="text-center text-gray-500 mt-20">Ачаалж байна...</div>;

  return (
    <div className="flex max-w-7xl mx-auto min-h-screen text-black">
      {/* --- Sidebar --- */}
      <aside className="w-64 p-6 border-r border-gray-200 bg-gray-50 space-y-6">
        <h2 className="font-bold text-lg text-gray-800 mb-4">Бүх ангилал</h2>
        <div className="space-y-3">
          {categories.map((cat) => (
            <div
              key={cat.category_id}
              onClick={() => router.push(`/category/${cat.category_id}`)}
              className={`cursor-pointer p-2 rounded-md transition ${
                Number(id) === cat.category_id
                  ? 'bg-blue-100 text-blue-700 font-semibold'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <div className="flex items-center gap-2">
                {cat.category_image && (
                  <img
                    src={cat.category_image}
                    alt={cat.category_name}
                    className="w-8 h-8 rounded-md object-cover"
                  />
                )}
                <span>{cat.category_name}</span>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* --- Main --- */}
      <main className="flex-1 p-10 bg-white">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">{category.category_name}</h1>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-sm"
          >
            <option value="new">Шинэ нь эхэндээ</option>
            <option value="old">Хуучин нь эхэндээ</option>
            <option value="price-asc">Үнэ өсөхөөр</option>
            <option value="price-desc">Үнэ буурахаар</option>
          </select>
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {sortedProducts.length === 0 ? (
            <p className="text-gray-500">Бараа олдсонгүй.</p>
          ) : (
            sortedProducts.map((p) => (
              <div
                key={p.id}
                className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden shadow hover:shadow-md transition"
              >
                <Image
                  src={
                    p.images?.[0]?.image_url
                      ? `${p.images[0].image_url}`
                      : '/img/no-image.png'
                  }
                  alt={p.name}
                  width={400}
                  height={400}
                  className="object-cover w-full h-56"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-sm mb-1">{p.name}</h3>
                  <p className="text-gray-700 text-sm">
                    {p.price.toLocaleString()}₮
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
