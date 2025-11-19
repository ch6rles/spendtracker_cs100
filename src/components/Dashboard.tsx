import { useState, useEffect } from 'react'
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
import { fetchDashboardData } from '../services/dashboardApi'
import type { DashboardData } from '../services/dashboardApi'
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
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true)
      try {
        const data = await fetchDashboardData()
        setDashboardData(data)
      } catch (error) {
        console.error('Failed to load dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadDashboardData()
  }, [])

  const handleViewTransactions = () => {
    console.log('handleViewTransactions called, onNavigate:', onNavigate);
    if (onNavigate) {
      onNavigate('transactions');
    }
  };

  // Convert monthly spending data to chart format
  const getIncomeData = () => {
    if (!dashboardData?.monthlySpending) {
      return {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Spending',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            borderColor: '#7ED321',
            backgroundColor: 'rgba(126, 211, 33, 0.1)',
            tension: 0.4,
          },
        ],
      }
    }

    const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const spendingData = new Array(12).fill(0)
    
    dashboardData.monthlySpending.forEach(monthData => {
      const month = new Date(monthData.month).getMonth()
      spendingData[month] = monthData.totalSpent
    })

    return {
      labels: monthLabels,
      datasets: [
        {
          label: 'Spending',
          data: spendingData,
          borderColor: '#7ED321',
          backgroundColor: 'rgba(126, 211, 33, 0.1)',
          tension: 0.4,
        },
      ],
    }
  }

  // Convert breakdown data to category chart format
  const getCategoryData = () => {
    if (!dashboardData?.breakdown) {
      return {
        labels: ['Food & Groceries', 'Shopping', 'Other'],
        datasets: [
          {
            data: [0, 0, 0],
            backgroundColor: ['#3674B5', '#66BB51', '#0B4F1A'],
            borderWidth: 0,
          },
        ],
      }
    }

    const breakdown = dashboardData.breakdown
    const labels = Object.keys(breakdown).filter(key => breakdown[key as keyof typeof breakdown] > 0)
    const data = labels.map(label => breakdown[label as keyof typeof breakdown])
    
    // Use different colors for different categories
    const colors = ['#3674B5', '#66BB51', '#0B4F1A', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57']
    
    return {
      labels: labels.length > 0 ? labels : ['No Data'],
      datasets: [
        {
          data: data.length > 0 ? data : [1],
          backgroundColor: colors.slice(0, labels.length || 1),
          borderWidth: 0,
        },
      ],
    }
  }

  // Get best card data
  const getBestCards = () => {
    if (!dashboardData?.bestCardRecommendation) {
      return [{
        name: 'No recommendation available',
        reward: '$0.00',
        color: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)',
      }]
    }

    const recommendation = dashboardData.bestCardRecommendation
    return [{
      name: `${recommendation.card.cardName} - ${recommendation.recommendationReason}`,
      reward: `$${recommendation.projectedAnnualRewards.toFixed(2)}`,
      color: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)',
    }]
  }

  const incomeData = getIncomeData()
  const categoryData = getCategoryData()
  const bestCards = getBestCards()

  // Get recent transactions for timeline (fallback to empty array if no recent data)
  const getRecentTransactions = () => {
    if (!dashboardData?.recent || dashboardData.recent.length === 0) {
      return [
        { icon: '🛒', name: 'Wholefoods', date: '2025-10-16' },
        { icon: '☕', name: 'Starbucks', date: '2025-10-16' },
        { icon: '⛽', name: 'Gas', date: '2025-10-12' },
        { icon: '💰', name: 'Salary', date: '2025-10-10' },
        { icon: '🛒', name: 'Trader Joe', date: '2025-10-09' },
        { icon: '🧋', name: 'Bobashop', date: '2025-10-05' }
      ]
    }
    return dashboardData.recent.slice(0, 6)
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

  if (loading) {
    return (
      <div className="dashboard">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <div>Loading dashboard data...</div>
        </div>
      </div>
    )
  }

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
            </div>

            {/* Transaction Timeline */}
            <div className="transaction-timeline">
              <h3>Recent Purchases</h3>
              <div className="timeline-items">
                {getRecentTransactions().map((transaction: any, index: number) => (
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
              <span>🔄 about 5 hours ago | </span>
              <button>
                <span>Sync Now</span>
              </button>
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
                  <span>Housing & Utilities</span>
                </div>
                <div className="category-item">
                  <div className="color-dot" style={{ backgroundColor: '#7ED321' }}></div>
                  <span>Transportation</span>
                </div>
                <div className="category-item">
                  <div className="color-dot" style={{ backgroundColor: '#4A90E2' }}></div>
                  <span>Foods & Groceries</span>
                </div>
                <div className="category-item">
                  <div className="color-dot" style={{ backgroundColor: '#D0021B' }}></div>
                  <span>Entertainment</span>
                </div>
                <div className="category-item">
                  <div className="color-dot" style={{ backgroundColor: '#F5A623' }}></div>
                  <span>Shopping</span>
                </div>
                <div className="category-item">
                  <div className="color-dot" style={{ backgroundColor: '#9B9B9B' }}></div>
                  <span>Other</span>
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
