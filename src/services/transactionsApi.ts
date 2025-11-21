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

// Helper function to assign account to transactions
const assignAccountToTransaction = (transaction: any, index: number): string => {
  const accounts = ['acc-001', 'acc-002', 'acc-003', 'acc-004', 'acc-005', 'acc-006', 'acc-007'];
  
  // Assign accounts based on transaction patterns for demonstration
  // In a real app, this would come from the API
  if (transaction.category?.toLowerCase().includes('food') || 
      transaction.category?.toLowerCase().includes('groceries') ||
      transaction.description?.toLowerCase().includes('starbucks') ||
      transaction.description?.toLowerCase().includes('wholefoods')) {
    return 'acc-002'; // Chase Sapphire Card for food/dining
  }
  
  if (transaction.category?.toLowerCase().includes('transport') ||
      transaction.category?.toLowerCase().includes('gas') ||
      transaction.description?.toLowerCase().includes('gas') ||
      transaction.description?.toLowerCase().includes('uber')) {
    return 'acc-003'; // Amex Gold Card for transportation
  }
  
  if (transaction.amount > 0) {
    // Positive amounts (deposits/income) go to checking accounts
    return index % 2 === 0 ? 'acc-001' : 'acc-006'; // Chase Checking or Wells Fargo Checking
  }
  
  if (transaction.amount > -100) {
    // Small purchases go to credit cards
    return index % 2 === 0 ? 'acc-005' : 'acc-007'; // Citi Double Cash or Discover Card
  }
  
  // Larger purchases go to checking accounts or savings
  return index % 3 === 0 ? 'acc-001' : (index % 3 === 1 ? 'acc-004' : 'acc-006');
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
    const transformedTransactions: Transaction[] = rawData.map((transaction: any, index: number) => ({
      ...transaction,
      accountId: assignAccountToTransaction(transaction, index), // Assign account based on transaction patterns
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

// Fetch transactions for a specific account
export const fetchAccountTransactions = async (accountNumber: string): Promise<Transaction[]> => {
  try {
    console.log(`Fetching transactions for account ${accountNumber}...`);
    
    const response = await fetch(`${API_BASE_URL}/accounts/${accountNumber}/transactions`, {
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
    console.log(`Account ${accountNumber} transactions received:`, data);

    // Transform transactions to match our interface
    const transformedTransactions = data.map((transaction: any) => ({
      id: transaction.id,
      accountId: transaction.accountId,
      date: transaction.date,
      description: transaction.description,
      amount: transaction.amount,
      category: transaction.category,
      icon: getCategoryIcon(transaction.category),
      name: transaction.description, // Use description as name for consistency
      time: generateTime() // Generate time since API doesn't provide it
    }));

    return transformedTransactions;
  } catch (error) {
    console.error(`Error fetching account ${accountNumber} transactions:`, error);
    // Return empty array if API fails
    return [];
  }
};
