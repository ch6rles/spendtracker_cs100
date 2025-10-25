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
import { Bell, User, ChevronDown } from 'lucide-react'
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

  // Income Analysis Chart Data
  const incomeData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Income',
        data: [3, 4, 3, 4, 5, 8, 10, 15, 18, 19, 20, 20],
        borderColor: '#4A90E2',
        backgroundColor: 'rgba(36, 97, 168, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Spending',
        data: [2, 3, 2, 3, 4, 6, 8, 12, 16, 17, 18, 19],
        borderColor: '#7ED321',
        backgroundColor: 'rgba(126, 211, 33, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Future Trends',
        data: [null, null, null, null, null, null, null, null, null, 19, 20, 21],
        borderColor: '#e41111ff',
        backgroundColor: 'rgba(236, 15, 15, 0.1)',
        borderDash: [5, 5],
        tension: 0.4,
      },
    ],
  }

  // Category Distribution Data
  const categoryData = {
    labels: ['Bills', 'Shopping', 'Food & Drink'],
    datasets: [
      {
        data: [50, 10, 40],
        backgroundColor: ['#3674B5', '#66BB51', '#0B4F1A'],
        borderWidth: 0,
      },
    ],
  }





  // mock account data
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


  const bestCards = [
    {
      name: 'Estimate rewards on Whole Foods (3x points)',
      reward: '$5.55',
      color: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)',
    },
    {
      name: 'Estimate rewards on Whole Foods (2.5x points)',
      reward: '$4.95',
      color: 'linear-gradient(135deg, #4ECDC4, #45B7D1)',
    },
    {
      name: 'Estimate rewards on Whole Foods (1.8x points)',
      reward: '$3.45',
      color: 'linear-gradient(135deg, #96CEB4, #FECA57)',
    },
  ]

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="header-left">

          <select className="account-selector">
            <option>All Accounts</option>
            <option>Checking Account</option>
            <option>Savings Account</option>
          </select>
        </div>
        <div className="header-right">
          <Bell size={20} />
          <div className="user-info">
            <User size={20} />
            <span>Nhien, Pham</span>
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="chart-section">
          <div className="income-analysis">
            <h2>Income Analysis</h2>
            <div className="chart-container">
              <Line
                data={incomeData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    x: {
                      grid: {
                        display: false,
                      },
                    },
                    y: {
                      grid: {
                        color: 'rgba(0, 0, 0, 0.1)',
                      },
                      beginAtZero: true,
                    },
                  },
                }}
              />
              <div className="future-trends-label">Future Trends</div>
            </div>

            {/* Transaction Timeline */}
            <div className="transaction-timeline">
              <h3>Recent Purchases</h3>
              <div className="timeline-items">
                {getRecentTransactionIcons(6).map((transaction, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-icon">{transaction.icon}</div>
                    <div className="timeline-info">
                      <div className="timeline-name">{transaction.name}</div>
                      <div className="timeline-date">
                        {new Date(transaction.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
        </div>

        <div className="bottom-section">
          <div className="category-distribution">
            <h3>Distribution By Categories</h3>
            <div className="doughnut-container">
              <Doughnut
                data={categoryData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  cutout: '60%',
                }}
              />
              <button
                className="view-transactions-btn"
                onClick={handleViewTransactions}
              >
                View All Transactions 📋
              </button>
              <div className="category-labels">
                <div className="category-item">
                  <div className="color-dot" style={{ backgroundColor: '#2D5A27' }}></div>
                  <span>food & drink</span>
                </div>
                <div className="category-item">
                  <div className="color-dot" style={{ backgroundColor: '#7ED321' }}></div>
                  <span>shopping</span>
                </div>
                <div className="category-item">
                  <div className="color-dot" style={{ backgroundColor: '#4A90E2' }}></div>
                  <span>bills</span>
                </div>
              </div>
            </div>

          </div>

          <div className="best-cards">
            <h3>Best Card for Next Purchase</h3>
            <div className="cards-list">
              {bestCards.map((card, index) => (
                <div key={index} className="card-item">
                  <div className="card-visual" style={{ background: card.color }}>
                    <div className="card-chip"></div>
                    <div className="card-number">**** **** **** ****</div>
                    <div className="card-logo">VISA</div>
                  </div>
                  <div className="card-info">
                    <div className="reward-amount">{card.reward}</div>
                    <div className="reward-description">{card.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
