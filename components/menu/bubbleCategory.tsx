"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

const BubbleCategory = () => {
  const [categories, setCategories] = useState<any[]>([]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/category`);
      setCategories(res.data);
    } catch (err) {
      console.error("Category татахад алдаа:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
  {/* Mobile: scroll */}
  <div className="flex sm:hidden overflow-x-auto gap-6 px-2">
    {categories.map((cat) => (
      <Link
        key={cat.category_id}
        href={`/category/${cat.category_id}`}
        className="flex flex-col items-center group cursor-pointer w-24 flex-shrink-0"
      >
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center transition group-hover:bg-gray-200 shadow-sm">
          <Image
            src={cat.category_image}
            alt={cat.category_name}
            width={48}
            height={48}
            className="object-contain"
          />
        </div>
        <p className="mt-3 text-sm text-gray-700 text-center font-medium group-hover:text-gray-900">
          {cat.category_name}
        </p>
      </Link>
    ))}
  </div>

  {/* Desktop: grid */}
  <div className="hidden sm:grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-10 justify-items-center">
    {categories.map((cat) => (
      <Link
        key={cat.category_id}
        href={`/category/${cat.category_id}`}
        className="flex flex-col items-center group cursor-pointer w-24"
      >
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center transition group-hover:bg-gray-200 shadow-sm">
          <Image
            src={cat.category_image}
            alt={cat.category_name}
            width={48}
            height={48}
            className="object-contain"
          />
        </div>
        <p className="mt-3 text-sm text-gray-700 text-center font-medium group-hover:text-gray-900">
          {cat.category_name}
        </p>
      </Link>
    ))}
  </div>
</div>

  );
};

export default BubbleCategory;
