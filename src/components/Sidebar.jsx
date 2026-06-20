import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  Megaphone,
  CheckSquare,
  Video,
  Calendar,
  BookUser,
  Bell,
  BarChart2,
  MessageSquare,
  Ticket,
  ShieldCheck,
  Settings,
  Zap,
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/' },
  { label: 'Leads', icon: Users, to: '/leads' },
  { label: 'Campaigns', icon: Megaphone, to: '#' },
  { label: 'Tasks', icon: CheckSquare, to: '#' },
  { label: 'Meetings', icon: Video, to: '#' },
  { label: 'Calendar', icon: Calendar, to: '#' },
  { label: 'Contacts', icon: BookUser, to: '#' },
  { label: 'Announcement', icon: Bell, to: '#' },
  { label: 'Reports', icon: BarChart2, to: '#' },
  { label: 'Feedback', icon: MessageSquare, to: '#' },
  { label: 'Tickets', icon: Ticket, to: '#' },
  { label: 'Admin Panel', icon: ShieldCheck, to: '#' },
  { label: 'Settings', icon: Settings, to: '#' },
]

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-48 flex flex-col z-20"
      style={{ background: '#0d1b2a' }}>
      <div className="flex items-center gap-2 px-4 py-5 border-b border-white/10">
        <div className="w-7 h-7 rounded-md flex items-center justify-center"
          style={{ background: '#1565c0' }}>
          <Zap size={14} className="text-white" />
        </div>
        <span className="text-white font-semibold text-sm tracking-wide">CRM</span>
      </div>

      <nav className="flex-1 py-3 overflow-y-auto">
        {navItems.map(({ label, icon: Icon, to }) => (
          <NavLink
            key={label}
            to={to}
            onClick={to === '#' ? (e) => e.preventDefault() : undefined}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 text-xs font-medium transition-all duration-150 cursor-pointer select-none
              ${isActive && to !== '#'
                ? 'bg-blue-600 text-white rounded-none border-l-2 border-blue-300'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <Icon size={15} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="px-4 py-4 border-t border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-semibold">
            PC
          </div>
          <div>
            <p className="text-white text-xs font-medium">Profitcast</p>
            <p className="text-slate-400 text-xs">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
