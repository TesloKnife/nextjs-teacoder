"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";

interface DashboardTemplateProps {
  children: ReactNode;
}

export default function DashboardTemplate({
  children,
}: DashboardTemplateProps) {
  const [text, setText] = useState("");

  return (
    <div className="flex-1 p-6 border-4 border-dashed border-purple-500 rounded-lg flex flex-col animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="mb-8 text-xs font-bold text-purple-500 uppercase tracking-widest font-sans">
        DashboardTemplate
      </div>

      <div className="mt-auto pt-6 border-t border-purple-200">
        <label className="block text-[10px] font-bold text-purple-400 uppercase mb-2">
          Volatile State (Template)
        </label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Текст не сохранится..."
          className="w-full p-2 text-sm border border-purple-200 rounded bg-white text-black focus:ring-2 focus:ring-purple-500 outline-none"
        />
      </div>

      <main className="flex-1 flex flex-col bg-white p-8">{children}</main>
    </div>
  );
}
