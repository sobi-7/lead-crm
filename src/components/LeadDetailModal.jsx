import { useState } from 'react'
import { X, Pencil, Save, XCircle } from 'lucide-react'
import DeleteConfirmationModal from './DeleteConfirmationModal'
import {
  STAGES,
  SERVICES,
  LEAD_SOURCES,
  OWNERS,
  PRIORITIES,
  CITIES,
  STAGE_COLORS,
  PRIORITY_COLORS,
} from '../data/constants'
const Field = ({ label, name, type = 'text', options, editing, form, lead, onChange }) => (
  <div>
    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
      {label}
    </label>
    {editing ? (
      options ? (
        <select
          name={name}
          value={form[name] || ''}
          onChange={onChange}
          className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={form[name] || ''}
          onChange={onChange}
          className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )
    ) : (
      <p className="text-sm text-gray-800 font-medium py-1">
        {lead[name] || <span className="text-gray-400 font-normal">—</span>}
      </p>
    )}
  </div>
)

export default function LeadDetailModal({ lead, onClose, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ ...lead })
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    onUpdate(lead.id, form)
    setEditing(false)
  }

  const handleCancel = () => {
    setForm({ ...lead })
    setEditing(false)
  }

  

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={(e) => {
        // Only close if clicking the backdrop, not the modal content
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4 pointer-events-auto"
      >
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-lg font-bold text-gray-900">{lead.leadName}</h2>
            <p className="text-sm text-gray-500">{lead.businessName}</p>
          </div>
          <div className="flex items-center gap-2">
            {editing ? (
              <>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-1.5 bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-blue-700 transition"
                >
                  <Save size={13} /> Save
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-1.5 border border-gray-300 text-gray-600 text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-gray-50 transition"
                >
                  <XCircle size={13} /> Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="flex items-center gap-1.5 bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-gray-200 transition"
              >
                <Pencil size={13} /> Edit
              </button>
            )}
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition ml-1"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Stage bar - inline change */}
        <div className="px-6 py-3 border-b border-gray-100 flex items-center gap-3">
          <span className="text-xs text-gray-500 font-medium">Stage:</span>
          {editing ? (
            <select
              name="stage"
              value={form.stage}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-2 py-1 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {STAGES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          ) : (
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full ${STAGE_COLORS[lead.stage]}`}
            >
              {lead.stage}
            </span>
          )}
          <span className="text-xs text-gray-400 ml-auto">
            Last updated: {lead.lastUpdated}
          </span>
        </div>

        {/* Body */}
        <div className="px-6 py-5 grid grid-cols-2 gap-x-6 gap-y-4">
           <Field label="Lead Name" name="leadName" editing={editing} form={form} lead={lead} onChange={handleChange} />
          <Field label="Business Name" name="businessName" editing={editing} form={form} lead={lead} onChange={handleChange} />
          <Field label="Service" name="service" options={SERVICES} editing={editing} form={form} lead={lead} onChange={handleChange} />
          <Field label="City" name="city" options={CITIES} editing={editing} form={form} lead={lead} onChange={handleChange} />
          <Field label="Phone" name="phone" type="tel" editing={editing} form={form} lead={lead} onChange={handleChange} />
          <Field label="Email" name="email" type="email" editing={editing} form={form} lead={lead} onChange={handleChange} />
          <Field label="Monthly Ad Budget (₹)" name="adBudget" type="number" editing={editing} form={form} lead={lead} onChange={handleChange} />
          <Field label="Deal Value (₹)" name="dealValue" type="number" editing={editing} form={form} lead={lead} onChange={handleChange} />
          <Field label="Lead Source" name="leadSource" options={LEAD_SOURCES} editing={editing} form={form} lead={lead} onChange={handleChange} />
          <Field label="Owner" name="owner" options={OWNERS} editing={editing} form={form} lead={lead} onChange={handleChange} />
          <Field label="Priority" name="priority" options={PRIORITIES} editing={editing} form={form} lead={lead} onChange={handleChange} />
          <Field label="Next Follow-up" name="followUpDate" type="date" editing={editing} form={form} lead={lead} onChange={handleChange} />

          {/* Notes - full width */}
          <div className="col-span-2">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
              Notes
            </label>
            {editing ? (
              <textarea
                name="notes"
                value={form.notes || ''}
                onChange={handleChange}
                rows={3}
                placeholder="What happened on the last call?"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            ) : (
              <p className="text-sm text-gray-800 py-1 leading-relaxed">
                {lead.notes || (
                  <span className="text-gray-400">No notes yet.</span>
                )}
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-gray-100 flex justify-between items-center bg-gray-50 rounded-b-xl">
          <span className="text-xs text-gray-400">Created: {lead.createdAt}</span>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="text-xs text-red-500 hover:text-red-700 font-medium hover:underline"
          >
            Delete lead
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={showDeleteConfirm}
        leadName={lead.leadName}
        onConfirm={() => {
          onDelete(lead.id)
          setShowDeleteConfirm(false)
          onClose()
        }}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </div>
  )
}
