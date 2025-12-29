import { ArrowUpRight, ArrowDownRight, ArrowLeftRight, Activity, TrendingUp, Wallet } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

// TODO: Replace with API types and calls
const mockStats = {
    totalTransactions: 142,
    incomeCount: 28,
    expenseCount: 98,
    transferCount: 16,
    netFlow: 32731.69,
    isPositive: true,
    largestTransaction: { title: "Monthly Salary", amount: 4500, type: "income" as const },
    thisMonthTotal: 58420.50,
    lastMonthTotal: 52180.30,
}

export function TransactionsStats() {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(amount)
    }

    const monthlyChange = ((mockStats.thisMonthTotal - mockStats.lastMonthTotal) / mockStats.lastMonthTotal) * 100

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Transactions */}
            <Card className="shadow-sm border-none bg-white">
                <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-violet-100 flex items-center justify-center">
                            <Activity className="h-5 w-5 text-violet-600" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Total Transactions</p>
                            <p className="text-2xl font-bold">{mockStats.totalTransactions}</p>
                        </div>
                    </div>
                    <div className="mt-3 flex items-center gap-4 text-xs">
                        <span className="flex items-center gap-1 text-emerald-600">
                            <ArrowUpRight className="h-3 w-3" /> {mockStats.incomeCount} income
                        </span>
                        <span className="flex items-center gap-1 text-rose-600">
                            <ArrowDownRight className="h-3 w-3" /> {mockStats.expenseCount} expense
                        </span>
                        <span className="flex items-center gap-1 text-blue-600">
                            <ArrowLeftRight className="h-3 w-3" /> {mockStats.transferCount} transfer
                        </span>
                    </div>
                </CardContent>
            </Card>

            {/* Net Flow */}
            <Card className="shadow-sm border-none bg-white">
                <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${mockStats.isPositive ? "bg-emerald-100" : "bg-rose-100"}`}>
                            <TrendingUp className={`h-5 w-5 ${mockStats.isPositive ? "text-emerald-600" : "text-rose-600"}`} />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Net Flow</p>
                            <p className={`text-2xl font-bold ${mockStats.isPositive ? "text-emerald-600" : "text-rose-600"}`}>
                                {mockStats.isPositive ? "+" : "-"} {formatCurrency(Math.abs(mockStats.netFlow))}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* This Month Activity */}
            <Card className="shadow-sm border-none bg-white">
                <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                            <Wallet className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">This Month Volume</p>
                            <p className="text-2xl font-bold">{formatCurrency(mockStats.thisMonthTotal)}</p>
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                        <span className={monthlyChange >= 0 ? "text-emerald-600" : "text-rose-600"}>
                            {monthlyChange >= 0 ? "+" : ""}{monthlyChange.toFixed(1)}%
                        </span> vs last month
                    </p>
                </CardContent>
            </Card>

            {/* Largest Transaction */}
            <Card className="shadow-sm border-none bg-white">
                <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${mockStats.largestTransaction.type === "income" ? "bg-emerald-100" :
                                mockStats.largestTransaction.type === "expense" ? "bg-rose-100" : "bg-blue-100"
                            }`}>
                            {mockStats.largestTransaction.type === "income" ? (
                                <ArrowUpRight className="h-5 w-5 text-emerald-600" />
                            ) : mockStats.largestTransaction.type === "expense" ? (
                                <ArrowDownRight className="h-5 w-5 text-rose-600" />
                            ) : (
                                <ArrowLeftRight className="h-5 w-5 text-blue-600" />
                            )}
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Largest Transaction</p>
                            <p className="text-2xl font-bold">{formatCurrency(mockStats.largestTransaction.amount)}</p>
                            <p className="text-xs text-muted-foreground">{mockStats.largestTransaction.title}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
