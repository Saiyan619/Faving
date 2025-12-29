"use client"
import { useState, Suspense } from "react"
import { useForm } from "@tanstack/react-form"
import * as z from "zod"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useLoginUser } from "@/apis/auth"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

const formSchema = z.object({
  email: z
    .string()
    .email("Invalid email address."),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .max(50, "Password must be at most 50 characters."),
})

export function LoginContent() {
  const searchParams = useSearchParams()
  const from = searchParams.get('from') || '/dashboard'
  const { login, isPending } = useLoginUser()
  const [showPassword, setShowPassword] = useState(false)
  
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async (values) => {
      console.log("Submitting login form...", values.value)
      try {
        await login(values.value)
        console.log("Login successful, redirecting to:", from)
        // Hard redirect to trigger middleware check
        window.location.href = from
      } catch (error) {
        console.error("Login submission error:", error)
      }
    },
  })

  // REMOVED the useEffect that was causing the refresh loop

  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-0">
      <div className="flex flex-col lg:flex-row w-full max-w-[1440px] lg:h-screen lg:overflow-hidden bg-white shadow-sm rounded-2xl overflow-hidden">

        {/* Form Section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16 order-2 lg:order-1 bg-white">
          <div className="w-full max-w-md space-y-6 py-6 lg:py-0">
            <div className="text-center">
              <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-blue-50 mb-3">
                <img className="w-8 sm:w-12" src="/faving logo-2-new.png" alt="logo" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Welcome Back</h1>
              <p className="mt-2 text-sm text-gray-500">
                Login to your account and continue exploring Finance Enlightenment!
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                form.handleSubmit()
              }}
              className="space-y-4"
            >
              <div className="space-y-4">
                <form.Field
                  name="email"
                  children={(field) => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                      <Field data-invalid={isInvalid} className="space-y-1">
                        <FieldLabel htmlFor={field.name} className="text-sm font-semibold text-gray-700">Email Address</FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          type="email"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="john@example.com"
                          className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                        />
                        {isInvalid && <FieldError errors={field.state.meta.errors} className="text-xs text-red-500 mt-1" />}
                      </Field>
                    )
                  }}
                />

                <form.Field
                  name="password"
                  children={(field) => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                      <Field data-invalid={isInvalid} className="space-y-1">
                        <FieldLabel htmlFor={field.name} className="text-sm font-semibold text-gray-700">Password</FieldLabel>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            aria-invalid={isInvalid}
                            placeholder="••••••••"
                            className={`h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl pr-12 ${isInvalid ? "border-red-500" : ""}`}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-transparent text-gray-400 hover:text-gray-600"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                        {isInvalid && <FieldError errors={field.state.meta.errors} className="text-xs text-red-500 mt-1" />}
                      </Field>
                    )
                  }}
                />
              </div>

              <Button
                disabled={isPending}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-200 transition-all duration-200 active:scale-[0.98]"
                type="submit"
              >
                {isPending ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-sm text-gray-500">
                Don't have an account?{" "}
                <Link href="/auth/register" className="text-blue-600 font-bold hover:text-blue-700 transition-colors">
                  Create one for free
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="hidden lg:block lg:w-1/2 relative bg-blue-600 order-1 lg:order-2">
          <img
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-80"
            src="/original-aa90bab2a9a591856422624277127f79.jpg"
            alt="Fintech dashboard"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/40 to-transparent" />
          <div className="absolute bottom-12 left-12 right-12 text-white">
            <blockquote className="space-y-4">
              <p className="text-2xl font-medium leading-relaxed">
                "This app revolutionized how I track my net worth. The simplicity mixed with powerful analytics is unmatched."
              </p>
              <footer className="text-blue-200">
                <div className="font-semibold text-white">Olaniyi Arokoyu</div>
                <div className="text-sm">Chief Executive Officer (yes, im also the CEO)</div>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Login() {
  return (
    <Suspense fallback={null}>
      <LoginContent />
    </Suspense>
  )
}
