import { useState, useEffect } from 'react'

const API = 'http://localhost:3000/api/dataretentionpolicys'

export default function DataRetentionPolicyPage() {
  const [dataRetentionPolicys, setDataRetentionPolicys] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({id: '', policy_name: '', applies_to_entity: '', applies_to_role: '', retention_days: ''})
  const [editing, setEditing] = useState(null)

  useEffect(() => { load() }, [])

  async function load() {
    setLoading(true)
    try {
      const res = await fetch(API)
      if (res.ok) setDataRetentionPolicys(await res.json())
    } catch(e) { console.error(e) }
    setLoading(false)
  }

  async function save() {
    const method = editing ? 'PUT' : 'POST'
    const url = editing ? `${API}/${editing}` : API
    await fetch(url, { method, headers: {'Content-Type':'application/json'}, body: JSON.stringify(form) })
    setShowForm(false); setEditing(null); setForm({id: '', policy_name: '', applies_to_entity: '', applies_to_role: '', retention_days: ''}); load()
  }

  async function remove(id) {
    if (!confirm('Delete this record?')) return
    await fetch(`${API}/${id}`, { method: 'DELETE' })
    load()
  }

  function edit(item) {
    setForm({...item}); setEditing(item.id); setShowForm(true)
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">DataRetentionPolicy</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage DataRetentionPolicy records</p>
        </div>
        <button onClick={() => { setShowForm(true); setEditing(null); setForm({id: '', policy_name: '', applies_to_entity: '', applies_to_role: '', retention_days: ''}) }} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          + Add DataRetentionPolicy
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
            <h2 className="text-lg font-bold text-gray-900 mb-4">{editing ? 'Edit' : 'New'} DataRetentionPolicy</h2>
            <div className="space-y-4">
              
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">id</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.id || ''} onChange={e => setForm(p => ({...p, id: e.target.value}))} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">policy_name</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.policy_name || ''} onChange={e => setForm(p => ({...p, policy_name: e.target.value}))} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">applies_to_entity</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.applies_to_entity || ''} onChange={e => setForm(p => ({...p, applies_to_entity: e.target.value}))} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">applies_to_role</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.applies_to_role || ''} onChange={e => setForm(p => ({...p, applies_to_role: e.target.value}))} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">retention_days</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.retention_days || ''} onChange={e => setForm(p => ({...p, retention_days: e.target.value}))} />
            </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={save} className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700">Save</button>
              <button onClick={() => { setShowForm(false); setEditing(null) }} className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-6 h-6 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
        </div>
      ) : dataRetentionPolicys.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-2xl">
          <p className="text-gray-400 text-sm">No DataRetentionPolicy records yet.</p>
          <button onClick={() => setShowForm(true)} className="mt-3 text-blue-600 text-sm font-medium hover:underline">Add the first one</button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">id</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">policy_name</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">applies_to_entity</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">applies_to_role</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">retention_days</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {dataRetentionPolicys.map(item => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm text-gray-700">{String(item.id ?? '')}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{String(item.policy_name ?? '')}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{String(item.applies_to_entity ?? '')}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{String(item.applies_to_role ?? '')}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{String(item.retention_days ?? '')}</td>
                  <td className="px-4 py-3 text-right">
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