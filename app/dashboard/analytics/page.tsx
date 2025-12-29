import React from 'react'
import { AnalyticsHeader } from './components/AnalyticsHeader'
import { FinancialOverview } from './components/FinancialOverview'
import { IncomeVsExpenseChart } from './components/IncomeVsExpenseChart'
import { CategoryBreakdown } from './components/CategoryBreakdown'
import { MonthlyTrends } from './components/MonthlyTrends'
import { TopTransactions } from './components/TopTransactions'

const AnalyticsPage = () => {
    return (
        <div className="p-4 md:p-8 w-full max-w-7xl mx-auto space-y-8">
            <AnalyticsHeader />
            <FinancialOverview />
            <IncomeVsExpenseChart />
            <CategoryBreakdown />
            <MonthlyTrends />
            <TopTransactions />
        </div>
    )
}

export default AnalyticsPage
