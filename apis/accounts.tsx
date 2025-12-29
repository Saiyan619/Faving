import { api } from "@/lib/axios"
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

interface createAccData {
    name: string;
    type: string;
    currency: string;
    balance: number;
}

export interface Account {
    _id: string;
    userId: string;
    name: string;
    type: string;
    currency: string;
    balance: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
// NOTE: API returns Account[] directly, not wrapped in { data: Account[] }

interface UpdateAccountRequest {
    name?: string;
    type?: string;
    currency?: string;
    balance?: number;
}

export const useCreateAccount = () => {

    const createAccounts = async (createAccData: createAccData) => {
        try {
            const response = await api.post("/accounts", createAccData)
            const data = response.data
            return data;
        } catch (error) {
            throw error
        }
    }

    const { mutateAsync: CreateAcc, isPending } = useMutation({
        mutationFn: createAccounts,
        onSuccess: () => {
            toast.success("Account Created Successfully", {
                description: `You have succesfully created an account on Faving:`,
            });
        },
        onError: (error: Error) => {
            toast.error(`Failed to create account: ${error.message}`);
        },
    })
    return { CreateAcc, isPending }
}


export const useGetAllAccounts = () => {

    const getAllAccounts = async () => {
        try {
            const response = await api.get("/accounts");
            const data = response.data;
            return data;
        } catch (error) {
            throw error
        }
    }

    const { data: accounts, isPending, isError } = useQuery<Account[]>({
        queryKey: ["accounts"],
        queryFn: getAllAccounts
    })
    return { accounts, isPending, isError }
}

export const useGetAccById = (id: string | undefined) => {

    const getAccById = async () => {
        if (!id) {
            throw new Error('Account ID is required');
        }
        try {
            const response = await api.get(`/accounts/${id}`)
            const data = response.data
            return data;
        } catch (error) {
            throw error
        }
    }
    const { data, isPending } = useQuery<Account>({
        queryKey: ["accounts", id],
        queryFn: getAccById,
        enabled: !!id
    })
    return { data, isPending }
}

export const useUpdateAccount = (id: string) => {

    const updateAccount = async (updateAccData: UpdateAccountRequest) => {
        try {
            const response = await api.put(`/accounts/${id}`, updateAccData)
            const data = response.data
            return data;
        } catch (error) {
            throw error
        }
    }
    const { mutateAsync: UpdateAcc, isPending } = useMutation({
        mutationFn: updateAccount,
        onSuccess: () => {
            toast.success("Account Updated Successfully", {
                description: `You have succesfully updated an account on Faving:`,
            });
        },
        onError: (error: Error) => {
            toast.error(`Failed to update account: ${error.message}`);
        },
    })
    return { UpdateAcc, isPending }
}

export const useDeleteAccount = (id: string) => {

    const deleteAccount = async () => {
        try {
            const response = await api.delete(`/accounts/${id}`)
            const data = response.data
            return data;
        } catch (error) {
            throw error
        }
    }
    const { mutateAsync: DeleteAcc, isPending } = useMutation({
        mutationFn: deleteAccount,
        onSuccess: () => {
            toast.success("Account Deleted Successfully", {
                description: `You have succesfully deleted an account on Faving:`,
            });
        },
        onError: (error: Error) => {
            toast.error(`Failed to delete account: ${error.message}`);
        },
    })
    return { DeleteAcc, isPending }
}