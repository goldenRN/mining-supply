// "use client";

// import Image from "next/image";
// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const banners = [
//   "/banner/banner1.jpg",
//   "/banner/banner2.jpg",
//   "/banner/banner3.webp",
// ];

// export default function BannerCarousel() {
//   const [current, setCurrent] = useState(0);

//   // Автомат slide
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % banners.length);
//     }, 4000);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden rounded-2xl shadow-sm">
//       <AnimatePresence>
//         <motion.div
//           key={current}
//           initial={{ opacity: 0, scale: 1.02 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 1.02 }}
//           transition={{ duration: 0.8 }}
//           className="absolute inset-0"
//         >
//           <Image
//             src={banners[current]}
//             alt={`Banner ${current + 1}`}
//             fill
//             priority
//             className="object-cover"
//           />
//         </motion.div>
//       </AnimatePresence>

//       {/* Dots navigation */}
//       <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
//         {banners.map((_, i) => (
//           <button
//             key={i}
//             onClick={() => setCurrent(i)}
//             className={`w-2.5 h-2.5 rounded-full transition-all ${
//               i === current ? "bg-white/90 w-6" : "bg-white/50"
//             }`}
//           />
//         ))}
//       </div>

//       {/* Optional overlay gradient */}
//       <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
//     </div>
//   );
// }

"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Banner {
  id: number;
  image_url: string;
  description?: string;
}

export default function BannerCarousel() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  // 🟢 Баннеруудыг API-аас татах
  const fetchBanners = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/banner`);
      if (!res.ok) throw new Error("Баннеруудыг ачаалж чадсангүй");
      const data = await res.json();
      setBanners(data);
    } catch (err) {
      console.error("❌ Баннер татахад алдаа:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // 🟢 Автомат слайд солигдох
  useEffect(() => {
    if (!banners.length) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [banners]);

  // ⛔️ Хоосон үед
  if (loading) {
    return (
      <div className="w-full h-[300px] md:h-[400px] flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">Баннер ачаалж байна...</p>
      </div>
    );
  }

  if (!banners.length) {
    return (
      <div className="w-full h-[300px] md:h-[400px] flex items-center justify-center bg-gray-100 ">
        <p className="text-gray-500">Баннер олдсонгүй</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden rounded-2xl shadow-sm">
      <AnimatePresence>
        <motion.div
          key={banners[current].id}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <Image
            src={banners[current].image_url}
            alt={banners[current].description || `Banner ${current + 1}`}
            fill
            priority
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Dots navigation */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === current ? "bg-white/90 w-6" : "bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Optional overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
    </div>
  );
}
