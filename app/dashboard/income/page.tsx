import React from 'react'
import { IncomeOverviewHeader } from './components/IncomeOverviewHeader'
import { IncomeTransactions } from './components/IncomeTransactions'
import { IncomeAnalytics } from './components/IncomeAnalytics'

const IncomePage = () => {
  return (
    <div className="p-4 md:p-8 w-full max-w-7xl mx-auto space-y-8">
      <IncomeOverviewHeader />
      <IncomeAnalytics />
      <IncomeTransactions />
    </div>
  )
}

export default IncomePage
