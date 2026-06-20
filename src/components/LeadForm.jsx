import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLeads } from '../hooks/useLeads'
import {
  STAGES,
  SERVICES,
  LEAD_SOURCES,
  OWNERS,
  PRIORITIES,
  CITIES,
} from '../data/constants'
import { ChevronLeft } from 'lucide-react'

const emptyForm = {
  leadName: '',
  businessName: '',
  service: '',
  city: '',
  adBudget: '',
  stage: 'New',
  owner: '',
  phone: '',
  email: '',
  leadSource: '',
  dealValue: '',
  priority: 'Medium',
  notes: '',
  followUpDate: '',
}

// Move Input component outside to avoid recreating on each render
const Input = ({ label, name, type = 'text', required: req, placeholder, value, onChange, error }) => {
  // Convert value to string for input display
  const displayValue = value !== undefined && value !== null ? String(value) : ''
  
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1">
        {label}
        {req && <span className="text-red-500 ml-0.5">*</span>}
        {!req && <span className="text-gray-400 font-normal ml-1">(optional)</span>}
      </label>
      <input
        type={type}
        name={name}
        value={displayValue}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition
          ${error ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
      />
      {error && (
        <p className="text-xs text-red-500 mt-0.5">{error}</p>
      )}
    </div>
  )
}

// Move Select component outside to avoid recreating on each render
const Select = ({ label, name, options, required: req, value, onChange, error }) => {
  const displayValue = value !== undefined && value !== null ? String(value) : ''
  
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1">
        {label}
        {req && <span className="text-red-500 ml-0.5">*</span>}
        {!req && <span className="text-gray-400 font-normal ml-1">(optional)</span>}
      </label>
      <select
        name={name}
        value={displayValue}
        onChange={onChange}
        className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition
          ${error ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
      >
        <option value="">Select an option</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-xs text-red-500 mt-0.5">{error}</p>
      )}
    </div>
  )
}

