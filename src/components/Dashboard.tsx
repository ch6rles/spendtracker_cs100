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
import { Bell, User } from 'lucide-react'
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
        backgroundColor: 'rgba(74, 144, 226, 0.1)',
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
        borderColor: '#50C878',
        backgroundColor: 'rgba(80, 200, 120, 0.1)',
        borderDash: [5, 5],
        tension: 0.4,
      },
    ],
  }

  // Category Distribution Data
  const categoryData = {
    labels: ['Food & Drink', 'Shopping', 'Bills'],
    datasets: [
      {
        data: [35, 30, 35],
        backgroundColor: ['#2D5A27', '#7ED321', '#4A90E2'],
        borderWidth: 0,
      },
    ],
  }

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
        <div className="header-left">
          <h1>Dashboard</h1>
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
            <span>Last, First</span>
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
                  <span>Food & drink</span>
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
