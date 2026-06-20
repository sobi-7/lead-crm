import { Eye, Pencil, Trash2, Phone } from 'lucide-react'
import { STAGE_COLORS, PRIORITY_COLORS } from '../data/constants'

export default function LeadTable({ leads, onView, onEdit, onDelete }) {
  if (leads.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <p className="text-lg font-medium mb-1">No leads found</p>
        <p className="text-sm">Try a different filter or add a new lead.</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            {[
              'Name',
              'Priority',
              'City',
              'Email',
              'Phone',
              'Lead Source',
              'Stage',
              'Owner',
              'Budget',
              'Action',
            ].map((h) => (
              <th
                key={h}
                className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {leads.map((lead, idx) => (
            <tr
              key={lead.id}
              className={`border-b border-gray-100 hover:bg-blue-50/40 transition-colors cursor-pointer ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}
              onClick={() => onView(lead)}
            >
              <td className="px-4 py-3">
                <div className="font-medium text-gray-900 whitespace-nowrap">
                  {lead.leadName}
                </div>
                <div className="text-xs text-gray-400">{lead.businessName}</div>
              </td>
              <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                 <span
                  className={`inline-block text-xs font-semibold px-2 py-1 whitespace-nowrap ${PRIORITY_COLORS[lead.priority]}`}
                >{lead.priority}</span>
                
              </td>
              <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                {lead.city}
              </td>
              <td className="px-4 py-3 text-gray-500 text-xs">
                {lead.email || '—'}
              </td>
              <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                {lead.phone || '—'}
              </td>
              <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                {lead.leadSource || '—'}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`inline-block text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap ${STAGE_COLORS[lead.stage]}`}
                >
                  {lead.stage}
                </span>
              </td>
              <td className="px-4 py-3 text-gray-700 whitespace-nowrap text-xs">
                {lead.owner}
              </td>
              <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                ₹{Number(lead.adBudget || 0).toLocaleString('en-IN')}
              </td>
              <td
                className="px-4 py-3"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onView(lead)}
                    className="text-blue-500 hover:text-blue-700 p-1 rounded hover:bg-blue-50 transition"
                    title="View"
                  >
                    <Eye size={15} />
                  </button>
                  <button
                    onClick={() => onEdit(lead)}
                    className="text-green-500 hover:text-green-700 p-1 rounded hover:bg-green-50 transition"
                    title="Edit"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => onDelete(lead.id)}
                    className="text-red-400 hover:text-red-600 p-1 rounded hover:bg-red-50 transition"
                    title="Delete"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
