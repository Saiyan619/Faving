import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

// ==================== TYPES ====================

export interface OverviewStats {
    totalIncome: number;
    totalExpense: number;
    netBalance: number;
}

export interface CategoryStat {
    _id: string;
    category: string;
    total: number;
    count: number;
}

export interface MonthlyStat {
    _id: {
        year: number;
        month: number;
    };
    totalIncome: number;
    totalExpense: number;
}

export interface DailyStat {
    _id: {
        year: number;
        month: number;
        day: number;
    };
    totalIncome: number;
    totalExpense: number;
}

export interface YearlyStat {
    _id: {
        year: number;
    };
    totalIncome: number;
    totalExpense: number;
}

// ==================== HOOKS ====================

// Get Overview (Total Income, Total Expense, Net Balance)
export const useGetOverview = () => {
    const getOverview = async () => {
        try {
            const response = await api.get("/stats/overview");
            console.log("Overview:", response.data);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const { data, isLoading, isError } = useQuery<OverviewStats>({
        queryKey: ["stats", "overview"],
        queryFn: getOverview,
    });

    return { data, isLoading, isError };
};

// Get Expense Category Statistics
export const useGetExpenseCategories = () => {
    const getExpenseCategories = async () => {
        try {
            const response = await api.get("/stats/categories/expense");
            console.log("Expense Categories:", response.data);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const { data, isLoading, isError } = useQuery<CategoryStat[]>({
        queryKey: ["stats", "categories", "expense"],
        queryFn: getExpenseCategories,
    });

    return { data, isLoading, isError };
};

// Get Income Category Statistics
export const useGetIncomeCategories = () => {
    const getIncomeCategories = async () => {
        try {
            const response = await api.get("/stats/categories/income");
            console.log("Income Categories:", response.data);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const { data, isLoading, isError } = useQuery<CategoryStat[]>({
        queryKey: ["stats", "categories", "income"],
        queryFn: getIncomeCategories,
    });

    return { data, isLoading, isError };
};

// Get Monthly Statistics
export const useGetMonthlyStats = () => {
    const getMonthlyStats = async () => {
        try {
            const response = await api.get("/stats/monthly");
            console.log("Monthly Stats:", response.data);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const { data, isLoading, isError } = useQuery<MonthlyStat[]>({
        queryKey: ["stats", "monthly"],
        queryFn: getMonthlyStats,
    });

    return { data, isLoading, isError };
};

// Get Daily Statistics
export const useGetDailyStats = () => {
    const getDailyStats = async () => {
        try {
            const response = await api.get("/stats/daily");
            console.log("Daily Stats:", response.data);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const { data, isLoading, isError } = useQuery<DailyStat[]>({
        queryKey: ["stats", "daily"],
        queryFn: getDailyStats,
    });

    return { data, isLoading, isError };
};

// Get Yearly Statistics
export const useGetYearlyStats = () => {
    const getYearlyStats = async () => {
        try {
            const response = await api.get("/stats/yearly");
            console.log("Yearly Stats:", response.data);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const { data, isLoading, isError } = useQuery<YearlyStat[]>({
        queryKey: ["stats", "yearly"],
        queryFn: getYearlyStats,
    });

    return { data, isLoading, isError };
};
