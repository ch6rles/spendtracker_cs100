import { useState } from 'react'
import { Dashboard } from './components/Dashboard'
import { Transactions } from './components/Transactions'
import { Rewards } from './components/Rewards'
import { Sidebar } from './components/Sidebar'
import './App.css'

type ActiveTab = 'dashboard' | 'transactions' | 'rewards' | 'account' | 'settings'

function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard')

  const handleTabChange = (tab: ActiveTab) => {
    console.log('Tab change requested:', tab);
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onNavigate={handleTabChange} />
      case 'transactions':
        return <Transactions />
      case 'rewards':
        return <Rewards />
      case 'account':
        return <div className="content-placeholder">Account settings coming soon...</div>
      case 'settings':
        return <div className="content-placeholder">Settings coming soon...</div>
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="app">
      <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  )
}

export default App
