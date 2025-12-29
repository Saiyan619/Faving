import { api } from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

interface AddExpenseProps {
    accountId: string;
    amount: number;
    category: string;
    note: string;
    date: string;
}

export const useAddExpense = () => {
    const addExp = async (props: AddExpenseProps) => {
        try {
            const response = await api.post("/transactions/expense", props);
            console.log(response.data);
            const data = response.data;
            return data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const { mutateAsync: addExpense, isPending } = useMutation({
        mutationFn: addExp,
        onSuccess: () => {
            toast.success("Expense Added Successfully", {
                description: "You have successfully added an expense on Faving.",
            });
        },
        onError: (error: Error) => {
            toast.error(`Failed to add expense: ${error.message}`);
        },
    });

    return { addExpense, isPending };
};