'use client';

import React, { useState, useEffect } from 'react';
import AddSubCategoryModal from './AddSubCategoryModal';
import EditSubCategoryModal from './EditSubCategoryModal';
import { Plus } from 'lucide-react';
import SubCategoryTable from './SubCategoryTable';
import BackButton from '@/components/BackButton';
import { describe } from 'node:test';
import { SubCategory } from '@/app/types/subcategory';
import { Category } from '@/app/types/category';

const SubCategoryPage: React.FC = () => {
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editSubCategory, setEditSubCategory] = useState<SubCategory | null>(null);

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
  }, []);
  const fetchCategories = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category`);
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSubCategories = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/subcategory`);
      const data = await res.json();
      setSubCategories(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddCategory = async (data: { name: string; description?: string; category_id: number }) => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/subcategory`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Дэд ангилал нэмэхэд алдаа гарлаа');

      const newSubCategory = await res.json();

      // 🔍 categories state-ээс нэрийг хайж олоод холбоно
      const category = categories.find(c => c.category_id === data.category_id);

      const subWithCategory = {
        ...newSubCategory,
        category_name: category ? category.category_name : 'Тодорхойгүй',
      };

      setSubCategories(prev => [...prev, subWithCategory]);
      setOpenModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  // const handleAddCategory = async (data: { name: string; description?: string; category_id: number }) => {
  //   try {
  //     const user = JSON.parse(localStorage.getItem('user') || '{}');

  //     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/subcategory`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //       body: JSON.stringify(data), // 👈 Modal-аас ирсэн JSON
  //     });

  //     if (!res.ok) throw new Error('Дэд ангилал нэмэхэд алдаа гарлаа');
  //     else {
  //       const data = await res.json();
  //       setSubCategories(prev => [...prev, data]);
  //     }
  //     const newSubCategory = await res.json();
  //     // ✅ UI дээр шууд тухайн category дотор шинэ subcategory-г нэмэх
  //     setCategories(prev =>
  //       prev.map(cat =>
  //         cat.category_id === data.category_id
  //           ? {
  //             ...cat,
  //             subcategories: [...(cat.subcategories || []), newSubCategory],
  //           }
  //           : cat
  //       )
  //     );
  //     setOpenModal(false);
  //     await fetchCategories(); // жагсаалтаа дахин татах
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const handleEditClick = (cat: SubCategory) => {
    setEditSubCategory(cat);
    setEditModalOpen(true);
  };

  const handleUpdateCategory = async (id: number, data: { name: string; description?: string; category_id: number }) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/subcategory/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(data),
    });

    const updated = await res.json();
    if (res.ok) {
      setSubCategories(prev => prev.map(c => (c.id === id ? updated : c)));
      // alert('Амжилттай засагдлаа ✅');
    } else {
      alert(updated.message || 'Дэд ангилал засахад алдаа гарлаа');
    }
  };
  return (
    <div className="w-[calc(100vw-300px)] p-4">
      <div className="flex justify-between items-center bg-white sticky top-0 z-10 p-2 mb-4">
        <BackButton text="Буцах" link="/admin/dashboard" />
        <button
          className="bg-yellow-600 hover:opacity-90 text-white font-bold py-2 px-4 rounded text-xs flex items-center gap-2"
          onClick={() => setOpenModal(true)}
        >
          <Plus size={15} /> Нэмэх
        </button>
      </div>

      <SubCategoryTable subCategories={subCategories}
        onEdit={handleEditClick}
        // onDelete={handleDeleteCategory} 
        onDelete={async (id) => {
          const confirmed = window.confirm('Устгах уу?');
          if (!confirmed) return;
          try {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/subcategory/${id}`, {
              method: 'DELETE',
              headers: { Authorization: `Bearer ${user.token}` },
            });
            if (!res.ok) {
              const error = await res.json();
              return alert(error.message || 'Устгах үед алдаа гарлаа');
            }
            setSubCategories((prev) => prev.filter((cat) => cat.id !== id));
            alert('Амжилттай устлаа');
          } catch (err) {
            alert('Серверийн алдаа');
          }
        }} />
      <EditSubCategoryModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSubmit={handleUpdateCategory}
        category={editSubCategory}
      />
      <AddSubCategoryModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleAddCategory}
        category={categories}
      />
    </div>
  );
};

export default SubCategoryPage;
