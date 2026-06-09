"use client";

import { useState } from 'react';
import { ChevronDown } from "lucide-react";

interface FAQItemProps {
  question: string;
  answer: string;
}

export function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="bg-[#0F0F1A] border border-[#1E1E2E] rounded-xl">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-6 text-left"
      >
        <span className="font-['Space_Grotesk',sans-serif] text-lg font-medium text-[#E8ECF0]">{question}</span>
        <ChevronDown className={`w-5 h-5 text-[#6B7280] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="px-6 pb-6 text-[#6B7280] leading-relaxed border-t border-[#1E1E2E] pt-4">
          {answer}
        </div>
      )}
    </div>
  );
}

interface FAQListProps {
  items: { question: string; answer: string }[];
}

export function FAQList({ items }: FAQListProps) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <FAQItem key={i} question={item.question} answer={item.answer} />
      ))}
    </div>
  );
}
