"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { motion } from "framer-motion";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import ProductList from "../ProductList";

export default function CategoryPage() {
  const router = useRouter();
  const { id } = useParams();
  const searchParams = useSearchParams();

  // 🔹 Query parameters
  const subId = searchParams.get("sub");
  const catName = searchParams.get("catName");
  const subcatName = searchParams.get("subcatName");
  const description = searchParams.get("desc"); // ✅ Description query

  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedSub, setSelectedSub] = useState<number | null>(null);
  const [desc, setDesc] = useState<string | null>(null); // ✅ string болгосон

  // 🔹 Categories татах
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/category`);
        setCategories(res.data || []);
      } catch (err) {
        console.error("Fetch category error:", err);
      }
    };
    fetchCategories();
  }, []);

  // 🔹 URL-аас сонгогдсон утгуудыг state-д оноох
  useEffect(() => {
    if (id) setSelectedCategory(Number(id));
    if (subId && subId !== "null") setSelectedSub(Number(subId));
    else setSelectedSub(null);

    // ✅ desc query-г state-д хадгалах
    if (description && description !== "null") setDesc(description);
    else setDesc(null);
  }, [id, subId, description]);

  return (
    <div className="flex max-w-7xl mx-auto min-h-screen py-10 bg-gray-50 text-gray-800">
      {/* --- Sidebar --- */}
      <aside className="w-64 px-5 border-r border-gray-200 shadow-sm hidden md:block">
        <h2 className="font-bold text-md mb-5 text-gray-800">Ангилал</h2>

        <div className="space-y-2">
          {categories.map((cat) => (
            <div key={cat.category_id}>
              {/* 🟦 Category item */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() =>
                  router.push(
                    `/category/${cat.category_id}?sub=null&catName=${encodeURIComponent(
                      cat.category_name
                    )}&subcatName=null&desc=${encodeURIComponent(
                      cat.description || ""
                    )}`
                  )
                }
                className={`cursor-pointer flex items-center gap-3 p-2 rounded-lg border transition-all duration-200 ${
                  selectedCategory === cat.category_id
                    ? "bg-blue-50 text-blue-700 font-semibold"
                    : "border-transparent hover:bg-gray-100"
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
                <span className="text-sm">{cat.category_name}</span>
              </motion.div>

              {/* 🟢 Subcategory list */}
              {cat.subcategories?.length > 0 && (
                <div className="ml-8 mt-2 space-y-1 border-l border-gray-200 pl-3">
                  {cat.subcategories.map((sub: any) => (
                    <div
                      key={sub.id}
                      onClick={() =>
                        router.push(
                          `/category/${cat.category_id}?sub=${sub.id}&catName=${encodeURIComponent(
                            cat.category_name
                          )}&subcatName=${encodeURIComponent(
                            sub.name
                          )}&desc=${encodeURIComponent(sub.description || "")}`
                        )
                      }
                      className={`cursor-pointer text-sm p-1 rounded-md ${
                        selectedSub === sub.id
                          ? "text-blue-600 font-medium"
                          : "text-gray-600 hover:text-blue-600"
                      }`}
                    >
                      {sub.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </aside>

      {/* --- Product list --- */}
      <ProductList
        categoryId={selectedCategory}
        subId={selectedSub}
        catName={catName}
        subcatName={subcatName}
        description={desc}
        // description={selectedSubCategory?.description || category?.description || null}
      />
    </div>
  );
}
