"use client";
import Image from "next/image";
import Link from "next/link";
import GridDistortion from "@/components/GridDistortion";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="">
      {/* Background Effect */}
      <div style={{ width: '100%', height: '600px', position: 'relative' }}>

        <GridDistortion

          imageSrc="/original-b1c45dd59738933d055aa91878cd62bf.png"

          grid={15}

          mouse={0.12}

          strength={0.20}

          relaxation={0.9}

          className="custom-class"

        />
      </div>

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 pointer-events-none">
        <div className="max-w-4xl mx-auto text-center space-y-8">

          {/* Badge / Pill */}
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-gray-200 bg-white/50 backdrop-blur-md mb-4 animate-fade-in-up">
            <span className="text-xs font-medium tracking-wide text-cyan-600 uppercase">
              FAVING V1.0
            </span>
          </div>

          {/* Hero Title */}
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 drop-shadow-sm">
            Master Your <br className="hidden md:block" />
            <span className="text-gray-900">
              Financial Future
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 leading-relaxed font-light">
            Experience the next generation of personal finance tracking.
            Seamlessly monitor income, expenses, and transfers with
            unrivaled clarity and precision.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-10 pointer-events-auto">
            {/* Primary Glass Button - Maintained dark text or distinct background for visibility */}
            <Link
              href="/auth/register"
              className="group px-8 py-3.5 rounded-xl bg-black/90 backdrop-blur-lg border border-black/10 text-white font-semibold shadow-lg hover:shadow-cyan-500/20 hover:bg-black hover:scale-[1.02] transition-all duration-300 overflow-hidden"
            >
              <div className="w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
              <span className="flex items-center gap-2">
                Get Started Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            {/* Secondary Ghost Button */}
            <Link
              href="/auth/login"
              className="px-8 py-3.5 rounded-xl text-gray-600 hover:text-black font-medium hover:bg-black/5 transition-all duration-200"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Optional: Footer or Trust markers could go here */}
        <div className="text-center text-gray-400 text-sm mt-10">
          <p>Trusted by forward-thinking investors worldwide.</p>
        </div>
      </div>

    </div>
  );
}