export default function LeadForm({ initialData, onSave,updateLead }) {
  const { addLead } = useLeads()
  const navigate = useNavigate()
  const isEdit = !!initialData
  const [form, setForm] = useState(() => {
    return initialData ? { ...initialData } : emptyForm
  })
  const [errors, setErrors] = useState({})
  const [activeTab, setActiveTab] = useState('manual')

  // Update form whenever initialData changes (important for edit mode)
  useEffect(() => {
    if (initialData) {
      setForm({ ...initialData })
    }
  }, [initialData])

  const required = ['leadName', 'businessName', 'service', 'stage', 'owner', 'phone', 'city', 'adBudget']

  const validate = () => {
    const errs = {}
    required.forEach((key) => {
      if (!form[key] || String(form[key]).trim() === '') {
        errs[key] = 'Required'
      }
    })
    return errs
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = () => {
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    
    // Convert numeric fields to numbers
    const dataToSave = {
      ...form,
      adBudget: form.adBudget ? Number(form.adBudget) : form.adBudget,
      dealValue: form.dealValue ? Number(form.dealValue) : form.dealValue,
      lastUpdated: new Date().toISOString().split('T')[0],
    }
    
    if (isEdit && initialData) {
      updateLead(initialData.id, dataToSave)
      if (onSave) onSave()
    } else {
      addLead({ 
        ...dataToSave, 
        createdAt: new Date().toISOString().split('T')[0],
      })
      navigate('/leads')
    }
  }

  return (
    <div className="max-w-3xl">
      {/* Back nav */}
      {!isEdit && (
        <button
          onClick={() => navigate('/leads')}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 mb-4 transition"
        >
          <ChevronLeft size={16} /> Back to Leads
        </button>
      )}

      <div className="mb-5">
        <h1 className="text-xl font-bold text-gray-900">
          {isEdit ? 'Edit Lead' : 'Add New Lead'}
        </h1>
        <p className="text-sm text-gray-400 mt-0.5">
          {isEdit
            ? 'Update lead details below.'
            : 'Create a new lead or import multiple leads'}
        </p>
      </div>

      {/* Tabs - only show on Add */}
      {!isEdit && (
        <div className="flex gap-1 mb-6 border-b border-gray-200">
          {['manual', 'excel', 'api'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium capitalize border-b-2 transition
                ${activeTab === tab
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
            >
              {tab === 'manual'
                ? 'Manual Entry'
                : tab === 'excel'
                ? 'Excel Import'
                : 'API Integration'}
            </button>
          ))}
        </div>
      )}

      {activeTab !== 'manual' && !isEdit ? (
        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-10 text-center text-gray-400">
          <p className="font-medium text-gray-500 mb-1">
            {activeTab === 'excel' ? 'Excel Import' : 'API Integration'}
          </p>
          <p className="text-sm">working on it</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          {/* Required fields section */}
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
            Required Information
          </p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Input 
              label="Full Name" 
              name="leadName" 
              required 
              placeholder="e.g. Ravi Kumar" 
              value={form.leadName}
              onChange={handleChange}
              error={errors.leadName}
            />
            <Input 
              label="Business Name" 
              name="businessName" 
              required 
              placeholder="e.g. Kumar Electronics" 
              value={form.businessName}
              onChange={handleChange}
              error={errors.businessName}
            />
            <Input 
              label="Phone Number" 
              name="phone" 
              type="tel" 
              required 
              placeholder="e.g. 9876543210" 
              value={form.phone}
              onChange={handleChange}
              error={errors.phone}
            />
            <Select 
              label="Service Enquired" 
              name="service" 
              options={SERVICES} 
              required 
              value={form.service}
              onChange={handleChange}
              error={errors.service}
            />
            <Select 
              label="City" 
              name="city" 
              options={CITIES} 
              required 
              value={form.city}
              onChange={handleChange}
              error={errors.city}
            />
            <Input
              label="Monthly Ad Budget (₹)"
              name="adBudget"
              type="number"
              required
              placeholder="e.g. 50000"
              value={form.adBudget}
              onChange={handleChange}
              error={errors.adBudget}
            />
            <Select 
              label="Stage" 
              name="stage" 
              options={STAGES} 
              required 
              value={form.stage}
              onChange={handleChange}
              error={errors.stage}
            />
            <Select 
              label="Assigned to Sales Rep" 
              name="owner" 
              options={OWNERS} 
              required 
              value={form.owner}
              onChange={handleChange}
              error={errors.owner}
            />
          </div>

          <hr className="border-gray-100 mb-5" />

          {/* Optional fields section */}
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
            Optional Details
          </p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Input 
              label="Email" 
              name="email" 
              type="email" 
              placeholder="email@company.com" 
              value={form.email}
              onChange={handleChange}
              error={errors.email}
            />
            <Select 
              label="Lead Source" 
              name="leadSource" 
              options={LEAD_SOURCES} 
              value={form.leadSource}
              onChange={handleChange}
              error={errors.leadSource}
            />
            <Input 
              label="Deal Value (₹)" 
              name="dealValue" 
              type="number" 
              placeholder="e.g. 120000" 
              value={form.dealValue}
              onChange={handleChange}
              error={errors.dealValue}
            />
            <Select 
              label="Priority Level" 
              name="priority" 
              options={PRIORITIES} 
              value={form.priority}
              onChange={handleChange}
              error={errors.priority}
            />
            <Input 
              label="Next Follow-up Date" 
              name="followUpDate" 
              type="date" 
              value={form.followUpDate}
              onChange={handleChange}
              error={errors.followUpDate}
            />
          </div>

          {/* Notes */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Notes{' '}
              <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <textarea
              name="notes"
              value={form.notes || ''}
              onChange={handleChange}
              rows={3}
              placeholder="Leads speak update..."
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <button
              onClick={() => (isEdit && onSave ? onSave() : navigate('/leads'))}
              className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-5 py-2 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {isEdit ? 'Update Lead' : 'Save Lead'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
