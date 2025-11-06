'use client';

import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import CategoryTable from './typeTable';
import BackButton from '@/components/BackButton';
import EditTypeModal from './EditTypeModal';
import AddTypeModal from './AddTypeModal';

interface Type {
  id: number;
  name: string;
  description: string;
}

const TypePage: React.FC = () => {
  const [type, setType] = useState<Type[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editType, setEditType] = useState<Type | null>(null);
  useEffect(() => {
    fetchTypes();
  }, []);

  const fetchTypes = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/type`, {
      });
      const data = await res.json();
      setType(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddType = async (data: { name: string }) => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/type`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(data), // 👈 Modal-аас ирсэн JSON
      });

      if (!res.ok) throw new Error('Төрөл нэмэхэд алдаа гарлаа');
      setOpenModal(false);
      await fetchTypes(); // жагсаалтаа дахин татах
    } catch (error) {
      console.error(error);
    }
  };
  const handleEditClick = (cat: Type) => {
    setEditType(cat);
    setEditModalOpen(true);
  };
  // Edit-ийг backend руу хадгалах
  const handleUpdateType = async (id: number, name: string, description?: string) => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/type/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          id,
          name,
          description: description || '', // undefined бол хоосон string
        }),
      });

      const updated = await res.json();
      if (!res.ok) throw new Error(updated.message || 'Төрөл засахад алдаа гарлаа');

      setType(prev => prev.map(c => (c.id === id ? updated : c)));
      setEditModalOpen(false);
    } catch (err) {
      console.error(err);
      alert('Серверийн алдаа гарлаа');
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

      <CategoryTable
        states={type}
        onEdit={handleEditClick}
        // onDelete={handleDeleteCategory} 
        onDelete={async (id) => {
          const confirmed = window.confirm('Устгах уу?');
          if (!confirmed) return;
          try {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/type/${id}`, {
              method: 'DELETE',
              headers: { Authorization: `Bearer ${user.token}` },
            });
            if (!res.ok) {
              const error = await res.json();
              return alert(error.message || 'Устгах үед алдаа гарлаа');
            }
            setType((prev) => prev.filter((cat) => cat.id !== id));
            alert('Амжилттай устлаа');
          } catch (err) {
            alert('Серверийн алдаа');
          }
        }} />
      <EditTypeModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSubmit={handleUpdateType}
        type={editType}
      />
      <AddTypeModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={
          handleAddType}
      />
    </div>
  );
};

export default TypePage;
