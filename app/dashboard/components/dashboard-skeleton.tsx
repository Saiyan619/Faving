"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function DashboardSkeleton() {
    return (
        <div className="p-4 md:p-8 w-full max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
            {/* Accounts Overview Skeleton */}
            <div className="w-full rounded-3xl bg-blue-800/10 p-6 sm:p-8 relative overflow-hidden ring-1 ring-blue-100">
                <div className="relative z-10 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="space-y-2">
                        <Skeleton className="h-8 w-64 bg-blue-200/50" />
                        <Skeleton className="h-4 w-48 bg-blue-100/30" />
                    </div>
                    <Skeleton className="h-10 w-40 rounded-lg bg-blue-200/50" />
                </div>

                <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[...Array(2)].map((_, i) => (
                        <Card key={i} className="bg-white/50 backdrop-blur-sm border-white/20 shadow-none">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <Skeleton className="h-10 w-10 rounded-full bg-blue-100" />
                                <Skeleton className="h-8 w-8 rounded-md bg-blue-50" />
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Skeleton className="h-4 w-24 bg-blue-100" />
                                <Skeleton className="h-7 w-32 bg-blue-200" />
                                <Skeleton className="h-3 w-20 bg-blue-50" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Stats Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                    <Card key={i} className="shadow-sm border-none bg-white">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-8 w-8 rounded-full" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-8 w-32 mb-2" />
                            <Skeleton className="h-4 w-24" />
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Overview Chart Skeleton */}
            <Card className="shadow-sm border-none bg-white">
                <CardHeader>
                    <Skeleton className="h-6 w-48 mb-2" />
                    <Skeleton className="h-4 w-64" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-[300px] w-full" />
                </CardContent>
            </Card>

            {/* Recent Transactions Skeleton */}
            <Card className="shadow-sm border-none bg-white">
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                    <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <Skeleton className="h-10 w-10 rounded-full" />
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-32" />
                                        <Skeleton className="h-3 w-24" />
                                    </div>
                                </div>
                                <Skeleton className="h-4 w-16" />
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
