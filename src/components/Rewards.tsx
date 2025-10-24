import { Bell, User } from 'lucide-react'
import './Rewards.css'

export function Rewards() {
  const rewardCards = [
    {
      name: 'Estimate rewards on Whole Foods (3x points)',
      reward: '$5.55',
      color: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)',
    },
    {
      name: 'Estimate rewards on Whole Foods (3x points)',
      reward: '$5.55',
      color: 'linear-gradient(135deg, #96CEB4, #FECA57)',
    },
  ]

  return (
    <div className="rewards">
      <header className="rewards-header">
        <div className="header-left">
          <h1 className="rewards-title">Rewards</h1>
        </div>
        <div className="header-right">
          <Bell size={20} />
          <div className="user-info">
            <User size={20} />
            <span>Nhien, Pham</span>
          </div>
        </div>
      </header>

      <div className="rewards-content">
        <div className="debit-card-section">
          <h2>Debit Visa Card</h2>

          <div className="rewards-layout">
            <div className="main-card">
              <div className="card-visual main">
                <div className="card-chip"></div>
                <div className="card-number">**** **** **** ****</div>
                <div className="card-logo">VISA</div>
              </div>
            </div>

            <div className="reward-cards">
              {rewardCards.map((card, index) => (
                <div key={index} className="reward-item">
                  <div className="reward-amount">{card.reward}</div>
                  <div className="reward-description">{card.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
