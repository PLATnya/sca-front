'use client'

import { Cat } from '@/lib/api'
import { useState } from 'react'
import CatEditForm from './CatEditForm'

interface CatListProps {
  cats: Cat[]
  onDelete: (id: number) => Promise<void>
  onUpdate: (id: number, salary: number) => Promise<void>
  loading: boolean
}

export default function CatList({ cats, onDelete, onUpdate, loading }: CatListProps) {
  const [editingId, setEditingId] = useState<number | null>(null)
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const handleEdit = (id: number) => {
    setEditingId(id)
  }

  const handleCancelEdit = () => {
    setEditingId(null)
  }

  const handleSaveEdit = async (id: number, salary: number) => {
    await onUpdate(id, salary)
    setEditingId(null)
  }

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this spy cat?')) {
      setDeletingId(id)
      try {
        await onDelete(id)
      } finally {
        setDeletingId(null)
      }
    }
  }

  if (loading && cats.length === 0) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (cats.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">No spy cats found.</p>
        <p className="text-sm mt-2">Add your first spy cat to get started!</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Experience</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Breed</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Salary</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {cats.map((cat) => (
            <tr key={cat.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{cat.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{cat.experience} years</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{cat.breed}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {editingId === cat.id ? (
                  <CatEditForm
                    cat={cat}
                    onSave={(salary) => handleSaveEdit(cat.id, salary)}
                    onCancel={handleCancelEdit}
                  />
                ) : (
                  <div className="text-sm font-medium text-gray-900">
                    ${parseFloat(cat.salary || '0').toFixed(2)}
                  </div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                {editingId === cat.id ? (
                  <span className="text-gray-400">Editing...</span>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(cat.id)}
                      className="text-blue-600 hover:text-blue-900 disabled:text-gray-400"
                      disabled={deletingId !== null}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="text-red-600 hover:text-red-900 disabled:text-gray-400"
                      disabled={deletingId === cat.id || deletingId !== null}
                    >
                      {deletingId === cat.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

