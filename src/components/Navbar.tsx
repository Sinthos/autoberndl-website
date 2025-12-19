"use client";
import Link from "next/link";
import Image from "next/image";

import { Button } from "./ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-lg">
      <div className="container mx-auto flex h-32 items-center justify-between">
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/logo.png"
            alt="Auto Berndl – Gebrauchtwagen & Service"
            width={400}
            height={66}
            priority
            style={{ width: 'auto', height: 'auto' }}
          />
        </Link>
        <nav className="hidden md:flex items-center gap-12 text-xl font-semibold">
          <Link href="/#fahrzeuge" className="text-dark-gray hover:text-ci-yellow transition-colors">Fahrzeuge</Link>
          <Link href="/#ankauf" className="text-dark-gray hover:text-ci-yellow transition-colors">Ankauf</Link>
          <Link href="/#kontakt" className="text-dark-gray hover:text-ci-yellow transition-colors">Kontakt</Link>
        </nav>
        <Button asChild className="hidden md:inline-flex bg-ci-yellow text-primary-dark-gray font-bold text-xl px-10 py-5 rounded-xl border-2 border-ci-yellow hover:bg-ci-yellow/90 transition-colors">
          <a href="/#ankauf">Fahrzeugankauf</a>
        </Button>
      </div>
    </header>
  );
}
