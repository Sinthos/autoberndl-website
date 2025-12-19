"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const COOKIE_NAME = "ab_cookie_consent";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

const getCookieValue = (name: string) => {
  if (typeof document === "undefined") return null;
  const cookies = document.cookie.split(";").map((item) => item.trim());
  const match = cookies.find((cookie) => cookie.startsWith(`${name}=`));
  return match ? match.split("=")[1] : null;
};

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(!getCookieValue(COOKIE_NAME));
  }, []);

  if (!isVisible) return null;

  const handleAccept = () => {
    document.cookie = `${COOKIE_NAME}=essential; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
    setIsVisible(false);
  };

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 px-4" role="dialog" aria-label="Cookie-Hinweis">
      <div className="mx-auto max-w-3xl liquid-glass bg-white/90 p-5 sm:p-6 border border-white/70 shadow-light">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-dark-gray">
            <p className="font-semibold">Datenschutz</p>
            <p className="mt-1 text-medium-gray">
              Wir verwenden nur technisch notwendige Cookies, um Ihre Auswahl zu speichern. Details finden Sie in unserer {" "}
              <Link href="/datenschutz" className="text-ci-blue hover:underline">Datenschutzerklaerung</Link>.
            </p>
          </div>
          <Button onClick={handleAccept} className="bg-ci-yellow text-primary-dark-gray font-bold px-6 py-3 rounded-xl border-2 border-ci-yellow hover:bg-ci-yellow/90">
            Verstanden
          </Button>
        </div>
      </div>
    </div>
  );
}
