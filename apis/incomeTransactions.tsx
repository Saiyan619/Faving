import { api } from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Account } from "./accounts";

interface AddIncomeProps {
    accountId: string;
    amount: number;
    category: string;
    note: string;
    date: string;
}

export const useAddIncome = ()=>{

    const addInc = async (props:AddIncomeProps) => {
        try {
            const reponse = await api.post("/transactions/income", props)
            console.log(reponse.data);
            const data = reponse.data;
            return data;
        } catch (error) {
            console.log(error)
            throw error;
        }
    }
    const {mutateAsync:addincome, isPending} = useMutation({
        mutationFn:addInc,
        onSuccess: () => {
            toast.success("Income Added Successfully", {
                description: `You have succesfully added an income on Faving:`,
            });
        },
        onError: (error: Error) => {
            toast.error(`Failed to Add income: ${error.message}`);
        },
    })
    return {addincome, isPending}
}
