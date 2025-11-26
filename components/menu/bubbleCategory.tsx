"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import defaultImage from "/img/default_logo.png";

const BubbleCategory = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [width, setWidth] = useState(0);


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

  // Хөдөлгөөн хийх боломжийн өргөнийг тооцоолно
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => {
      const carousel = document.getElementById("cat-carousel");
      if (carousel)
        setWidth(carousel.scrollWidth - carousel.offsetWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [categories]);

  return (
    <div className="relative max-w-7xl mx-auto py-6 overflow-hidden">
      {/* Carousel */}
      <motion.div
        id="cat-carousel"
        className="flex gap-8 cursor-grab active:cursor-grabbing px-4"
        drag="x"
        dragConstraints={{ right: 0, left: -width }}
      >
        {categories.map((cat) => {
          const imageSrc = cat.category_image || defaultImage;
          return (
            <Link
              key={cat.category_id}
              href={`/category/${cat.category_id}?sub=${null}?catName=${cat.category_name}?subcatName=${null}`}
              className="flex flex-col items-center flex-shrink-0 w-24 group"
            >
              <div className="w-20 h-20 rounded-full  bg-gray-100 flex items-center justify-center transition-all duration-300 group-hover:bg-gray-200 shadow-md overflow-hidden">
                <Image
                  src={imageSrc}
                  alt={cat.category_name || "Ангилал"}
                  width={60}
                  height={60}
                  className="object-contain p-2"
                />
              </div>
              <p className="mt-3 text-sm text-gray-700 text-center font-medium group-hover:text-gray-900">
                {cat.category_name || "Нэргүй"}
              </p>
            </Link>
          );
        })}
      </motion.div>

      {/* Fade edges */}
      <div className="absolute left-0 top-0 h-full w-16 pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-16 pointer-events-none" />
    </div>
  );
};

export default BubbleCategory;
