import { api } from "@/lib/axios"
import { Account } from "./accounts"
import { useQuery } from "@tanstack/react-query"

export interface Transaction {
    _id: string
    userId: string
    type: 'income' | 'expense' // adjust if you have more types
    accountId: Account
    amount: number
    category: string
    date: string // or Date if you're parsing it
    note: string
    status: 'active' | 'inactive' // adjust based on your statuses
    createdAt: string // or Date
    updatedAt: string // or Date
}

export interface TransactionsResponse {
    transactions: Transaction[]
    totalPages: number
    currentPage: number
}

export const useGetTransactions = () => {
    const getTransactions = async () => {
        try {
            const reponse = await api.get("/transactions")
            const data = reponse.data;
            return data;
        } catch (error) {
            throw error;
        }
    }
    const { data, isLoading } = useQuery<TransactionsResponse>({
        queryKey: ["transactions"],
        queryFn: getTransactions,
    })
    return { data, isLoading }
}
