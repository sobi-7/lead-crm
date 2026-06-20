import { useNavigate } from 'react-router-dom'
import { useLeads } from '../hooks/useLeads'
import { Users, TrendingUp, CheckCircle, Clock, Plus, ArrowRight } from 'lucide-react'
import { STAGE_COLORS } from '../data/constants'

export default function Dashboard() {
  const { leads } = useLeads()
  const navigate = useNavigate()

  const totalLeads = leads.length
  const activeDeals = leads.filter(
    (l) => !['Closed Won', 'Closed Lost'].includes(l.stage)
  ).length
  const closedWon = leads.filter((l) => l.stage === 'Closed Won').length
  const followUpToday = leads.filter(
    (l) => l.followUpDate === new Date().toISOString().split('T')[0]
  ).length

  const recentLeads = [...leads]
    .sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated))
    .slice(0, 5)

  const statCards = [
    {
      label: 'Total Leads',
      value: totalLeads,
      icon: Users,
      color: 'bg-blue-600',
      sub: 'All time',
    },
    {
      label: 'Active Deals',
      value: activeDeals,
      icon: TrendingUp,
      color: 'bg-yellow-500',
      sub: 'In pipeline',
    },
    {
      label: 'Closed Won',
      value: closedWon,
      icon: CheckCircle,
      color: 'bg-green-600',
      sub: 'Converted',
    },
    {
      label: 'Follow-up Today',
      value: followUpToday,
      icon: Clock,
      color: 'bg-purple-600',
      sub: 'Due today',
    },
  ]

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-400 mt-0.5">
          Welcome back — here's what's happening today.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {statCards.map(({ label, value, icon: Icon, color, sub }) => (
          <div
            key={label}
            className="bg-white rounded-xl border border-gray-200 p-5 flex items-start gap-4"
          >
            <div className={`${color} rounded-lg p-2.5 flex-shrink-0`}>
              <Icon size={18} className="text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <p className="text-sm font-medium text-gray-700">{label}</p>
              <p className="text-xs text-gray-400">{sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <button
          onClick={() => navigate('/leads/add')}
          className="flex items-center gap-3 bg-blue-600 text-white rounded-xl p-4 hover:bg-blue-700 transition font-medium text-sm"
        >
          <Plus size={18} />
          Add New Lead
        </button>
        <button
          onClick={() => navigate('/leads')}
          className="flex items-center gap-3 bg-white border border-gray-200 text-gray-700 rounded-xl p-4 hover:bg-gray-50 transition font-medium text-sm"
        >
          <Users size={18} />
          View All Leads
        </button>
        <button
          onClick={() => navigate('/leads?stage=Proposal+Sent')}
          className="flex items-center gap-3 bg-white border border-gray-200 text-gray-700 rounded-xl p-4 hover:bg-gray-50 transition font-medium text-sm"
        >
          <TrendingUp size={18} />
          Proposal Sent
        </button>
      </div>

      {/* Recent leads */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800 text-sm">Recent Leads</h2>
          <button
            onClick={() => navigate('/leads')}
            className="text-xs text-blue-600 hover:underline flex items-center gap-1"
          >
            View all <ArrowRight size={12} />
          </button>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              {['Name', 'Business', 'Service', 'Stage', 'Owner', 'Updated'].map(
                (h) => (
                  <th
                    key={h}
                    className="text-left px-5 py-2.5 text-xs font-semibold text-gray-400 uppercase tracking-wide"
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {recentLeads.map((lead) => (
              <tr
                key={lead.id}
                className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition"
                onClick={() => navigate('/leads')}
              >
                <td className="px-5 py-3 font-medium text-gray-800">
                  {lead.leadName}
                </td>
                <td className="px-5 py-3 text-gray-500">{lead.businessName}</td>
                <td className="px-5 py-3 text-gray-500">{lead.service}</td>
                <td className="px-5 py-3">
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STAGE_COLORS[lead.stage]}`}
                  >
                    {lead.stage}
                  </span>
                </td>
                <td className="px-5 py-3 text-gray-500 text-xs">{lead.owner}</td>
                <td className="px-5 py-3 text-gray-400 text-xs">
                  {lead.lastUpdated}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
