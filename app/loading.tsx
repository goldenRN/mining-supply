// import SkeletonCard from "@/components/SkeletonCard";

import SkeletonCard from "@/components/SkeletonCard";
import { CartProvider } from "./context/CartContext";

export default function Loading() {
  return (
    <main>
      <CartProvider>
        <div className="grid grid-cols-3 gap-8">
          {"abcdefghi".split('').map(i => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </CartProvider>
    </main>
  )
}