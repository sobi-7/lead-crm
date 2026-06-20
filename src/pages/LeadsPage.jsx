import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useLeads } from '../hooks/useLeads'
import LeadTable from '../components/LeadTable'
import StageFilter from '../components/StageFilter'
import PipelineSummary from '../components/PipelineSummary'
import LeadDetailModal from '../components/LeadDetailModal'
import DeleteConfirmationModal from '../components/DeleteConfirmationModal'
import LeadForm from '../components/LeadForm'
import { Plus, Search, Download, Upload, RotateCcw } from 'lucide-react'

export default function LeadsPage() {
  const { leads, updateLead, deleteLead, resetToDemo } = useLeads()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const initialStage = searchParams.get('stage') || 'All'
  const [activeStage, setActiveStage] = useState(initialStage)
  const [search, setSearch] = useState('')
  const [viewLead, setViewLead] = useState(null)
  const [editLead, setEditLead] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  useEffect(() => {
    const stage = searchParams.get('stage')
    if (stage) setActiveStage(stage)
  }, [searchParams])

  const filtered = leads.filter((l) => {
    const matchStage = activeStage === 'All' || l.stage === activeStage
    const q = search.toLowerCase()
    const matchSearch =
      !q ||
      l.leadName?.toLowerCase().includes(q) ||
      l.businessName?.toLowerCase().includes(q) ||
      l.city?.toLowerCase().includes(q) ||
      l.service?.toLowerCase().includes(q) ||
      l.owner?.toLowerCase().includes(q)
    return matchStage && matchSearch
  })

  const handleExport = () => {
    const headers = [
      'Lead Name', 'Business', 'Service', 'City', 'Phone', 'Email',
      'Budget', 'Stage', 'Owner', 'Lead Source', 'Deal Value', 'Priority',
      'Follow-up', 'Notes', 'Last Updated',
    ]
    const rows = leads.map((l) => [
      l.leadName, l.businessName, l.service, l.city, l.phone, l.email,
      l.adBudget, l.stage, l.owner, l.leadSource, l.dealValue, l.priority,
      l.followUpDate, l.notes, l.lastUpdated,
    ])
    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'profitcast-leads.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      {/* Page header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Leads</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            Monitor your sales pipeline, track revenue trends, and manage key activities.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={resetToDemo}
            title="Reset to demo data"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-500 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            <RotateCcw size={13} /> Reset Demo
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            <Download size={13} /> Export
          </button>
          <button
            onClick={() => navigate('/leads/add')}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <Plus size={13} /> Add Lead
          </button>
        </div>
      </div>

      {/* Pipeline summary - Bonus Task 5 */}
      <PipelineSummary leads={leads} />

      {/* Leads card */}
      <div className="bg-white rounded-xl border border-gray-200">
        {/* Search bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
          <div className="relative flex-1 max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search leads, business, city, owner..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <span className="text-xs text-gray-400 ml-auto">
            {filtered.length} of {leads.length} leads
          </span>
        </div>

        {/* Stage filter tabs - Task 4 */}
        <div className="px-4 pt-1">
          <StageFilter
            active={activeStage}
            onChange={setActiveStage}
            leads={leads}
          />
        </div>

        {/* Lead table - Task 1 */}
        <LeadTable
          leads={filtered}
          onView={(lead) => setViewLead(lead)}
          onEdit={(lead) => setEditLead(lead)}
          onDelete={(id) => {
            const lead = leads.find(l => l.id === id)
            setDeleteConfirm(id)
          }}
        />
      </div>

      {/* Lead detail modal - Task 2 */}
      {viewLead && (
        <LeadDetailModal
          lead={viewLead}
          onClose={() => setViewLead(null)}
          onUpdate={(id, data) => {
            updateLead(id, data)
            setViewLead({ ...viewLead, ...data })
          }}
          onDelete={(id) => {
            deleteLead(id)
            setViewLead(null)
          }}
        />
      )}

      {/* Edit modal */}
      {editLead && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => setEditLead(null)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4 p-6"
            onClick={(e) => e.stopPropagation()}
          >
           <LeadForm
  initialData={editLead}
  updateLead={updateLead}
  onSave={() => {
    setEditLead(null)
  }}
/>
          
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <DeleteConfirmationModal
          isOpen={true}
          leadName={leads.find(l => l.id === deleteConfirm)?.leadName}
          onConfirm={() => {
            deleteLead(deleteConfirm)
            setDeleteConfirm(null)
            setViewLead(null)
          }}
          onCancel={() => setDeleteConfirm(null)}
        />
      )}
    </div>
  )
}
