import { useState, useEffect } from 'react'

const KEY = 'exportjob-records'

export default function ExportJobPage() {
  const [items, setItems] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({'id': '', 'user_id': '', 'export_format': '', 'filter_criteria': '', 'total_records': ''})
  const [editing, setEditing] = useState(null)

  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem(KEY) || '[]'))
  }, [])

  function persist(next) {
    setItems(next)
    localStorage.setItem(KEY, JSON.stringify(next))
  }

  function save() {
    if (editing) {
      persist(items.map(i => i.id === editing ? { ...form, id: editing } : i))
    } else {
      persist([...items, { ...form, id: Date.now().toString(36) }])
    }
    setShowForm(false); setEditing(null); setForm({'id': '', 'user_id': '', 'export_format': '', 'filter_criteria': '', 'total_records': ''})
  }

  function remove(id) {
    if (!confirm('Delete this record?')) return
    persist(items.filter(i => i.id !== id))
  }

  function edit(item) {
    setForm({ ...item }); setEditing(item.id); setShowForm(true)
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">ExportJob</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage ExportJob records</p>
        </div>
        <button onClick={() => { setShowForm(true); setEditing(null); setForm({'id': '', 'user_id': '', 'export_format': '', 'filter_criteria': '', 'total_records': ''}) }} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          + Add ExportJob
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md max-h-[85vh] overflow-y-auto">
            <h2 className="text-lg font-bold text-gray-900 mb-4">{editing ? 'Edit' : 'New'} ExportJob</h2>
            <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">id</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form['id'] || ''} onChange={e => setForm(p => ({...p, 'id': e.target.value}))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">user_id</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form['user_id'] || ''} onChange={e => setForm(p => ({...p, 'user_id': e.target.value}))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">export_format</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form['export_format'] || ''} onChange={e => setForm(p => ({...p, 'export_format': e.target.value}))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">filter_criteria</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form['filter_criteria'] || ''} onChange={e => setForm(p => ({...p, 'filter_criteria': e.target.value}))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">total_records</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form['total_records'] || ''} onChange={e => setForm(p => ({...p, 'total_records': e.target.value}))} />
            </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={save} className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700">Save</button>
              <button onClick={() => { setShowForm(false); setEditing(null) }} className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {items.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-2xl">
          <p className="text-gray-400 text-sm">No ExportJob records yet.</p>
          <button onClick={() => setShowForm(true)} className="mt-3 text-blue-600 text-sm font-medium hover:underline">Add the first one</button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-x-auto">
          <table className="w-full min-w-[480px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">id</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">user_id</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">export_format</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">filter_criteria</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">total_records</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map(item => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm text-gray-700">{String(item['id'] ?? '')}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{String(item['user_id'] ?? '')}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{String(item['export_format'] ?? '')}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{String(item['filter_criteria'] ?? '')}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{String(item['total_records'] ?? '')}</td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <button onClick={() => edit(item)} className="text-blue-600 hover:text-blue-800 text-xs font-medium mr-3">Edit</button>
                    <button onClick={() => remove(item.id)} className="text-red-500 hover:text-red-700 text-xs font-medium">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}