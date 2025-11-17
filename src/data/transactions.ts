
export interface Transaction {
  id: string
  type: 'transfer' | 'payment' | 'deposit'
  name: string
  amount: number
  date: string
  time: string
  icon: string
}

export const transactions: Transaction[] = [
  {
    id: 'NF - 0000001',
    type: 'transfer',
    name: 'Transfer from bank',
    amount: 1000,
    date: 'October 19, 2025',
    time: '09:09 AM',
    icon: '🏦'
  },
  {
    id: 'NF - 0000002',
    type: 'payment',
    name: 'Internet',
    amount: -200.4,
    date: 'October 17, 2025',
    time: '10:58 AM',
    icon: '📡'
  },
  {
    id: 'NF - 0000003',
    type: 'payment',
    name: 'Wholefoods',
    amount: -345.8,
    date: 'October 16, 2025',
    time: '07:21 PM',
    icon: '🛒'
  },
  {
    id: 'NF - 0000004',
    type: 'payment',
    name: 'Starbucks',
    amount: -7.49,
    date: 'October 16, 2025',
    time: '02:35 PM',
    icon: '☕'
  },
  {
    id: 'NF - 0000005',
    type: 'payment',
    name: 'Gas',
    amount: -183.5,
    date: 'October 12, 2025',
    time: '08:29 AM',
    icon: '⛽'
  },
  {
    id: 'NF - 0000006',
    type: 'deposit',
    name: 'Salary',
    amount: 20000,
    date: 'October 10, 2025',
    time: '11:11 AM',
    icon: '💰'
  },
  {
    id: 'NF - 0000007',
    type: 'payment',
    name: 'Trader Joe',
    amount: -45.89,
    date: 'October 9, 2025',
    time: '04:34 PM',
    icon: '🛒'
  },
  {
    id: 'NF - 0000008',
    type: 'payment',
    name: 'Jewel Osco',
    amount: -200,
    date: 'October 9, 2025',
    time: '12:09 PM',
    icon: '🛒'
  },
  {
    id: 'NF - 0000009',
    type: 'deposit',
    name: 'Deposit',
    amount: 570,
    date: 'October 8, 2025',
    time: '03:11 PM',
    icon: '💳'
  },
  {
    id: 'NF - 00000010',
    type: 'payment',
    name: 'Bobashop',
    amount: -20,
    date: 'October 5, 2025',
    time: '03:47 PM',
    icon: '🧋'
  },
  {
    id: 'NF - 00000011',
    type: 'transfer',
    name: 'Transfer from bank',
    amount: 500,
    date: 'October 3, 2025',
    time: '12:09 PM',
    icon: '🏦'
  },
  {
    id: 'NF - 00000012',
    type: 'payment',
    name: 'Spotify Purchase',
    amount: -10.59,
    date: 'October 2, 2025',
    time: '03:58 PM',
    icon: '🎵'
  },
  {
    id: 'NF - 00000013',
    type: 'deposit',
    name: 'Deposit',
    amount: 900,
    date: 'October 1, 2025',
    time: '08:59 AM',
    icon: '💳'
  }
]

// Helper function to get transactions by month
export const getTransactionsByMonth = (month: number) => {
  return transactions.filter(transaction => {
    const transactionDate = new Date(transaction.date)
    return transactionDate.getMonth() === month
  })
}

// Helper function to get recent transactions (for chart display)
export const getRecentTransactionIcons = (limit: number = 6) => {
  return transactions
    .filter(t => t.type === 'payment' && t.amount < 0) // Only show purchases
    .slice(0, limit)
    .map(t => ({ icon: t.icon, name: t.name, date: t.date }))
}
