const API_BASE_URL = 'https://acrosporous-ligneous-raguel.ngrok-free.dev/api';

// Helper function to map categories to icons
const getCategoryIcon = (category: string): string => {
  const categoryMap: { [key: string]: string } = {
    'Food & Groceries': '🍎',
    'food': '🍎',
    'groceries': '🍎',
    'Transportation': '🚗',
    'transport': '🚗',
    'gas': '⛽',
    'Housing & Utilities': '🏠',
    'housing': '🏠',
    'utilities': '💡',
    'Entertainment': '🎬',
    'entertainment': '🎬',
    'Healthcare': '🏥',
    'health': '🏥',
    'Education': '📚',
    'education': '📚',
    'Shopping': '🛍️',
    'shopping': '🛍️',
    'Transfer': '🏦',
    'transfer': '🏦',
    'bank': '🏦',
    'Deposit': '💰',
    'deposit': '💰',
    'income': '💰',
    'Other': '💳',
    'default': '💳'
  };

  // Convert category to lowercase for matching
  const lowerCategory = category.toLowerCase();
  return categoryMap[lowerCategory] || categoryMap['default'];
};

// Helper function to generate time from date or use current time
const generateTime = (): string => {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export interface Transaction {
  id: number;
  accountId: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  // Derived fields for UI compatibility
  name?: string;
  time?: string;
  icon?: string;
}

export interface Account {
  id: string;
  name: string;
  balance: string;
  type: string;
  icon?: string;
  color?: string;
}

export interface DataResponse {
  accounts: Account[];
  transactions: Transaction[];
  dashboard: {
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
  };
}

export const fetchTransactionsData = async (): Promise<DataResponse> => {
  try {
    console.log('Fetching transactions data from API...');

    const response = await fetch(`${API_BASE_URL}/transactions`, {
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

    const rawData = await response.json();
    console.log('Raw transactions data received:', rawData);

    // Transform the data to match our interface
    const transformedTransactions: Transaction[] = rawData.map((transaction: any) => ({
      ...transaction,
      name: transaction.description, // Use description as name for UI
      time: generateTime(), // Generate a time since API doesn't provide it
      icon: getCategoryIcon(transaction.category) // Map category to icon
    }));

    // Return transformed data in expected format
    return {
      accounts: [], // If accounts come separately, this would be populated
      transactions: transformedTransactions,
      dashboard: {
        recent: transformedTransactions.slice(0, 5), // Use first 5 as recent
        breakdown: {
          'Food & Groceries': 0,
          'Transportation': 0,
          'Housing & Utilities': 0,
          'Entertainment': 0,
          'Healthcare': 0,
          'Education': 0,
          'Shopping': 0,
          'Other': 0
        },
        bestCardRecommendation: {
          card: {
            id: 'api',
            cardName: 'API Recommended Card',
            issuer: 'Bank',
            annualFee: 0,
            baseRewardRate: 0.01,
            categoryRewardRates: {},
            signupBonus: 'Contact bank for current offers',
            benefits: 'Standard benefits package',
            apr: '15.99% - 24.99%'
          },
          projectedAnnualRewards: 0,
          rewardsByCategory: {},
          recommendationReason: 'Based on your spending patterns'
        },
        monthlySpending: []
      }
    };
  } catch (error) {
    console.error('Error fetching transactions data:', error);
    console.log('Using fallback data due to API error');
    // Return fallback data if API fails
    return {
      accounts: [],
      transactions: [
        {
          id: 1,
          accountId: 'ACC-001',
          description: 'Transfer from bank',
          amount: 1000,
          date: 'October 19, 2025',
          category: 'Transfer',
          name: 'Transfer from bank',
          time: '09:09 AM',
          icon: '🏦'
        },
        {
          id: 2,
          accountId: 'ACC-001',
          description: 'Fishing equipment store',
          amount: -85.50,
          date: 'October 18, 2025',
          category: 'Shopping',
          name: 'Fishing equipment store',
          time: '02:15 PM',
          icon: '🛍️'
        },
        {
          id: 3,
          accountId: 'ACC-001',
          description: 'Focus Coffee Shop',
          amount: -12.75,
          date: 'October 17, 2025',
          category: 'Food & Groceries',
          name: 'Focus Coffee Shop',
          time: '08:30 AM',
          icon: '🍎'
        },
        {
          id: 4,
          accountId: 'ACC-001',
          description: 'Fuel station',
          amount: -45.20,
          date: 'October 16, 2025',
          category: 'Transportation',
          name: 'Fuel station',
          time: '06:45 PM',
          icon: '🚗'
        },
        {
          id: 5,
          accountId: 'ACC-001',
          description: 'Fresh Market',
          amount: -32.40,
          date: 'October 15, 2025',
          category: 'Food & Groceries',
          name: 'Fresh Market',
          time: '11:20 AM',
          icon: '🍎'
        },
        {
          id: 6,
          accountId: 'ACC-001',
          description: 'Netflix subscription',
          amount: -15.99,
          date: 'October 14, 2025',
          category: 'Entertainment',
          name: 'Netflix subscription',
          time: '12:01 AM',
          icon: '🎬'
        }
      ],
      dashboard: {
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
            benefits: 'Travel insurance, purchase protection',
            apr: '21.49% - 28.49%'
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
      }
    };
  }
};
