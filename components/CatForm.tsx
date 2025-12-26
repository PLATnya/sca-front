'use client'

import { CatCreate } from '@/lib/api'
import { useState } from 'react'

interface CatFormProps {
  onSubmit: (cat: CatCreate) => Promise<void>
  onCancel?: () => void
}

export default function CatForm({ onSubmit, onCancel }: CatFormProps) {
  const [formData, setFormData] = useState<CatCreate>({
    name: '',
    experience: 0,
    breed: '',
    salary: 0,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      await onSubmit(formData)
      setFormData({
        name: '',
        experience: 0,
        breed: '',
        salary: 0,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create spy cat')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'experience' || name === 'salary' ? parseFloat(value) || 0 : value,
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Add New Spy Cat</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          <p className="font-semibold">Error:</p>
          <p className="text-sm whitespace-pre-line">{error}</p>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
            Years of Experience *
          </label>
          <input
            type="number"
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            min="0"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="breed" className="block text-sm font-medium text-gray-700 mb-1">
            Breed *
          </label>
          <input
            type="text"
            id="breed"
            name="breed"
            value={formData.breed}
            onChange={handleChange}
            required
            placeholder="e.g., Persian, Siamese, Maine Coon"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
          <p className="mt-1 text-xs text-gray-500">
            Breed must be a valid breed from The Cat API
          </p>
        </div>

        <div>
          <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">
            Salary *
          </label>
          <input
            type="number"
            id="salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            step="0.01"
            min="0"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
        </div>
      </div>

      <div className="mt-6 flex space-x-3">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Adding...' : 'Add Spy Cat'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

