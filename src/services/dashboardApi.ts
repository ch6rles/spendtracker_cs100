const API_BASE_URL = 'https://acrosporous-ligneous-raguel.ngrok-free.dev/api';

// API endpoints
const TRANSACTIONS_API = 'https://acrosporous-ligneous-raguel.ngrok-free.dev/api/transactions';
const INCOME_ANALYSIS = 'https://acrosporous-ligneous-raguel.ngrok-free.dev/api/income/analysis';
const PIE_CHART_API = 'https://acrosporous-ligneous-raguel.ngrok-free.dev/api/expenses/pie';
const ACCOUNTS_API = 'https://acrosporous-ligneous-raguel.ngrok-free.dev/api/accounts';

interface RecentTransaction {
  id: string;
  accountId: string | null;
  date: string;
  description: string;
  amount: number;
  category: string;
}

export interface Transaction {
  id: string;
  accountId: string | null;
  date: string;
  description: string;
  amount: number;
  category: string;
}

export interface AccountData {
  subscriptionPlan: string;
  accountName: string;
  balance: number;
  accountNumber: string;
}

// Function to find the most recent and previous months from transaction data
const findMostRecentMonths = (transactions: Transaction[]): { currentMonth: Date, previousMonth: Date } => {
  // Extract all unique year-month combinations from transactions
  const monthYearSet = new Set<string>();
  
  transactions.forEach(transaction => {
    const date = new Date(transaction.date);
    const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    monthYearSet.add(yearMonth);
  });
  
  // Sort the year-month strings in descending order to get most recent first
  const sortedMonths = Array.from(monthYearSet).sort().reverse();
  
  if (sortedMonths.length === 0) {
    // Fallback to current date if no transactions found
    const now = new Date();
    const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const previousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    return { currentMonth, previousMonth };
  }
  
  // Get the most recent month
  const [recentYear, recentMonth] = sortedMonths[0].split('-').map(Number);
  const currentMonth = new Date(recentYear, recentMonth - 1, 1);
  
  // Get the previous month
  let previousMonth: Date;
  if (sortedMonths.length > 1) {
    const [prevYear, prevMonth] = sortedMonths[1].split('-').map(Number);
    previousMonth = new Date(prevYear, prevMonth - 1, 1);
  } else {
    // If only one month of data, calculate previous month
    previousMonth = new Date(recentYear, recentMonth - 2, 1);
  }
  
  console.log('Most recent month found:', currentMonth.toDateString());
  console.log('Previous month found:', previousMonth.toDateString());
  
  return { currentMonth, previousMonth };
};

export interface MonthlySpendingSummary {
  currentMonth: {
    month: string;
    year: number;
    totalSpent: number;
    totalIncome: number;
    netAmount: number;
  };
  previousMonth: {
    month: string;
    year: number;
    totalSpent: number;
    totalIncome: number;
    netAmount: number;
  };
  comparison: {
    spendingChange: number;
    spendingChangePercent: number;
    incomeChange: number;
    incomeChangePercent: number;
  };
}

export interface PieChartData {
  labels: string[];
  data: number[];
}

