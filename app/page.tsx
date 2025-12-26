'use client'

import { useState, useEffect } from 'react'
import { Cat, CatCreate, getCats, createCat, updateCat, deleteCat } from '@/lib/api'
import CatList from '@/components/CatList'
import CatForm from '@/components/CatForm'

export default function Home() {
  const [cats, setCats] = useState<Cat[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)

  const fetchCats = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getCats()
      setCats(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load spy cats')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCats()
  }, [])

  const handleCreateCat = async (catData: CatCreate) => {
    await createCat(catData)
    await fetchCats()
    setShowForm(false)
  }

  const handleUpdateCat = async (id: number, salary: number) => {
    await updateCat(id, { salary })
    await fetchCats()
  }

  const handleDeleteCat = async (id: number) => {
    await deleteCat(id)
    await fetchCats()
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Spy Cats Management</h1>
          <p className="text-gray-600">Manage your elite spy cat operations</p>
        </div>

        {error && !loading && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <p className="font-semibold">Error loading cats:</p>
            <p>{error}</p>
            <button
              onClick={fetchCats}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        )}

        <div className="mb-6">
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            >
              + Add New Spy Cat
            </button>
          ) : (
            <div className="mb-6">
              <CatForm
                onSubmit={handleCreateCat}
                onCancel={() => setShowForm(false)}
              />
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Spy Cats Roster</h2>
          <CatList
            cats={cats}
            onDelete={handleDeleteCat}
            onUpdate={handleUpdateCat}
            loading={loading}
          />
        </div>
      </div>
    </main>
  )
}

