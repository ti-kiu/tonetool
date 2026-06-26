"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X, Waves } from "lucide-react";

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

interface NavigationProps {
  currentPage?: string;
}

export default function Navigation({ currentPage }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#08080F]/90 backdrop-blur-md border-b border-[#1E1E2E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Waves className="w-6 h-6 text-[#00E5CC]" />
            <span className="font-['Space_Grotesk',sans-serif] font-bold text-lg text-[#E8ECF0]">
              Tone Generator
            </span>
          </Link>
          
          {/* Nav Links - Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="/#how-it-works" className="text-sm text-[#6B7280] hover:text-[#E8ECF0] transition-colors">
              How It Works
            </a>
            <a href="/#faq" className="text-sm text-[#6B7280] hover:text-[#E8ECF0] transition-colors">
              FAQ
            </a>
            <a href="/#use-cases" className="text-sm text-[#6B7280] hover:text-[#E8ECF0] transition-colors">
              Use Cases
            </a>
            
            {/* Tools Dropdown */}
            <div className="relative">
              <button
                onClick={() => setToolsOpen(!toolsOpen)}
                className="flex items-center gap-1 text-sm text-[#6B7280] hover:text-[#E8ECF0] transition-colors"
              >
                Tools
                <ChevronDown className={`w-4 h-4 transition-transform ${toolsOpen ? "rotate-180" : ""}`} />
              </button>
              
              {toolsOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-[#0F0F1A] border border-[#1E1E2E] rounded-xl shadow-xl py-2">
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
              )}
            </div>
            
            <Link
              href="/blog"
              className="text-sm text-[#6B7280] hover:text-[#E8ECF0] transition-colors"
            >
              Blog
            </Link>
          </nav>
          
          {/* CTA */}
          <Link 
            href="/#audio-tool" 
            className="hidden md:inline-flex items-center px-5 py-2.5 border border-[#00E5CC] text-[#00E5CC] font-['Space_Grotesk',sans-serif] font-semibold text-sm rounded-xl hover:bg-[#00E5CC]/10 transition-colors"
          >
            Open Tool
          </Link>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-[#E8ECF0]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#1E1E2E]">
            <nav className="flex flex-col gap-4">
              <a href="/#how-it-works" className="text-sm text-[#6B7280] hover:text-[#E8ECF0] transition-colors" onClick={() => setMobileMenuOpen(false)}>
                How It Works
              </a>
              <a href="/#faq" className="text-sm text-[#6B7280] hover:text-[#E8ECF0] transition-colors" onClick={() => setMobileMenuOpen(false)}>
                FAQ
              </a>
              <a href="/#use-cases" className="text-sm text-[#6B7280] hover:text-[#E8ECF0] transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Use Cases
              </a>
              
              {/* Tools section */}
              <div>
                <button
                  onClick={() => setToolsOpen(!toolsOpen)}
                  className="flex items-center gap-1 text-sm text-[#6B7280] hover:text-[#E8ECF0] transition-colors"
                >
                  Tools
                  <ChevronDown className={`w-4 h-4 transition-transform ${toolsOpen ? "rotate-180" : ""}`} />
                </button>
                
                {toolsOpen && (
                  <div className="mt-2 ml-4 flex flex-col gap-2">
                    {tools.map((tool) => (
                      <Link
                        key={tool.href}
                        href={tool.href}
                        className="text-sm text-[#6B7280] hover:text-[#00E5CC] transition-colors"
                        onClick={() => {
                          setToolsOpen(false);
                          setMobileMenuOpen(false);
                        }}
                      >
                        {tool.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              
              <Link
                href="/blog"
                className="text-sm text-[#6B7280] hover:text-[#E8ECF0] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              
              <Link 
                href="/#audio-tool" 
                className="inline-flex items-center justify-center px-5 py-2.5 border border-[#00E5CC] text-[#00E5CC] font-['Space_Grotesk',sans-serif] font-semibold text-sm rounded-xl hover:bg-[#00E5CC]/10 transition-colors mt-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Open Tool
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
