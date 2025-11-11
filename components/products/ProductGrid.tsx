

'use client'

import { useEffect, useState } from 'react'
import axios from 'axios';
import ProductCard from './ProductCard';
interface Product {
  id: number
  name: string
  price?: number
  brand_name?: string
  category_name?: string
  images?: { id: number; image_url: string }[]
}

interface Props {
  type: 'latest' | 'popular' | 'all'
  title: string
}

export default function ProductGrid({ type, title }: Props) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/product/${type}`);
        const jsons = res.data; // 👈 зөв
        console.log("json", jsons);

        setProducts(Array.isArray(jsons) ? jsons : jsons.data || []);

      } catch (err) {
        console.error(`${type} бараа татахад алдаа:`, err)
        setProducts([]) // safety
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [type])

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Ачааллаж байна...</div>
  }

  return (
    <section className="py-12 max-w-7xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>

      <ProductCard products={products}/>
    </section >
  )
}

