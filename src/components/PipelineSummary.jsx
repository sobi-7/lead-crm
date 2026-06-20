import { STAGES, STAGE_STAT_COLORS } from '../data/constants'

export default function PipelineSummary({ leads }) {
  const totalLeads = leads.length
  const newToday = leads.filter(
    (l) => l.createdAt === new Date().toISOString().split('T')[0]
  ).length
  const activeDeals = leads.filter(
    (l) => !['Closed Won', 'Closed Lost'].includes(l.stage)
  ).length
  const closedWon = leads.filter((l) => l.stage === 'Closed Won').length
  const totalRevenue = leads
    .filter((l) => l.stage === 'Closed Won')
    .reduce((sum, l) => sum + (Number(l.dealValue) || 0), 0)

  const topStats = [
    { label: 'Total Leads', value: totalLeads, bg: 'bg-blue-600' },
    { label: 'New Today', value: newToday, bg: 'bg-green-600' },
    { label: 'Active Deals', value: activeDeals, bg: 'bg-yellow-500' },
    { label: 'Closed Won', value: closedWon, bg: 'bg-purple-600' },
    {
      label: 'Revenue',
      value: `₹${(totalRevenue / 1000).toFixed(0)}K`,
      bg: 'bg-gray-700',
    },
  ]

  const stageCounts = STAGES.map((stage) => ({
    stage,
    count: leads.filter((l) => l.stage === stage).length,
    value: leads
      .filter((l) => l.stage === stage)
      .reduce((sum, l) => sum + (Number(l.adBudget) || 0), 0),
  }))

  return (
    <div className="mb-5">
      {/* Top stat cards */}
      <div className="flex gap-3 mb-4 flex-wrap">
        {topStats.map(({ label, value, bg }) => (
          <div
            key={label}
            className={`${bg} rounded-lg px-5 py-3 flex flex-col min-w-[110px] flex-1`}
          >
            <span className="text-white text-xl font-bold">{value}</span>
            <span className="text-white/80 text-xs mt-0.5">{label}</span>
          </div>
        ))}
      </div>

      {/* Pipeline stage counts */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Sales Pipeline
        </p>
        <div className="flex gap-4 overflow-x-auto">
          {stageCounts.map(({ stage, count, value }) => {
            const colors = STAGE_STAT_COLORS[stage]
            return (
              <div key={stage} className="flex flex-col items-center min-w-[90px]">
                <div
                  className={`${colors.bg} ${colors.text} text-xs font-semibold px-3 py-1 rounded-full mb-1 text-center w-full`}
                >
                  {stage}
                </div>
                <span className="text-gray-800 font-bold text-lg">{count}</span>
                <span className="text-gray-400 text-xs">
                  ₹{(value / 1000).toFixed(0)}K
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
