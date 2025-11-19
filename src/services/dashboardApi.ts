const API_BASE_URL = 'https://acrosporous-ligneous-raguel.ngrok-free.dev/api';

export interface DashboardData {
  recent: any[];
  breakdown: {
    'Food & Groceries': number;
    'Transportation': number;
    'Housing & Utilities': number;
    'Entertainment': number;
    'Healthcare': number;
    'Education': number;
    'Shopping': number;
    'Other': number;
  };
  bestCardRecommendation: {
    card: {
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
    };
    projectedAnnualRewards: number;
    rewardsByCategory: {
      [category: string]: number;
    };
    recommendationReason: string;
  };
  monthlySpending: Array<{
    month: string;
    totalSpent: number;
    transactionCount: number;
  }>;
}

export const fetchDashboardData = async (): Promise<DashboardData> => {
  try {
    console.log('Fetching dashboard data from API...');
    
    const response = await fetch(`${API_BASE_URL}/dashboard`, {
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
    console.log('Dashboard data received:', data);
    return data;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    console.log('Using fallback data due to API error');
    // Return fallback data if API fails
    return {
      recent: [],
      breakdown: {
        'Food & Groceries': 45.50,
        'Transportation': 23.75,
        'Housing & Utilities': 120.00,
        'Entertainment': 35.20,
        'Healthcare': 0,
        'Education': 0,
        'Shopping': 67.80,
        'Other': 15.30
      },
      bestCardRecommendation: {
        card: {
          id: 'fallback',
          cardName: 'Chase Sapphire Preferred',
          issuer: 'Chase',
          annualFee: 95,
          baseRewardRate: 0.01,
          categoryRewardRates: { dining: 0.03, travel: 0.02 },
          signupBonus: '60,000 points after spending $4,000',
          benefits: null,
          apr: null
        },
        projectedAnnualRewards: 245.50,
        rewardsByCategory: { dining: 125.30, travel: 89.20, other: 31.00 },
        recommendationReason: 'Best for dining and travel'
      },
      monthlySpending: [
        { month: '2025-11', totalSpent: 307.55, transactionCount: 8 },
        { month: '2025-10', totalSpent: 284.30, transactionCount: 12 },
        { month: '2025-09', totalSpent: 198.75, transactionCount: 7 },
        { month: '2025-08', totalSpent: 445.20, transactionCount: 15 },
        { month: '2025-07', totalSpent: 367.90, transactionCount: 11 },
        { month: '2025-06', totalSpent: 234.60, transactionCount: 9 },
        { month: '2025-05', totalSpent: 189.40, transactionCount: 6 },
        { month: '2025-04', totalSpent: 278.80, transactionCount: 10 },
        { month: '2025-03', totalSpent: 156.25, transactionCount: 5 },
        { month: '2025-02', totalSpent: 298.45, transactionCount: 8 },
        { month: '2025-01', totalSpent: 423.10, transactionCount: 13 },
        { month: '2024-12', totalSpent: 567.25, transactionCount: 18 }
      ]
    };
  }
};
