// "use client";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Image from "next/image";
// import defaultImage from "/img/default_logo.png";
// import Link from "next/link";

// const CategoryPage = () => {
//   const [categories, setCategories] = useState<any[]>([]);

//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/category`);
//       setCategories(res.data);
//     } catch (err) {
//       console.error("Category татахад алдаа:", err);
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   return (
//     <div className="w-full mx-auto m-2">
//       <div className="divide-y divide-gray-100 bg-white shadow-sm rounded-lg">
//         {categories.map((cat) => {
//           const imageSrc = cat.category_image || defaultImage;
//           return (
//             <div key={cat.category_id} className="p-3">
//               {/* 🟢 Category мөр */}
//               <Link
//                 href={`/category/${cat.category_id}?sub=null&catName=${encodeURIComponent(
//                   cat.category_name
//                 )}&subcatName=null&desc=${encodeURIComponent(cat.category_description || "")}`}
//               >
//                 <div className="flex items-center gap-3">
//                   <Image
//                     src={imageSrc}
//                     alt={cat.category_name}
//                     width={35}
//                     height={35}
//                     className="rounded-md object-cover"
//                   />
//                   <div>
//                     <span className="text-gray-900 text-base font-medium">
//                       {cat.category_name}
//                     </span>
//                     {cat.category_description && (
//                       <p className="text-gray-500 text-xs mt-0.5 line-clamp-1">
//                         {cat.category_description}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               </Link>

//               {/* 🔵 Subcategory жагсаалт */}
//               {cat.subcategories?.length > 0 && (
//                 <div className="mt-2 ml-14 text-sm text-gray-600">
//                   {cat.subcategories.map((sub: any) => (
//                     <Link
//                       key={sub.id}
//                       href={`/category/${cat.category_id}?sub=${sub.id}&catName=${encodeURIComponent(
//                         cat.category_name
//                       )}&subcatName=${encodeURIComponent(
//                         sub.name
//                       )}&desc=${encodeURIComponent(sub.description || "")}`}
//                     >
//                       <div className="hover:text-blue-600 transition p-1 cursor-pointer">
//                         {sub.name}
//                       </div>
//                     </Link>
//                   ))}
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default CategoryPage;

"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import defaultImage from "/img/default_logo.png";

export default function CategoryPage({ onCloseMenu }: { onCloseMenu?: () => void }) {
  const [categories, setCategories] = useState<any[]>([]);
  const router = useRouter();

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

  const handleCategoryClick = (categoryId: number, categoryName: string, description?: string) => {
    onCloseMenu?.(); // 🟢 Меню хаах
    router.push(
      `/category/${categoryId}?sub=null&catName=${encodeURIComponent(categoryName)}&subcatName=null&desc=${encodeURIComponent(description || "")}`
    );
  };

  const handleSubCategoryClick = (
    categoryId: number,
    categoryName: string,
    subId: number,
    subName: string,
    description?: string
  ) => {
    onCloseMenu?.(); // 🟢 Меню хаах
    router.push(
      `/category/${categoryId}?sub=${subId}&catName=${encodeURIComponent(categoryName)}&subcatName=${encodeURIComponent(subName)}&desc=${encodeURIComponent(description || "")}`
    );
  };

  return (
    <div className="w-full mx-auto m-2">
      <div className="divide-y divide-gray-100 bg-white shadow-sm rounded-lg">
        {categories.map((cat) => {
          const imageSrc = cat.category_image || defaultImage;
          return (
            <div key={cat.category_id} className="p-3">
              {/* 🟢 Category мөр */}
              <div
                onClick={() =>
                  handleCategoryClick(cat.category_id, cat.category_name, cat.category_description)
                }
                className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded-md p-1"
              >
                <Image
                  src={imageSrc}
                  alt={cat.category_name}
                  width={35}
                  height={35}
                  className="rounded-md object-cover"
                />
                <div>
                  <span className="text-gray-900 text-base font-medium">
                    {cat.category_name}
                  </span>
                  {cat.category_description && (
                    <p className="text-gray-500 text-xs mt-0.5 line-clamp-1">
                      {cat.category_description}
                    </p>
                  )}
                </div>
              </div>

              {/* 🔵 Subcategory жагсаалт */}
              {cat.subcategories?.length > 0 && (
                <div className="mt-2 ml-14 text-sm text-gray-600">
                  {cat.subcategories.map((sub: any) => (
                    <div
                      key={sub.id}
                      onClick={() =>
                        handleSubCategoryClick(
                          cat.category_id,
                          cat.category_name,
                          sub.id,
                          sub.name,
                          sub.description
                        )
                      }
                      className="hover:text-blue-600 transition p-1 cursor-pointer"
                    >
                      {sub.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
