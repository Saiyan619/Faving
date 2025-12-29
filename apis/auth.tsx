import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../lib/axios";
import { toast } from "sonner";

interface SignUpUserData {
    name: string,
    email: string,
    password: string
}
interface SignInUserData {
    email: string,
    password: string
}
interface getUserData {
  _id: string;
  email: string;
  name: string;
}

export const useRegisterUser = () => {
    const registerUser = async (userData: SignUpUserData) => {
        try {
            const response = await api.post("/auth/register", userData)
            console.log(response.data)
            const data = response.data;
            return data
        } catch (error) {
            throw error;
        }
    }
    const { mutateAsync: register, isPending } = useMutation({
        mutationFn: registerUser,
        onSuccess: () => {
            toast.success("Registration Successful", {
                description: `You have succesfully signed up on Faving:`,
            });
        },
        onError: (error: Error) => {
            toast.error(`Failed to register: ${error.message}`);
        },
    })
    return { register, isPending }
}

export const useLoginUser = () => {

    const loginUser = async (userData: SignInUserData) => {
        try {
            const response = await api.post("/auth/login", userData)
            console.log(response.data)
            const data = response.data;
            return data
        } catch (error) {
            throw error;
        }
    }
    const { mutateAsync: login, isPending } = useMutation({
        mutationFn: loginUser,
        onSuccess: () => {
            toast.success("Login Successful", {
                description: `You have succesfully logged in on Faving:`,
            });
        },
        onError: (error: Error) => {
            toast.error(`Failed to login: ${error.message}`);
        },
    })
    return { login, isPending }
}

export const useLogoutUser = () => {
    const logoutUser = async () => {
        try {
            const response = await api.post("/auth/logout")
            console.log(response.data)
            const data = response.data;
            return data
        } catch (error) {
            throw error;
        }
    }
    const { mutateAsync: logout, isPending } = useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            toast.success("Logout Successful", {
                description: `You have succesfully logged out on Faving:`,
            });
        },
        onError: (error: Error) => {
            toast.error(`Failed to logout: ${error.message}`);
        },
    })
    return { logout, isPending }
}

export const useUser = () => {
    const { data: user, isPending, isError } = useQuery<getUserData>({
        queryKey: ['user'],
        queryFn: async () => {
            const response = await api.get("/auth/me");
            return response.data;
        },
        retry: false,
    });
    return { user, isPending, isError };
};
