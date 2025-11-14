"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

  // 🔹 Хэрэглэгч бичихээ зогсоосноос 3 сек дараа автоматаар хайна
  useEffect(() => {
    if (!query.trim()) return; // хоосон үед хайлт хийхгүй

    if (typingTimeout) clearTimeout(typingTimeout);

    const timeout = setTimeout(() => {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }, 2000);

    setTypingTimeout(timeout);

    // cleanup
    return () => clearTimeout(timeout);
  }, [query]);

  // 🔹 Enter дархад хайлт хийх
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (typingTimeout) clearTimeout(typingTimeout);
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  // 🔹 Хайлт цэвэрлэх
  const clearSearch = () => {
    setQuery("");
    if (typingTimeout) clearTimeout(typingTimeout);
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-md">
      {/* 🔍 Input */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Бараа хайх..."
        className="w-full border border-gray-300 rounded-full pl-10 pr-10 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
      />

      {/* 🔍 Icon (зүүн талд) */}
      <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />

      {/* ❌ Clear Icon (баруун талд) */}
      {query && (
        <button
          type="button"
          onClick={clearSearch}
          className="absolute right-3 top-2.5 text-gray-400 hover:text-red-500 transition"
        >
          <X size={18} />
        </button>
      )}
    </form>
  );
}
