import { Bell, User } from 'lucide-react'
import './Rewards.css'

export function Rewards() {
  const rewardCards = [
    {
      cardName: 'Chase Sapphire Preferred',
      cardType: 'Visa Signature',
      cardColor: 'linear-gradient(135deg, #1a1f71, #0b0b45)',
      cardLogo: 'VISA',
      lastFourDigits: '4123',
      rewards: [
        {
          name: 'Grocery Shopping at Whole Foods (3x points)',
          reward: '$5.55',
          color: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)',
          category: 'Grocery'
        },
        {
          name: 'Gas Station Shell (5% cashback)',
          reward: '$3.27',
          color: 'linear-gradient(135deg, #96CEB4, #FECA57)',
          category: 'Gas'
        }
      ]
    },
    {
      cardName: 'American Express Gold',
      cardType: 'American Express',
      cardColor: 'linear-gradient(135deg, #ffd700, #b8860b)',
      cardLogo: 'AMEX',
      lastFourDigits: '3456',
      rewards: [
        {
          name: 'Amazon Online Shopping (2x points)',
          reward: '$4.98',
          color: 'linear-gradient(135deg, #4ECDC4, #45B7D1)',
          category: 'Online Shopping'
        },
        {
          name: 'Starbucks Coffee (4x points)',
          reward: '$2.80',
          color: 'linear-gradient(135deg, #FF9A9E, #FAD0C4)',
          category: 'Dining'
        }
      ]
    },
    {
      cardName: 'Capital One Venture',
      cardType: 'Mastercard',
      cardColor: 'linear-gradient(135deg, #2d5a27, #4a7c59)',
      cardLogo: 'MASTERCARD',
      lastFourDigits: '7890',
      rewards: [
        {
          name: 'Target Shopping (2.5x points)',
          reward: '$3.75',
          color: 'linear-gradient(135deg, #A1C4FD, #C2E9FB)',
          category: 'Retail'
        },
        {
          name: 'Netflix Subscription (3x points)',
          reward: '$1.50',
          color: 'linear-gradient(135deg, #FF6B6B, #556270)',
          category: 'Entertainment'
        }
      ]
    }
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
        <div className="cards-section">
          {rewardCards.map((card, index) => (
            <div key={index} className="card-rewards-group">
              <div className="card-section">
                <h2>{card.cardName}</h2>
                <div className="card-visual" style={{ background: card.cardColor }}>
                  <div className="card-chip"></div>
                  <div className="card-number">**** **** **** {card.lastFourDigits}</div>
                  <div className="card-type">{card.cardType}</div>
                  <div className="card-logo">{card.cardLogo}</div>
                </div>
              </div>

              <div className="reward-cards">
                {card.rewards.map((reward, rewardIndex) => (
                  <div
                    key={rewardIndex}
                    className="reward-item"
                    style={{ '--card-color': reward.color } as React.CSSProperties}
                  >
                    <div className="reward-amount">{reward.reward}</div>
                    <div className="reward-description">{reward.name}</div>
                    <div className="reward-category">{reward.category}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}