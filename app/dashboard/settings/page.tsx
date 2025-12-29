"use client"

import { Construction, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SettingPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
            <div className="mb-8 p-6 rounded-full bg-blue-50 text-blue-600 animate-pulse">
                <Construction size={64} />
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                Work in Progress
            </h1>

            <p className="text-lg text-gray-500 max-w-md mb-8 leading-relaxed">
                This page is currently under development. Please come back later to access this page.
            </p>

            <Link href="/dashboard">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 h-12 gap-2 shadow-lg shadow-blue-100 transition-all active:scale-95">
                    <ArrowLeft size={18} />
                    Back to Dashboard
                </Button>
            </Link>
        </div>
    )
}
