"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import defaultImage from "/img/default_logo.png";
import Link from "next/link";
const CategoryPage = () => {
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
    <div className="w-full mx-auto m-2">
      <div className="divide-y divide-gray-100 bg-white shadow-sm rounded-lg">
        {categories.map((cat) => {
          const imageSrc = cat.category_image || defaultImage;
          return (

            <div key={cat.category_id} className="p-3">
              {/* 🟢 Category мөр */}
              <Link
                key={cat.category_id}
                href={`/category/${cat.category_id}?sub=${null}`}

              >
                <div className="flex items-center gap-3">
                  <Image
                    src={imageSrc}
                    alt={cat.category_name}
                    width={35}
                    height={35}
                    className="rounded-md object-cover"
                  />
                  <span className="text-gray-900 text-base">
                    {cat.category_name}
                  </span>
                </div>
              </Link>

              {/* 🔵 Subcategory жагсаалт */}
              {cat.subcategories?.length > 0 && (

                <div className="mt-2 ml-14 text-sm text-gray-600">
                  {cat.subcategories.map((sub: any) => (
                    <Link
                      key={cat.category_id}
                      href={`/category/${cat.category_id}?sub${sub.id}`}
                    >
                      <div
                        key={sub.id}
                        className="hover:text-blue-600 transition p-1 cursor-pointer"
                      >
                        {sub.name}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div >
  );
};

export default CategoryPage;
