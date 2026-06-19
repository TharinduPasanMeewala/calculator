import { useState, useEffect } from 'react'

const API = 'http://localhost:3000/api/auditlogs'

export default function AuditLogPage() {
  const [auditLogs, setAuditLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({id: '', user_id: '', session_id: '', event_type: '', event_category: ''})
  const [editing, setEditing] = useState(null)

  useEffect(() => { load() }, [])

  async function load() {
    setLoading(true)
    try {
      const res = await fetch(API)
      if (res.ok) setAuditLogs(await res.json())
    } catch(e) { console.error(e) }
    setLoading(false)
  }

  async function save() {
    const method = editing ? 'PUT' : 'POST'
    const url = editing ? `${API}/${editing}` : API
    await fetch(url, { method, headers: {'Content-Type':'application/json'}, body: JSON.stringify(form) })
    setShowForm(false); setEditing(null); setForm({id: '', user_id: '', session_id: '', event_type: '', event_category: ''}); load()
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
          <h1 className="text-2xl font-bold text-gray-900">AuditLog</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage AuditLog records</p>
        </div>
        <button onClick={() => { setShowForm(true); setEditing(null); setForm({id: '', user_id: '', session_id: '', event_type: '', event_category: ''}) }} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          + Add AuditLog
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
            <h2 className="text-lg font-bold text-gray-900 mb-4">{editing ? 'Edit' : 'New'} AuditLog</h2>
            <div className="space-y-4">
              
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">id</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.id || ''} onChange={e => setForm(p => ({...p, id: e.target.value}))} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">user_id</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.user_id || ''} onChange={e => setForm(p => ({...p, user_id: e.target.value}))} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">session_id</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.session_id || ''} onChange={e => setForm(p => ({...p, session_id: e.target.value}))} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">event_type</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.event_type || ''} onChange={e => setForm(p => ({...p, event_type: e.target.value}))} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">event_category</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.event_category || ''} onChange={e => setForm(p => ({...p, event_category: e.target.value}))} />
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
      ) : auditLogs.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-2xl">
          <p className="text-gray-400 text-sm">No AuditLog records yet.</p>
          <button onClick={() => setShowForm(true)} className="mt-3 text-blue-600 text-sm font-medium hover:underline">Add the first one</button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">id</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">user_id</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">session_id</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">event_type</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">event_category</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {auditLogs.map(item => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm text-gray-700">{String(item.id ?? '')}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{String(item.user_id ?? '')}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{String(item.session_id ?? '')}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{String(item.event_type ?? '')}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{String(item.event_category ?? '')}</td>
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