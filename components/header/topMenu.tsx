'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const categories = [
  { id: "home", label: "Нүүр хуудас" },
  { id: "all", label: "Бүгд" },
  { id: "best", label: "Эрэлттэй" },
  { id: "new", label: "Шинэ" },
  { id: "brand", label: "Брэнд" },
];

export default function CategoryMenu({ onCategorySelect }: { onCategorySelect?: (id: string) => void }) {
  const [active, setActive] = useState("home");
  const router = useRouter();

  const handleClick = (id: string) => {
    setActive(id);
    if (onCategorySelect) onCategorySelect(id);

    // → Нүүр хуудас руу category query параметртэйгээр явуулна
    router.push(`/?category=${id}`);
  };

  return (
    <div className="flex justify-center gap-8 text-black py-3 sticky top-0 bg-white z-20">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => handleClick(cat.id)}
          className={`group relative text-sm md:text-base transition-colors duration-200 ${
            active === cat.id
              ? "text-blue-700"
              : "text-black hover:text-black/50"
          }`}
        >
          {cat.label}
          <span
            className={`absolute left-0 bottom-0 top-11 h-[3px] rounded-full transition-all duration-300 ease-out origin-left ${
              active === cat.id
                ? "w-full bg-blue-700"
                : "w-0 group-hover:w-full bg-black/50"
            }`}
          ></span>
        </button>
      ))}
    </div>
  );
}
