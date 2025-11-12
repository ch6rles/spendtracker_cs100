import { Home, CreditCard, Gift, User, Settings } from 'lucide-react'
import './Sidebar.css'

type ActiveTab = 'dashboard' | 'transactions' | 'rewards' | 'account' | 'settings'

interface SidebarProps {
  activeTab: ActiveTab
  onTabChange: (tab: ActiveTab) => void
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard' as const, icon: Home, label: 'Dashboard' },
    { id: 'transactions' as const, icon: CreditCard, label: 'Transaction' },
    { id: 'rewards' as const, icon: Gift, label: 'Rewards' },
    { id: 'account' as const, icon: User, label: 'Account' },
    { id: 'settings' as const, icon: Settings, label: 'Settings' },
  ]

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="brand">BILLIONAIRE BANK</div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            className={`nav-item ${activeTab === id ? 'active' : ''}`}
            onClick={() => onTabChange(id)}
          >
            <Icon size={20} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer" aria-hidden="true">
        <img src="./src/assets/404NOTFOUND.png" alt="404 NOT FOUND" className="footer-404" />
      </div>
    </aside>
  )
}