export interface DashboardData {
  recent: RecentTransaction[];
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

export const fetchMonthlySpendingSummary = async (): Promise<MonthlySpendingSummary> => {
  try {
    console.log('Fetching transactions for monthly spending summary...');
    
    const response = await fetch(TRANSACTIONS_API, {
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

    const transactions: Transaction[] = await response.json();
    console.log('Transactions received:', transactions.length);
    
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    // Dynamically find the most recent and previous months from transaction data
    const { currentMonth, previousMonth } = findMostRecentMonths(transactions);
    
    const currentYear = currentMonth.getFullYear();
    const currentMonthIndex = currentMonth.getMonth();
    const previousYear = previousMonth.getFullYear();
    const previousMonthIndex = previousMonth.getMonth();
    
    console.log('Current month:', monthNames[currentMonthIndex], currentYear);
    console.log('Previous month:', monthNames[previousMonthIndex], previousYear);
    
    // Filter transactions for current and previous month
    const currentMonthTransactions = transactions.filter(t => {
      const transactionDate = new Date(t.date);
      return transactionDate.getFullYear() === currentYear && 
             transactionDate.getMonth() === currentMonthIndex;
    });
    
    const previousMonthTransactions = transactions.filter(t => {
      const transactionDate = new Date(t.date);
      return transactionDate.getFullYear() === previousYear && 
             transactionDate.getMonth() === previousMonthIndex;
    });
    
    console.log(`Found ${currentMonthTransactions.length} transactions for ${monthNames[currentMonthIndex]} ${currentYear}`);
    console.log(`Found ${previousMonthTransactions.length} transactions for ${monthNames[previousMonthIndex]} ${previousYear}`);
    
    // Calculate totals for current month - include ALL negative amounts (expenses)
    const currentMonthExpenses = currentMonthTransactions.filter(t => t.amount < 0);
    const currentMonthSpent = currentMonthExpenses.reduce((sum, t) => sum + Math.abs(t.amount), 0);
    const currentMonthIncome = currentMonthTransactions
      .filter(t => t.amount > 0 && (t.category === 'income' || t.description.toLowerCase().includes('salary') || t.description.toLowerCase().includes('paycheck')))
      .reduce((sum, t) => sum + t.amount, 0);
    
    // Calculate totals for previous month (using same logic)
    const previousMonthExpenses = previousMonthTransactions.filter(t => t.amount < 0);
    const previousMonthSpent = previousMonthExpenses.reduce((sum, t) => sum + Math.abs(t.amount), 0);
    const previousMonthIncome = previousMonthTransactions
      .filter(t => t.amount > 0 && (t.category === 'income' || t.description.toLowerCase().includes('salary') || t.description.toLowerCase().includes('paycheck')))
      .reduce((sum, t) => sum + t.amount, 0);
    
    console.log(`${monthNames[currentMonthIndex]} ${currentYear} - Spent: $${currentMonthSpent.toFixed(2)}, Income: $${currentMonthIncome.toFixed(2)}`);
    console.log(`${monthNames[previousMonthIndex]} ${previousYear} - Spent: $${previousMonthSpent.toFixed(2)}, Income: $${previousMonthIncome.toFixed(2)}`);
    
    // Calculate changes
    const spendingChange = currentMonthSpent - previousMonthSpent;
    const spendingChangePercent = previousMonthSpent > 0 ? ((spendingChange / previousMonthSpent) * 100) : 0;
    const incomeChange = currentMonthIncome - previousMonthIncome;
    const incomeChangePercent = previousMonthIncome > 0 ? ((incomeChange / previousMonthIncome) * 100) : 0;
    
    const summary: MonthlySpendingSummary = {
      currentMonth: {
        month: monthNames[currentMonthIndex],
        year: currentYear,
        totalSpent: currentMonthSpent,
        totalIncome: currentMonthIncome,
        netAmount: currentMonthIncome - currentMonthSpent
      },
      previousMonth: {
        month: monthNames[previousMonthIndex],
        year: previousYear,
        totalSpent: previousMonthSpent,
        totalIncome: previousMonthIncome,
        netAmount: previousMonthIncome - previousMonthSpent
      },
      comparison: {
        spendingChange,
        spendingChangePercent,
        incomeChange,
        incomeChangePercent
      }
    };
    
    console.log('Monthly spending summary:', summary);
    return summary;
  } catch (error) {
    console.error('Error fetching monthly spending summary:', error);
    console.log('Using fallback monthly spending data due to API error');
    
    // Return fallback data if API fails
    return {
      currentMonth: {
        month: 'November',
        year: 2024,
        totalSpent: 307.55,
        totalIncome: 8000.00,
        netAmount: 7692.45
      },
      previousMonth: {
        month: 'October',
        year: 2024,
        totalSpent: 284.30,
        totalIncome: 8000.00,
        netAmount: 7715.70
      },
      comparison: {
        spendingChange: 23.25,
        spendingChangePercent: 8.18,
        incomeChange: 0,
        incomeChangePercent: 0
      }
    };
  }
};

export const fetchPieChartData = async (): Promise<PieChartData> => {
  try {
    console.log('Fetching pie chart data from API...');
    
    const response = await fetch(PIE_CHART_API, {
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
    console.log('Pie chart raw data received:', rawData);
    
    // Transform the API response format to our expected format
    // API returns: { category: negativeAmount, ... }
    // We need: { labels: [category...], data: [positiveAmount...] }
    const labels: string[] = [];
    const data: number[] = [];
    
    // Convert categories to proper display names and make amounts positive
    const categoryMapping: { [key: string]: string } = {
      'entertainment': 'Entertainment',
      'housing': 'Housing & Utilities',
      'dining': 'Food & Dining',
      'gas': 'Transportation',
      'travel': 'Travel',
      'utilities': 'Utilities',
      'groceries': 'Food & Groceries',
      'healthcare': 'Healthcare',
      'shopping': 'Shopping'
    };
    
    Object.entries(rawData).forEach(([category, amount]) => {
      const displayName = categoryMapping[category.toLowerCase()] || category.charAt(0).toUpperCase() + category.slice(1);
      const positiveAmount = Math.abs(Number(amount));
      
      if (positiveAmount > 0) {
        labels.push(displayName);
        data.push(positiveAmount);
      }
    });
    
    const transformedData = { labels, data };
    console.log('Transformed pie chart data:', transformedData);
    return transformedData;
  } catch (error) {
    console.error('Error fetching pie chart data:', error);
    console.log('Using fallback pie chart data due to API error');
    // Return fallback data if API fails
    return {
      labels: ['Food & Groceries', 'Transportation', 'Shopping', 'Entertainment', 'Other'],
      data: [45.50, 23.75, 67.80, 35.20, 15.30]
    };
  }
};

export const fetchAccountsData = async (): Promise<AccountData[]> => {
  try {
    console.log('Fetching accounts data from API...');
    
    const response = await fetch(ACCOUNTS_API, {
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

    const accounts: AccountData[] = await response.json();
    console.log('Accounts data received:', accounts);
    return accounts;
  } catch (error) {
    console.error('Error fetching accounts data:', error);
    console.log('Using fallback accounts data due to API error');
    // Return fallback data if API fails
    return [
      {
        subscriptionPlan: 'Basic',
        accountName: 'Chase Checking',
        balance: 5000,
        accountNumber: 'acc-001'
      },
      {
        subscriptionPlan: 'Basic',
        accountName: 'Wells Fargo Savings',
        balance: 10000,
        accountNumber: 'acc-002'
      }
    ];
  }
};
