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
import { fetchRewardsData } from '../services/rewardsApi'
import type { DashboardData } from '../services/dashboardApi'
import type { RewardsResponse } from '../services/rewardsApi'
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
  const [rewardsData, setRewardsData] = useState<RewardsResponse | null>(null)
  const [loading, setLoading] = useState(true)

  // Helper function for time-based greeting
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  // Calculate quick stats
  const getQuickStats = () => {
    if (!dashboardData) return null

    const thisMonthSpending = dashboardData.monthlySpending?.[0]?.totalSpent || 0
    const lastMonthSpending = dashboardData.monthlySpending?.[1]?.totalSpent || 0
    const change = thisMonthSpending - lastMonthSpending
    const changePercent = lastMonthSpending ? ((change / lastMonthSpending) * 100) : 0

    return {
      thisMonth: thisMonthSpending,
      change: change,
      changePercent: changePercent,
      isPositive: change >= 0
    }
  }

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true)
      try {
        // Fetch both dashboard and rewards data
        const [dashboardDataResponse, rewardsDataResponse] = await Promise.all([
          fetchDashboardData(),
          fetchRewardsData()
        ])
        
        setDashboardData(dashboardDataResponse)
        setRewardsData(rewardsDataResponse)
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
    const colors = ['#fd5901', '#f78104', '#faab36', '#249ea0', '#008083', '#9B9B9B', '#96CEB4', '#FECA57']

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

  // Helper function to get appropriate icon for transaction categories
  const getCategoryIcon = (category: string, description: string): string => {
    const lowerCategory = category.toLowerCase();
    const lowerDescription = description.toLowerCase();
    
    // Check description for more specific matching
    if (lowerDescription.includes('grocery') || lowerDescription.includes('supermarket') || lowerDescription.includes('wholefoods') || lowerDescription.includes('trader')) {
      return '🛒';
    }
    if (lowerDescription.includes('restaurant') || lowerDescription.includes('sushi') || lowerDescription.includes('pizza') || lowerDescription.includes('cafe')) {
      return '🍽️';
    }
    if (lowerDescription.includes('coffee') || lowerDescription.includes('starbucks') || lowerDescription.includes('cafe')) {
      return '☕';
    }
    if (lowerDescription.includes('gas') || lowerDescription.includes('fuel') || lowerDescription.includes('station')) {
      return '⛽';
    }
    if (lowerDescription.includes('electric') || lowerDescription.includes('utility') || lowerDescription.includes('bill')) {
      return '💡';
    }
    if (lowerDescription.includes('flight') || lowerDescription.includes('airline') || lowerDescription.includes('booking')) {
      return '✈️';
    }
    if (lowerDescription.includes('streaming') || lowerDescription.includes('netflix') || lowerDescription.includes('spotify')) {
      return '📺';
    }
    if (lowerDescription.includes('salary') || lowerDescription.includes('payroll') || lowerDescription.includes('interest')) {
      return '💰';
    }
    if (lowerDescription.includes('bobashop') || lowerDescription.includes('boba') || lowerDescription.includes('tea')) {
      return '🧋';
    }
    
    // Fallback to category-based icons
    switch (lowerCategory) {
      case 'food & groceries':
      case 'food':
      case 'groceries':
        return '🛒';
      case 'transportation':
      case 'transport':
        return '🚗';
      case 'entertainment':
        return '🎬';
      case 'income':
        return '💰';
      case 'housing & utilities':
      case 'utilities':
        return '🏠';
      default:
        return '💳';
    }
  };

  // Get recent transactions for timeline using API data
  const getRecentTransactions = () => {
    if (!dashboardData?.recent || dashboardData.recent.length === 0) {
      return [
        { icon: '🛒', name: 'Wholefoods', date: '2025-10-16', amount: -45.50 },
        { icon: '☕', name: 'Starbucks', date: '2025-10-16', amount: -6.75 },
        { icon: '⛽', name: 'Gas', date: '2025-10-12', amount: -62.30 },
        { icon: '💰', name: 'Salary', date: '2025-10-10', amount: 3200.00 },
        { icon: '🛒', name: 'Trader Joe', date: '2025-10-09', amount: -34.25 },
        { icon: '🧋', name: 'Bobashop', date: '2025-10-05', amount: -8.50 }
      ];
    }
    
    return dashboardData.recent.slice(0, 6).map(transaction => ({
      icon: getCategoryIcon(transaction.category, transaction.description),
      name: transaction.description,
      date: transaction.date,
      amount: transaction.amount,
      id: transaction.id
    }));
  };

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
        <h1 style={{ color: "white" }}>Dashboard</h1>
        <div className="header-left">

          <select className="account-selector">
            <option>All Accounts</option>
            {rewardsData?.recommendedCards?.map((rewardCard, index) => (
              <option key={index}>{rewardCard.card.cardName}</option>
            ))}
          </select>
        </div>
        <div className="header-right">
          <Bell size={20} />
          <div className="user-info">
            <User color="var(--warm-gray)" size={20} />
            <span style={{ color: "white" }}> Nhien, Pham</span>
          </div>
        </div>
      </header>

      {/* Welcome Section */}
      <div className="welcome-section">
        <div className="welcome-content">
          <h2>{getTimeBasedGreeting()}, Nhien! 👋</h2>
          <p>Here's your financial snapshot for today</p>
        </div>
        {getQuickStats() && (
          <div className="quick-stats">
            <div className="stat-card">
              <div className="stat-value">${getQuickStats()?.thisMonth.toFixed(2)}</div>
              <div className="stat-label">Spent this month</div>
            </div>
            <div className="stat-card">
              <div className={`stat-value ${getQuickStats()?.isPositive ? 'negative' : 'positive'}`}>
                {getQuickStats()?.isPositive ? '+' : ''}${Math.abs(getQuickStats()?.change || 0).toFixed(2)}
              </div>
              <div className="stat-label">vs last month</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{rewardsData?.recommendedCards?.length || 0}</div>
              <div className="stat-label">Active accounts</div>
            </div>
          </div>
        )}
      </div>

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
                  <div key={transaction.id || index} className="timeline-item">
                    <div className="timeline-icon">{transaction.icon}</div>
                    <div className="timeline-info">
                      <div className="timeline-name">{transaction.name}</div>
                      <div className="timeline-meta">
                        <div className="timeline-date">
                          {new Date(transaction.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                        {transaction.amount && (
                          <div className={`timeline-amount ${transaction.amount >= 0 ? 'positive' : 'negative'}`}>
                            {transaction.amount >= 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                          </div>
                        )}
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
              {rewardsData?.recommendedCards?.map((rewardCard, index) => (
                <div key={index} className="account-item">
                  <div className="account-info">
                    <div className="account-icon" style={{ backgroundColor: '#6366f1' }}>
                      💳
                    </div>
                    <span className="account-name">{rewardCard.card.cardName}</span>
                  </div>
                  <div className="account-balance-section">
                    <span className="account-balance">Active</span>
                    <ChevronDown size={16} />
                  </div>
                </div>
              )) || (
                <div className="account-item">
                  <div className="account-info">
                    <div className="account-icon" style={{ backgroundColor: '#6366f1' }}>
                      💳
                    </div>
                    <span className="account-name">Loading accounts...</span>
                  </div>
                </div>
              )}
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
                  <div className="color-dot" style={{ backgroundColor: '#fd5901' }}></div>
                  <span>Foods & Groceries</span>
                </div>
                <div className="category-item">
                  <div className="color-dot" style={{ backgroundColor: '#f78104' }}></div>
                  <span>Transportation</span>
                </div>
                <div className="category-item">
                  <div className="color-dot" style={{ backgroundColor: '#faab36' }}></div>
                  <span>Housing & Utilities</span>
                </div>
                <div className="category-item">
                  <div className="color-dot" style={{ backgroundColor: '#249ea0' }}></div>
                  <span>Entertainment</span>
                </div>
                <div className="category-item">
                  <div className="color-dot" style={{ backgroundColor: '#008083' }}></div>
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
