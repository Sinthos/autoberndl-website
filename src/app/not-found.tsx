import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="bg-white text-dark-gray">
      <Navbar />
      <main>
        <section className="container mx-auto py-20 max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ci-blue/80">Fehler 404</p>
          <h1 className="text-4xl font-bold mt-4">Seite nicht gefunden</h1>
          <p className="text-lg text-medium-gray mt-4">
            Die Seite existiert nicht oder wurde verschoben. Kehren Sie zur Startseite zur&uuml;ck.
          </p>
          <Button asChild className="mt-8 bg-ci-yellow text-primary-dark-gray font-bold text-lg px-8 py-4 rounded-xl border-2 border-ci-yellow hover:bg-ci-yellow/90">
            <Link href="/">Zur&uuml;ck zur Startseite</Link>
          </Button>
        </section>
      </main>
      <Footer />
    </div>
  );
}
