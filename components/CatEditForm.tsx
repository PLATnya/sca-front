'use client'

import { Cat } from '@/lib/api'
import { useState } from 'react'

interface CatEditFormProps {
  cat: Cat
  onSave: (salary: number) => Promise<void>
  onCancel: () => void
}

export default function CatEditForm({ cat, onSave, onCancel }: CatEditFormProps) {
  const [salary, setSalary] = useState<number>(
    parseFloat(cat.salary || '0') || 0
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      await onSave(salary)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update salary')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <div className="flex-1">
        <input
          type="number"
          step="0.01"
          min="0"
          value={salary}
          onChange={(e) => setSalary(parseFloat(e.target.value) || 0)}
          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
          required
          disabled={loading}
        />
        {error && (
          <p className="text-xs text-red-600 mt-1">{error}</p>
        )}
      </div>
      <div className="flex space-x-1">
        <button
          type="submit"
          disabled={loading}
          className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 disabled:bg-gray-400"
        >
          {loading ? '...' : 'Save'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="px-2 py-1 bg-gray-400 text-white text-xs rounded hover:bg-gray-500 disabled:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

