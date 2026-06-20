import { STAGES } from '../data/constants'

export default function StageFilter({ active, onChange, leads }) {
  const allCount = leads.length
  const getCnt = (stage) => leads.filter((l) => l.stage === stage).length

  const tabs = ['All', ...STAGES]

  return (
    <div className="flex items-center gap-1 border-b border-gray-200 mb-0">
      {tabs.map((tab) => {
        const count = tab === 'All' ? allCount : getCnt(tab)
        const isActive = active === tab
        return (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium border-b-2 transition-all whitespace-nowrap
              ${isActive
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
              }`}
          >
            {tab}
            <span
              className={`text-xs rounded-full px-1.5 py-0.5 font-semibold
                ${isActive ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}
            >
              {count}
            </span>
          </button>
        )
      })}
    </div>
  )
}
