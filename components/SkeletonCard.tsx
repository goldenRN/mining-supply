"use client";
import { motion } from "framer-motion";

export default function SkeletonCard() {
  return (
    <motion.div
      initial={{ opacity: 0.4 }}
      animate={{ opacity: 1 }}
      transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
      className="rounded-xl border border-gray-200 shadow bg-white flex flex-col"
    >
      <div className="w-full aspect-square bg-gray-200 rounded-t-lg animate-pulse" />
      <div className="p-3 space-y-2 flex-grow">
        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
        <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
        <div className="h-5 bg-gray-200 rounded w-1/3 mt-4 animate-pulse" />
      </div>
    </motion.div>
  );
}
