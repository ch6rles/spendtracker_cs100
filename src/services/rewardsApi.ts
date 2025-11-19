const API_BASE_URL = 'https://acrosporous-ligneous-raguel.ngrok-free.dev/api';

export interface Card {
  id: string;
  cardName: string;
  issuer: string;
  annualFee: number;
  baseRewardRate: number;
  categoryRewardRates: {
    [category: string]: number;
  };
  signupBonus: string;
  benefits: string | null;
  apr: string | null;
}

export interface RewardCard {
  card: Card;
  projectedAnnualRewards: number;
  rewardsByCategory: {
    [category: string]: number;
  };
  recommendationReason: string;
}

export interface RewardsResponse {
  currentRewards: {
    totalPointsEarned: number;
    estimatedCashValue: number;
    pointsByCategory: {
      [category: string]: number;
    };
    missedOpportunities: any[] | null;
  };
  recommendedCards: RewardCard[];
  merchantRecommendations: any[];
}

export const fetchRewardsData = async (): Promise<RewardsResponse> => {
  try {
    console.log('Fetching rewards data from API...');
    
    const response = await fetch(`${API_BASE_URL}/rewards`, {
      method: 'GET',
      headers: {
        'ngrok-skip-browser-warning': 'true',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      cache: 'no-cache'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Rewards data received:', data);
    return data;
  } catch (error) {
    console.error('Error fetching rewards data:', error);
    console.log('Using fallback data due to API error');
    // Return fallback data if API fails
    return {
      currentRewards: {
        totalPointsEarned: 2450,
        estimatedCashValue: 245.50,
        pointsByCategory: {
          'Grocery': 850,
          'Gas': 620,
          'Dining': 480,
          'Online Shopping': 500
        },
        missedOpportunities: null
      },
      recommendedCards: [
        {
          card: {
            id: 'csp',
            cardName: 'Chase Sapphire Preferred',
            issuer: 'Chase',
            annualFee: 95,
            baseRewardRate: 0.01,
            categoryRewardRates: {
              'streaming': 0.03,
              'dining': 0.03,
              'travel': 0.02
            },
            signupBonus: '60,000 points after spending $4,000 in first 3 months',
            benefits: null,
            apr: null
          },
          projectedAnnualRewards: 855.50,
          rewardsByCategory: {
            'Grocery': 125.30,
            'Gas': 89.20
          },
          recommendationReason: 'Good for grocery and gas spending'
        },
        {
          card: {
            id: 'bcp',
            cardName: 'Blue Cash Preferred',
            issuer: 'American Express',
            annualFee: 95,
            baseRewardRate: 0.01,
            categoryRewardRates: {
              'streaming': 0.06,
              'transit': 0.03,
              'gas': 0.03,
              'groceries': 0.06
            },
            signupBonus: '$350 back after spending $3,000 in first 6 months',
            benefits: null,
            apr: null
          },
          projectedAnnualRewards: 649.80,
          rewardsByCategory: {
            'Grocery': 180.50,
            'Gas': 145.75
          },
          recommendationReason: 'Best for streaming and groceries'
        },
        {
          card: {
            id: 'cov',
            cardName: 'Capital One Venture',
            issuer: 'Capital One',
            annualFee: 95,
            baseRewardRate: 0.02,
            categoryRewardRates: {
              'travel': 0.025,
              'dining': 0.025
            },
            signupBonus: '75,000 miles after spending $4,000 in first 3 months',
            benefits: null,
            apr: null
          },
          projectedAnnualRewards: 437.25,
          rewardsByCategory: {
            'Travel': 95.50,
            'Dining': 78.30
          },
          recommendationReason: 'Great for travel and dining'
        }
      ],
      merchantRecommendations: []
    };
  }
};
