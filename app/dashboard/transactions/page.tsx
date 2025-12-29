import React from 'react'
import { TransactionsHeader } from './components/TransactionsHeader'
import { TransactionsStats } from './components/TransactionsStats'
import { TransactionsList } from './components/TransactionsList'

const TransactionsPage = () => {
    return (
        <div className="p-4 md:p-8 w-full max-w-7xl mx-auto space-y-8">
            <TransactionsHeader />
            <TransactionsStats />
            <TransactionsList />
        </div>
    )
}

export default TransactionsPage
