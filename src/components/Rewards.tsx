import { useState, useEffect } from 'react'
import { Bell, User } from 'lucide-react'
import { fetchRewardsData } from '../services/rewardsApi'
import type { RewardsResponse } from '../services/rewardsApi'
import './Rewards.css'

export function Rewards() {
  const [rewardsData, setRewardsData] = useState<RewardsResponse | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadRewards = async () => {
      setLoading(true)
      try {
        const data = await fetchRewardsData()
        setRewardsData(data)
      } catch (error) {
        console.error('Failed to load rewards:', error)
      } finally {
        setLoading(false)
      }
    }

    loadRewards()
  }, [])

  const getCardTypeDisplay = (issuer: string) => {
    switch (issuer.toLowerCase()) {
      case 'chase':
        return { type: 'Visa Signature', logo: 'VISA' }
      case 'american express':
        return { type: 'American Express', logo: 'AMEX' }
      case 'capital one':
        return { type: 'Mastercard', logo: 'MASTERCARD' }
      default:
        return { type: 'Credit Card', logo: 'CARD' }
    }
  }

  const getCardColor = (issuer: string) => {
    switch (issuer.toLowerCase()) {
      case 'chase':
        return 'linear-gradient(135deg, #1a1f71, #0b0b45)'
      case 'american express':
        return 'linear-gradient(135deg, #ffd700, #b8860b)'
      case 'capital one':
        return 'linear-gradient(135deg, #2d5a27, #4a7c59)'
      default:
        return 'linear-gradient(135deg, #333, #666)'
    }
  }

  const generateCardNumber = (cardId: string) => {
    const numbers: { [key: string]: string } = {
      'csp': '4123',
      'bcp': '3456',
      'cov': '7890'
    }
    return numbers[cardId] || '0000'
  }

  if (loading) {
    return (
      <div className="rewards">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <div>Loading rewards data...</div>
        </div>
      </div>
    )
  }

  if (!rewardsData) {
    return (
      <div className="rewards">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <div>No rewards data available</div>
        </div>
      </div>
    )
  }

  return (
    <div className="rewards">
      <header className="rewards-header">
        <div className="header-left">
          <h1 className="rewards-title">Rewards</h1>
        </div>
        <div className="header-right">
          <Bell size={20} />
          <div className="user-info">
            <User color="var(--warm-gray)" size={20} />
            <span style={{ color: "white" }}> Nhien, Pham</span>
          </div>
        </div>
      </header>

      <div className="rewards-content">
        <div className="cards-section">
          {rewardsData.recommendedCards.map((rewardCard, index) => {
            const cardDisplay = getCardTypeDisplay(rewardCard.card.issuer)
            const cardColor = getCardColor(rewardCard.card.issuer)
            const lastFourDigits = generateCardNumber(rewardCard.card.id)

            // Generate rewards based on categories or use projected annual rewards
            const rewards = Object.keys(rewardCard.rewardsByCategory).length > 0
              ? Object.entries(rewardCard.rewardsByCategory).map(([category, amount]) => ({
                name: `${category} (${(rewardCard.card.categoryRewardRates[category.toLowerCase()] * 100 || rewardCard.card.baseRewardRate * 100).toFixed(1)}x points)`,
                reward: `$${amount.toFixed(2)}`,
                color: index % 2 === 0 ? 'linear-gradient(135deg, #FF6B6B, #4ECDC4)' : 'linear-gradient(135deg, #96CEB4, #FECA57)',
                category: category
              }))
              : [{
                name: `${rewardCard.card.cardName} - ${rewardCard.recommendationReason}`,
                reward: `$${rewardCard.projectedAnnualRewards.toFixed(2)}`,
                color: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)',
                category: 'General'
              }]

            return (
              <div key={index} className="card-rewards-group">
                <div className="card-section">
                  <h2>{rewardCard.card.cardName}</h2>
                  <div className="card-visual" style={{ background: cardColor }}>
                    <div className="card-chip"></div>
                    <div className="card-number">**** **** **** {lastFourDigits}</div>
                    <div className="card-type">{cardDisplay.type}</div>
                    <div className="card-logo">{cardDisplay.logo}</div>
                  </div>
                </div>

                <div className="reward-cards">
                  {rewards.map((reward, rewardIndex) => (
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
            )
          })}
        </div>
      </div>
    </div>
  )
}