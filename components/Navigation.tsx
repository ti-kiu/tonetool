"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

const tools = [
  { name: "Headphone Test", href: "/headphone-test" },
  { name: "Tinnitus Match", href: "/tinnitus-frequency" },
  { name: "Sine Wave", href: "/sine-wave-generator" },
  { name: "Frequency Sweep", href: "/frequency-sweep" },
  { name: "Instrument Tuner", href: "/instrument-tuner" },
  { name: "Subwoofer Test", href: "/subwoofer-test" },
  { name: "Hearing Test", href: "/hearing-test" },
  { name: "Binaural Beats", href: "/binaural-beats" },
  { name: "White Noise", href: "/white-noise" },
  { name: "440Hz Tone", href: "/440hz" },
  { name: "432Hz Tone", href: "/432hz" },
];

export default function Navigation() {
  const [toolsOpen, setToolsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#08080F]/90 backdrop-blur-md border-b border-[#1E1E2E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image src="/assets/logo.svg" alt="Tone Generator" width={24} height={24} />
            <span className="font-['Space_Grotesk',sans-serif] font-bold text-base text-[#E8ECF0]">
              Tone Generator
            </span>
          </Link>
          
          {/* Nav Links - single row */}
          <nav className="flex items-center gap-6 ml-8">
            <a href="/#how-it-works" className="text-xs text-[#6B7280] hover:text-[#E8ECF0] transition-colors whitespace-nowrap hidden sm:inline">
              How It Works
            </a>
            <a href="/#faq" className="text-xs text-[#6B7280] hover:text-[#E8ECF0] transition-colors whitespace-nowrap hidden sm:inline">
              FAQ
            </a>
            
            {/* Tools Dropdown */}
            <div className="relative">
              <button
                onClick={() => setToolsOpen(!toolsOpen)}
                className="flex items-center gap-1 text-xs text-[#6B7280] hover:text-[#E8ECF0] transition-colors whitespace-nowrap"
              >
                Tools
                <ChevronDown className={`w-3 h-3 transition-transform ${toolsOpen ? "rotate-180" : ""}`} />
              </button>
              
              {toolsOpen && (
                <>
                  <div className="fixed inset-0" onClick={() => setToolsOpen(false)} />
                  <div className="absolute top-full right-0 mt-2 w-52 bg-[#0F0F1A] border border-[#1E1E2E] rounded-xl shadow-xl py-2 z-50">
                    {tools.map((tool) => (
                      <Link
                        key={tool.href}
                        href={tool.href}
                        className="block px-4 py-2 text-sm text-[#6B7280] hover:text-[#00E5CC] hover:bg-[#1E1E2E] transition-colors"
                        onClick={() => setToolsOpen(false)}
                      >
                        {tool.name}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
            
            <a href="/#use-cases" className="text-xs text-[#6B7280] hover:text-[#E8ECF0] transition-colors whitespace-nowrap hidden sm:inline">
              Use Cases
            </a>
            <Link href="/blog" className="text-xs text-[#6B7280] hover:text-[#E8ECF0] transition-colors whitespace-nowrap">
              Blog
            </Link>
          </nav>
          
          {/* CTA */}
          <Link 
            href="/#audio-tool" 
            className="shrink-0 ml-4 px-4 py-2 border border-[#00E5CC] text-[#00E5CC] font-['Space_Grotesk',sans-serif] font-semibold text-xs rounded-lg hover:bg-[#00E5CC]/10 transition-colors whitespace-nowrap"
          >
            Open Tool
          </Link>
        </div>
      </div>
    </header>
  );
}
