"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/#fahrzeuge", label: "Fahrzeuge" },
  { href: "/#ankauf", label: "Ankauf" },
  { href: "/#kontakt", label: "Kontakt" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-lg">
      <div className="container mx-auto flex h-20 items-center justify-between gap-4 md:h-32">
        <Link href="/" className="flex-shrink-0">
          <div className="relative h-10 w-[180px] sm:h-12 sm:w-[220px] md:h-16 md:w-[320px]">
            <Image
              src="/logo.png"
              alt="Auto Berndl – Gebrauchtwagen & Service"
              fill
              priority
              sizes="(min-width: 768px) 320px, 180px"
              className="object-contain"
            />
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-12 text-xl font-semibold">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-dark-gray hover:text-ci-yellow transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Button asChild className="hidden md:inline-flex bg-ci-yellow text-primary-dark-gray font-bold text-xl px-10 py-5 rounded-xl border-2 border-ci-yellow hover:bg-ci-yellow/90 transition-colors">
          <a href="/#ankauf">Fahrzeugankauf</a>
        </Button>
        <button
          type="button"
          aria-label="Menue"
          aria-controls="mobile-menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
          className="md:hidden inline-flex items-center justify-center rounded-full border border-gray-200 p-2 text-dark-gray transition-colors hover:bg-light-gray"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      <div
        id="mobile-menu"
        className={cn(
          "md:hidden overflow-hidden border-t border-gray-200 transition-[max-height,opacity] duration-300",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="container mx-auto flex flex-col gap-4 py-6 text-lg font-semibold">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-dark-gray hover:text-ci-yellow transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Button
            asChild
            className="bg-ci-yellow text-primary-dark-gray font-bold text-lg px-8 py-4 rounded-xl border-2 border-ci-yellow hover:bg-ci-yellow/90 transition-colors"
          >
            <a href="/#ankauf" onClick={() => setIsOpen(false)}>
              Fahrzeugankauf
            </a>
          </Button>
        </nav>
      </div>
    </header>
  );
}
