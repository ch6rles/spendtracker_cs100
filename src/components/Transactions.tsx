import React, { useState } from 'react'
import { Search, Bell, User } from 'lucide-react'
import { transactions } from '../data/transactions'
import './Transactions.css'

export function Transactions() {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('Latest')

  const filteredTransactions = transactions.filter(transaction =>
    transaction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatAmount = (amount: number) => {
    const sign = amount >= 0 ? '+' : ''
    const color = amount >= 0 ? '#7ED321' : '#ff4757'
    return {
      text: `${sign}$${Math.abs(amount).toFixed(amount >= 0 ? 0 : (amount % 1 === 0 ? 0 : 2))}`,
      color
    }
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
            <User size={20} />
            <span>Nhien, Pham</span>
          </div>
        </div>
      </header>

      <div className="transactions-content">
        <div className="transactions-controls">
          <div className="search-container">
            <div className="search-box">
              <Search size={20} />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
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
        </div>

        <div className="transactions-table">
          <div className="table-header">
            <div className="column">Transaction ID</div>
            <div className="column">Payment name</div>
            <div className="column">Amount</div>
            <div className="column">Date</div>
          </div>

          <div className="table-body">
            {filteredTransactions.map((transaction) => {
              const amount = formatAmount(transaction.amount)
              return (
                <div key={transaction.id} className="table-row">
                  <div className="column transaction-id">
                    {transaction.id}
                  </div>
                  <div className="column payment-name">
                    <div className="payment-info">
                      <span className="payment-icon">{transaction.icon}</span>
                      <span className="payment-text">{transaction.name}</span>
                    </div>
                  </div>
                  <div className="column amount" style={{ color: amount.color }}>
                    {amount.text}
                  </div>
                  <div className="column date">
                    <div className="date-info">
                      <div className="date-text">{transaction.date}</div>
                      <div className="time-text">{transaction.time}</div>
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
