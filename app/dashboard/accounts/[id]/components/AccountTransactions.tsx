"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDownLeft, ArrowUpRight, ArrowRightLeft, Filter, ChevronRight } from "lucide-react";

interface AccountTransactionsProps {
    accountId: string;
}

// Placeholder transactions - ready for API integration
const mockTransactions = [
    {
        _id: "1",
        type: "income",
        category: "Salary",
        amount: 250000,
        note: "Monthly salary payment",
        date: "2024-12-28",
    },
    {
        _id: "2",
        type: "expense",
        category: "Food",
        amount: 5000,
        note: "Grocery shopping",
        date: "2024-12-27",
    },
    {
        _id: "3",
        type: "expense",
        category: "Transportation",
        amount: 2500,
        note: "Uber ride",
        date: "2024-12-26",
    },
    {
        _id: "4",
        type: "transfer_out",
        category: "Transfer",
        amount: 10000,
        note: "Transfer to savings",
        date: "2024-12-25",
    },
    {
        _id: "5",
        type: "income",
        category: "Freelance",
        amount: 75000,
        note: "Project payment",
        date: "2024-12-24",
    },
];

// Helper to format currency
const formatCurrency = (amountInCents: number, currency: string = "USD") => {
    const amount = amountInCents / 100;
    return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);
};

// Format date
const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
    }).format(new Date(dateString));
};

// Get transaction style based on type
const getTransactionStyle = (type: string) => {
    switch (type) {
        case "income":
            return { icon: ArrowDownLeft, color: "text-emerald-600", bg: "bg-emerald-100", sign: "+" };
        case "expense":
            return { icon: ArrowUpRight, color: "text-rose-600", bg: "bg-rose-100", sign: "-" };
        case "transfer_in":
            return { icon: ArrowRightLeft, color: "text-blue-600", bg: "bg-blue-100", sign: "+" };
        case "transfer_out":
            return { icon: ArrowRightLeft, color: "text-purple-600", bg: "bg-purple-100", sign: "-" };
        default:
            return { icon: ArrowRightLeft, color: "text-gray-600", bg: "bg-gray-100", sign: "" };
    }
};

export function AccountTransactions({ accountId }: AccountTransactionsProps) {
    // TODO: Replace with actual API call
    // const { transactions, isPending } = useGetTransactions({ accountId });

    const transactions = mockTransactions;

    return (
        <Card className="bg-white border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-semibold text-gray-900">
                    Recent Transactions
                </CardTitle>
                <Button variant="outline" size="sm" className="text-gray-600 border-gray-300 hover:bg-gray-50">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                </Button>
            </CardHeader>
            <CardContent className="p-0">
                <div className="divide-y divide-gray-100">
                    {transactions.map((transaction) => {
                        const style = getTransactionStyle(transaction.type);
                        const Icon = style.icon;

                        return (
                            <div
                                key={transaction._id}
                                className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors cursor-pointer group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-2.5 rounded-xl ${style.bg}`}>
                                        <Icon className={`w-5 h-5 ${style.color}`} />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{transaction.category}</p>
                                        <p className="text-sm text-gray-500 truncate max-w-[200px]">
                                            {transaction.note || "No description"}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <p className={`font-semibold ${style.color}`}>
                                            {style.sign}{formatCurrency(transaction.amount)}
                                        </p>
                                        <p className="text-xs text-gray-400">{formatDate(transaction.date)}</p>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* View All Link */}
                <div className="p-4 border-t border-gray-100">
                    <Button
                        variant="ghost"
                        className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                        View All Transactions
                        <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
