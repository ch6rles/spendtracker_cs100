import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import { Line, Doughnut } from 'react-chartjs-2'
import { Bell, User, ChevronDown, TrendingUp, Calendar, CreditCard, DollarSign } from 'lucide-react'
import { getRecentTransactionIcons } from '../data/transactions'
import './Dashboard.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

interface DashboardProps {
  onNavigate?: (tab: 'dashboard' | 'transactions' | 'rewards' | 'account' | 'settings') => void
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const handleViewTransactions = () => {
    console.log('handleViewTransactions called, onNavigate:', onNavigate);
    if (onNavigate) {
      onNavigate('transactions');
    }
  };

  // Mock account data
  const accounts = [
    {
      name: 'Checking',
      balance: '$2,847.23',
      icon: '🏦',
      type: 'checking',
      color: '#6366f1'
    },
    {
      name: 'Credit Cards',
      balance: '$1,234.56',
      icon: '💳',
      type: 'credit',
      color: '#ec4899'
    },
    {
      name: 'Net Cash',
      balance: '$15,847.90',
      icon: '💰',
      type: 'cash',
      color: '#10b981'
    },
    {
      name: 'Savings',
      balance: '$8,542.11',
      icon: '🏦',
      type: 'savings',
      color: '#f59e0b'
    },
    {
      name: 'Investments',
      balance: '$24,891.47',
      icon: '📈',
      type: 'investment',
      color: '#8b5cf6'
    }
  ];

  // Recent transactions for Rocket Money style
  const recentTransactions = [
    {
      date: '10/24',
      name: 'Uniqlo',
      amount: '-$42.89',
      icon: '👕',
      category: 'Shopping'
    },
    {
      date: '10/23',
      name: 'Grocery Store',
      amount: '-$156.73',
      icon: '🛒',
      category: 'Food & Dining'
    },
    {
      date: '10/22',
      name: 'Gas Station Shell',
      amount: '-$65.42',
      icon: '⛽',
      category: 'Transportation'
    }
  ];

  // Monthly spending chart data
  const spendingData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        data: [800, 1200, 950, 1100],
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  return (
    <div className="rocket-dashboard">
      {/* Header */}
      <header className="rocket-header">
        <div className="header-content">
          <div className="greeting-section">
            <h1>Good morning, Maxwell</h1>
            <div className="current-spend">
              <span className="spend-label">Current spend this month</span>
              <div className="spend-amount">$3,247</div>
              <div className="spend-alert">
                <span className="alert-icon">⚠️</span>
                <span>You've spent $1,416 more than last month</span>
              </div>
            </div>
          </div>

          <div className="chart-preview">
            <div className="mini-chart">
              <Line
                data={spendingData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: {
                    x: { display: false },
                    y: { display: false }
                  },
                  elements: { point: { radius: 0 } }
                }}
              />
            </div>
            <div className="payday-notice">
              <span className="payday-icon">💰</span>
              <span>Payday in 9 days</span>
            </div>
          </div>
        </div>
      </header>

      <div className="rocket-content">
        {/* Left Column */}
        <div className="left-column">
          {/* Recent Transactions */}
          <div className="transactions-section">
            <div className="section-header">
              <h3>RECENT TRANSACTIONS</h3>
              <span className="transaction-count">You've had 15 transactions so far this month</span>
            </div>

            <div className="transactions-list">
              <div className="transaction-header">
                <span>Date</span>
                <span>Name</span>
                <span>Amount</span>
              </div>

              {recentTransactions.map((transaction, index) => (
                <div key={index} className="transaction-row">
                  <span className="transaction-date">{transaction.date}</span>
                  <div className="transaction-name">
                    <span className="transaction-icon">{transaction.icon}</span>
                    <span>{transaction.name}</span>
                  </div>
                  <span className="transaction-amount">{transaction.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="right-column">
          {/* Accounts Section */}
          <div className="accounts-section">
            <h3>ACCOUNTS</h3>
            <div className="sync-info">
              <span>🔄 about 5 hours ago | Sync now</span>
            </div>

            <div className="accounts-list">
              {accounts.map((account, index) => (
                <div key={index} className="account-item">
                  <div className="account-info">
                    <div className="account-icon" style={{ backgroundColor: account.color }}>
                      {account.icon}
                    </div>
                    <span className="account-name">{account.name}</span>
                  </div>
                  <div className="account-balance-section">
                    <span className="account-balance">{account.balance}</span>
                    <ChevronDown size={16} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Coming Up Section */}
          <div className="coming-up-section">
            <h3>COMING UP</h3>
            <div className="coming-up-content">
              <p>You have 0 recurring charges due within the next 10 days for $0.</p>

              {/* Mini Calendar */}
              <div className="mini-calendar">
                <div className="calendar-header">
                  <span>Sun</span>
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                </div>
                <div className="calendar-grid">
                  {[...Array(7)].map((_, i) => (
                    <div key={i} className={`calendar-day ${i === 4 ? 'today' : ''}`}>
                      {i + 20}
                    </div>
                  ))}
                  {[...Array(7)].map((_, i) => (
                    <div key={i + 7} className="calendar-day">
                      {i + 27}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
