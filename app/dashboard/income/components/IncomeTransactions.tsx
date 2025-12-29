"use client"

import { useState } from "react"
import { Search, Filter, MoreHorizontal, Briefcase, DollarSign, Gift, TrendingUp, Building2, Coins, Laptop, Award, CreditCard } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useGetTransactions } from "@/apis/transactions"
import { Skeleton } from "@/components/ui/skeleton"

const categoryConfig: Record<string, { icon: typeof Briefcase; color: string; bg: string }> = {
    "Salary": { icon: Briefcase, color: "text-emerald-600", bg: "bg-emerald-100" },
    "Freelance": { icon: Laptop, color: "text-blue-600", bg: "bg-blue-100" },
    "Investments": { icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-100" },
    "Gifts": { icon: Gift, color: "text-pink-600", bg: "bg-pink-100" },
    "Rental": { icon: Building2, color: "text-amber-600", bg: "bg-amber-100" },
    "Business": { icon: Coins, color: "text-cyan-600", bg: "bg-cyan-100" },
    "Other": { icon: CreditCard, color: "text-gray-600", bg: "bg-gray-100" },
}

export function IncomeTransactions() {
    const { data, isLoading } = useGetTransactions();
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

    const incomeTransactions = data?.transactions.filter((transaction) => transaction.type === "income") || [];

    const filteredIncomes = incomeTransactions.filter((income) => {
        const matchesSearch = (income.note || income.category).toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = selectedCategory ? income.category === selectedCategory : true
        return matchesSearch && matchesCategory
    })

    const categories = [...new Set(incomeTransactions.map((i) => i.category))];

    const formatCurrency = (amountInCents: number) => {
        const amount = amountInCents / 100;
        return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
    }

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    }

    if (isLoading) {
        return (
            <Card className="shadow-sm border-none bg-white">
                <CardHeader><Skeleton className="h-6 w-48" /></CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="flex items-center justify-between p-3">
                                <Skeleton className="h-10 w-full" />
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="shadow-sm border-none bg-white">
            <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <CardTitle>Income Transactions</CardTitle>
                        <CardDescription>Track all your income sources</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search income..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9 w-[200px]"
                            />
                        </div>
                        <Button variant="outline" size="icon">
                            <Filter className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Category Pills */}
                <div className="flex flex-wrap gap-2 mt-4">
                    <Button
                        variant={selectedCategory === null ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(null)}
                        className={`rounded-full ${selectedCategory === null ? "bg-emerald-600 hover:bg-emerald-500" : ""}`}
                    >
                        All
                    </Button>
                    {categories.map((category) => (
                        <Button
                            key={category}
                            variant={selectedCategory === category ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedCategory(category)}
                            className={`rounded-full ${selectedCategory === category ? "bg-emerald-600 hover:bg-emerald-500" : ""}`}
                        >
                            {category}
                        </Button>
                    ))}
                </div>
            </CardHeader>

            <CardContent>
                <div className="space-y-4">
                    {filteredIncomes.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                            <div className="flex justify-center mb-4">
                                <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                                    <DollarSign className="h-6 w-6 text-gray-400" />
                                </div>
                            </div>
                            <p className="font-medium">No income found</p>
                            <p className="text-sm">Start by adding your first income entry.</p>
                        </div>
                    ) : (
                        filteredIncomes.map((income) => {
                            const config = categoryConfig[income.category] || categoryConfig["Other"]
                            const Icon = config.icon

                            return (
                                <div
                                    key={income._id}
                                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group cursor-pointer"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${config.bg} ${config.color} transition-transform group-hover:scale-110`}>
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{income.note || income.category}</p>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <span>{formatDate(income.date)}</span>
                                                <span>•</span>
                                                <span className={`px-2 py-0.5 rounded-full ${config.bg} ${config.color} font-medium`}>
                                                    {income.category}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-semibold text-emerald-600">
                                            + {formatCurrency(income.amount)}
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
            </CardContent>
        </Card>
    )
}
