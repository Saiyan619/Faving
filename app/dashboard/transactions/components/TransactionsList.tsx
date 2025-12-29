"use client"
import { useState } from "react"
import { Search, Filter, MoreHorizontal, ArrowUpRight, ArrowDownRight, ArrowLeftRight, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Transaction, useGetTransactions } from "@/apis/transactions"

// TODO: Replace with API types
type TransactionType = "income" | "expense" | "transfer"

const typeConfig: Record<TransactionType, { icon: typeof ArrowUpRight; color: string; bg: string; label: string }> = {
    income: { icon: ArrowUpRight, color: "text-emerald-600", bg: "bg-emerald-100", label: "Income" },
    expense: { icon: ArrowDownRight, color: "text-rose-600", bg: "bg-rose-100", label: "Expense" },
    transfer: { icon: ArrowLeftRight, color: "text-blue-600", bg: "bg-blue-100", label: "Transfer" },
}

const filterTabs: { value: TransactionType | "all"; label: string }[] = [
    { value: "all", label: "All" },
    { value: "income", label: "Income" },
    { value: "expense", label: "Expenses" },
    { value: "transfer", label: "Transfers" },
]

export function TransactionsList() {
    const {data, isLoading} = useGetTransactions();
    const [searchQuery, setSearchQuery] = useState("")
    const [activeFilter, setActiveFilter] = useState<TransactionType | "all">("all")

    // TODO: Replace with API filtering
    const filteredTransactions = data?.transactions.filter((tx) => {
        const matchesSearch = tx.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tx.category.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesType = activeFilter === "all" || tx.type === activeFilter
        return matchesSearch && matchesType
    })

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(amount)
    }

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    }

    const getAmountDisplay = (tx: Transaction) => {
        if (tx.type === "income") return `+ ${formatCurrency(tx.amount)}`
        if (tx.type === "expense") return `- ${formatCurrency(tx.amount)}`
        return formatCurrency(tx.amount)
    }

    return (
        <Card className="shadow-sm border-none bg-white">
            <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <CardTitle>Transaction History</CardTitle>
                        <CardDescription>All your financial activity</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search transactions..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9 w-[200px]"
                            />
                        </div>
                        <Button variant="outline" size="icon">
                            <Calendar className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                            <Filter className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Type Filter Tabs */}
                <div className="flex gap-2 mt-4 border-b pb-4">
                    {filterTabs.map((tab) => (
                        <Button
                            key={tab.value}
                            variant={activeFilter === tab.value ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setActiveFilter(tab.value)}
                            className={activeFilter === tab.value ? "bg-violet-600 hover:bg-violet-500" : ""}
                        >
                            {tab.label}
                            {activeFilter === tab.value && (
                                <span className="ml-2 text-xs bg-white/20 px-1.5 py-0.5 rounded">
                                    {tab.value === "all"
                                        ? data?.transactions.length
                                        : data?.transactions.filter(t => t.type === tab.value).length}
                                </span>
                            )}
                        </Button>
                    ))}
                </div>
            </CardHeader>

            <CardContent>
                <div className="space-y-3">
                    {filteredTransactions?.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                            <p className="text-lg font-medium">No transactions found</p>
                            <p className="text-sm">Try adjusting your search or filters</p>
                        </div>
                    ) : (
                        filteredTransactions?.map((tx) => {
                            const config = typeConfig[tx.type]
                            const Icon = config.icon

                            return (
                                <div
                                    key={tx._id}
                                    className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group cursor-pointer"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`h-11 w-11 rounded-full flex items-center justify-center ${config.bg} ${config.color} transition-transform group-hover:scale-110`}>
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <p className="text-sm font-medium text-gray-900">{tx.category}</p>
                                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${config.bg} ${config.color}`}>
                                                    {config.label}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                                                <span>{formatDate(tx.date)}</span>
                                                <span>•</span>
                                                <span>{tx.category}</span>
                                                {/* {tx?.type === "transfer" && tx?.fromAccount && tx?.toAccount && (
                                                    <>
                                                        <span>•</span>
                                                        <span className="text-blue-600">{tx.fromAccount} → {tx.toAccount}</span>
                                                    </>
                                                )} */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className={`text-sm font-bold ${tx.type === "income" ? "text-emerald-600" :
                                                tx.type === "expense" ? "text-rose-600" : "text-blue-600"
                                            }`}>
                                            {getAmountDisplay(tx)}
                                        </span>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            )
                        })
                    )}
                </div>

                {/* Load More */}
                <div className="mt-6 text-center">
                    <Button variant="outline" className="w-full sm:w-auto">
                        Load More Transactions
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
