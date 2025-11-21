import { useState, useEffect, useRef } from 'react'
import { Search, Bell, User, X } from 'lucide-react'
import { fetchTransactionsData, fetchAccountTransactions } from '../services/transactionsApi'
import { fetchAccountsData } from '../services/dashboardApi'
import type { Transaction } from '../services/transactionsApi'
<<<<<<< HEAD
import { getCategoryColor } from '../components/categoryColor'
=======
import type { AccountData } from '../services/dashboardApi'
>>>>>>> main
import './Transactions.css'

export function Transactions() {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('Latest')
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [accountsData, setAccountsData] = useState<AccountData[]>([])
  const [selectedAccount, setSelectedAccount] = useState<string>('all')
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        // Load both transactions and accounts data
        const [transactionsData, accounts] = await Promise.all([
          fetchTransactionsData(),
          fetchAccountsData()
        ])
        
        setTransactions(transactionsData.transactions)
        setAccountsData(accounts)
      } catch (error) {
        console.error('Failed to load data:', error)
      } finally {
        setLoading(false)
      }
    }
<<<<<<< HEAD

    loadTransactions()
=======
    
    loadData()
>>>>>>> main
  }, [])

  const handleAccountChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newAccount = event.target.value
    setSelectedAccount(newAccount)
    
    // Reload transactions for the selected account
    setLoading(true)
    try {
      let transactionsData
      if (newAccount === 'all') {
        // Load all transactions
        const data = await fetchTransactionsData()
        transactionsData = data.transactions
      } else {
        // Load transactions for specific account
        transactionsData = await fetchAccountTransactions(newAccount)
      }
      setTransactions(transactionsData)
    } catch (error) {
      console.error('Failed to load transactions for account:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredTransactions = transactions.filter(transaction => {
    // Filter by search term only (account filtering is handled by loading specific data)
    if (!searchTerm.trim()) return true; // Show all transactions if search is empty

    const searchLower = searchTerm.toLowerCase().trim();
    const transactionName = (transaction.name || transaction.description).toLowerCase();
    const transactionId = transaction.id.toString().toLowerCase();
    const transactionCategory = transaction.category.toLowerCase();
    const transactionDescription = transaction.description.toLowerCase();

    return (
      transactionName.includes(searchLower) ||
      transactionId.includes(searchLower) ||
      transactionCategory.includes(searchLower) ||
      transactionDescription.includes(searchLower)
    );
  })

  // Apply sorting to filtered transactions
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    switch (sortBy) {
      case 'Latest':
        // Sort by date (newest first), then by time if available
        const dateTimeA = a.time ? new Date(`${a.date} ${a.time}`) : new Date(a.date)
        const dateTimeB = b.time ? new Date(`${b.date} ${b.time}`) : new Date(b.date)
        return dateTimeB.getTime() - dateTimeA.getTime()

      case 'Oldest':
        // Sort by date (oldest first), then by time if available
        const dateTimeA_old = a.time ? new Date(`${a.date} ${a.time}`) : new Date(a.date)
        const dateTimeB_old = b.time ? new Date(`${b.date} ${b.time}`) : new Date(b.date)
        return dateTimeA_old.getTime() - dateTimeB_old.getTime()

      case 'Amount High':
        // Sort by amount (highest first)
        return b.amount - a.amount

      case 'Amount Low':
        // Sort by amount (lowest first)
        return a.amount - b.amount

      default:
        return 0
    }
  })

  const formatAmount = (amount: number) => {
    const sign = amount >= 0 ? '+' : ''
    const color = amount >= 0 ? 'var(--primary-green)' : 'var(--danger-red)'
    return {
      text: `${sign}$${Math.abs(amount).toFixed(amount >= 0 ? 0 : (amount % 1 === 0 ? 0 : 2))}`,
      color
    }
  }

  if (loading) {
    return (
      <div className="transactions">
        <div className="loading-container">
          <div className="loading-spinner">💰</div>
          <h3>Loading your transactions...</h3>
          <p>Organizing your financial data</p>
        </div>
      </div>
    )
  }

  return (
    <div className="transactions">
      <header className="transactions-header">
        <div className="header-left">
          <h1>Transactions</h1>
        </div>
        <div className="header-right">
          <Bell size={20} />
          <div className="user-info">
            <User color="var(--warm-gray)" size={20} />
            <span style={{ color: "white" }}> Nhien, Pham</span>
          </div>
        </div>
      </header>

      <div className="transactions-content">
        <div className="transactions-controls">
          <div className="search-container">
            <div className="search-box">
              <button
                onClick={() => searchInputRef.current?.focus()}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0',
                  color: '#666',
                  display: 'flex',
                  alignItems: 'center'
                }}
                title="Focus search input"
              >
                <Search size={20} />
              </button>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search by name, ID, category, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    setSearchTerm('');
                    searchInputRef.current?.blur();
                  }
                }}
                style={{
                  border: 'none',
                  outline: 'none',
                  flex: 1,
                  fontSize: '14px',
                  padding: '4px 8px',
                  minWidth: '200px',
                  background: 'transparent',
                  color: '#333'
                }}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px',
                    color: '#999',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  title="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
          <div className="account-filter-container">
            <select
              value={selectedAccount}
              onChange={handleAccountChange}
              className="account-filter-select"
            >
              <option value="all">All Accounts</option>
              {accountsData.map((account) => (
                <option key={account.accountNumber} value={account.accountNumber}>
                  {account.accountName}
                </option>
              ))}
            </select>
          </div>
          <div className="sort-container">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="Latest">Latest</option>
              <option value="Oldest">Oldest</option>
              <option value="Amount High">Amount (High to Low)</option>
              <option value="Amount Low">Amount (Low to High)</option>
            </select>
          </div>
          <div className="account-filter-container">
            <select
              value={selectedAccount}
              onChange={handleAccountChange}
              className="account-filter-select"
            >
              <option value="all">All Accounts</option>
              {accountsData.map((account) => (
                <option key={account.accountNumber} value={account.accountNumber}>
                  {account.accountName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {searchTerm.trim() && (
          <div className="search-results-info" style={{
            padding: '10px 0',
            color: '#666',
            fontSize: '14px',
            borderBottom: '1px solid #eee',
            marginBottom: '10px'
          }}>
            Found {sortedTransactions.length} transaction{sortedTransactions.length !== 1 ? 's' : ''}
            {sortedTransactions.length > 0 ? ` matching "${searchTerm}"` : ` for "${searchTerm}"`}
          </div>
        )}

        <div className="transactions-table">
          <div className="table-header">
            <div className="column">Transaction ID</div>
            <div className="column">Payment name</div>
            <div className="column">Amount</div>
            <div className="column">Date</div>
          </div>

          <div className="table-body">
            {sortedTransactions.map((transaction: Transaction) => {
              const amount = formatAmount(transaction.amount)
              const categoryColor = getCategoryColor(transaction.category)
              return (
                <div key={transaction.id} className="table-row">
                  <div className="column transaction-id">
                    <div className="transaction-id-wrapper">
                      <div
                        className="category-indicator"
                        style={{ backgroundColor: categoryColor }}
                        title={transaction.category}
                      />
                      <span className="id-text">{transaction.id}</span>
                    </div>
                  </div>
                  <div className="column payment-name">
                    <div className="payment-info">
                      <span className="payment-icon">{transaction.icon || '💳'}</span>
                      <div className="payment-details">
                        <span className="payment-text">{transaction.name || transaction.description}</span>
                        <span className="category-tag" style={{ backgroundColor: `${categoryColor}20`, color: categoryColor }}>
                          {transaction.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="column amount">
                    <div className="amount-wrapper" style={{ color: amount.color }}>
                      <span className="currency">$</span>
                      <span className="value">{Math.abs(transaction.amount).toFixed(2)}</span>
                      <span className="sign">{amount.text.startsWith('+') ? '↑' : '↓'}</span>
                    </div>
                  </div>
                  <div className="column date">
                    <div className="date-info">
                      <div className="date-text">{transaction.date}</div>
                      <div className="time-text">{transaction.time || 'N/A'}</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}