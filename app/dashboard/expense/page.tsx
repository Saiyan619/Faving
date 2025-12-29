import React from 'react'
import { ExpenseOverviewHeader } from './components/ExpenseOverviewHeader'
import { ExpenseTransactions } from './components/ExpenseTransactions'
import { ExpenseAnalytics } from './components/ExpenseAnalytics'

const ExpensePage = () => {
  return (
    <div className="p-4 md:p-8 w-full max-w-7xl mx-auto space-y-8">
      <ExpenseOverviewHeader />
      <ExpenseAnalytics />
      <ExpenseTransactions />
    </div>
  )
}

export default ExpensePage
