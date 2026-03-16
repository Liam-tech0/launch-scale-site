"use client"

import React from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"

const GREEN = '#00FF41'

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string
    link: string
    icon?: React.ReactNode
  }[]
  className?: string
}) => {
  return (
    <div
      className={cn(
        "flex max-w-fit fixed top-8 inset-x-0 mx-auto z-[5000]",
        "border border-white/10 rounded-full",
        "bg-black/80 backdrop-blur-md",
        "shadow-[0_0_20px_rgba(0,255,65,0.08)]",
        "pr-2 pl-6 py-2 items-center justify-center gap-1",
        "font-[family-name:var(--font-rubik)]",
        className
      )}
    >
      {/* L/S mini logo */}
      <Link href="#hero" className="mr-3 flex items-center gap-0.5 shrink-0">
        <span className="text-sm font-black text-white">L</span>
        <span className="text-sm font-black" style={{ color: GREEN }}>/</span>
        <span className="text-sm font-black text-white">S</span>
      </Link>

      {/* Separator */}
      <div className="w-px h-4 bg-white/10 mr-3" />

      {/* Nav links */}
      {navItems.map((navItem, idx) => (
        <Link
          key={idx}
          href={navItem.link}
          className="relative flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold tracking-widest uppercase text-white/40 hover:text-white transition-colors duration-200 rounded-full hover:bg-white/5"
        >
          {navItem.icon && (
            <span className="block sm:hidden">{navItem.icon}</span>
          )}
          <span className="hidden sm:block">{navItem.name}</span>
        </Link>
      ))}

      {/* CTA button */}
      <Link
        href="#videos"
        className="relative ml-1 px-4 py-1.5 text-xs font-bold tracking-widest uppercase rounded-full transition-all duration-200"
        style={{
          border: `1px solid ${GREEN}`,
          color: '#000',
          backgroundColor: GREEN,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent'
          e.currentTarget.style.color = GREEN
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = GREEN
          e.currentTarget.style.color = '#000'
        }}
      >
        Vidéos
        <span
          className="absolute inset-x-0 w-1/2 mx-auto -bottom-px h-px"
          style={{ background: `linear-gradient(to right, transparent, ${GREEN}, transparent)` }}
        />
      </Link>
    </div>
  )
}
