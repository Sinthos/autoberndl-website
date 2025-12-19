import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-dark-gray text-white">
      <div className="container mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          <div>
            <h3 className="text-lg font-semibold">Adresse</h3>
            <p className="mt-4 text-gray-300">
              Biebermühle 5<br />
              66978 Donsieders
            </p>
            <p className="mt-2 text-gray-300">Tel. 06334-92270</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Öffnungszeiten</h3>
            <p className="mt-4 text-gray-300">
              Mo–Fr 8–18 Uhr<br />
              Sa 9–13 Uhr
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Rechtliches</h3>
            <div className="flex flex-col gap-2 mt-4">
              <a href="/impressum" className="text-gray-300 hover:text-ci-yellow">Impressum</a>
              <a href="/datenschutz" className="text-gray-300 hover:text-ci-yellow">Datenschutz</a>
              <a href="/agb" className="text-gray-300 hover:text-ci-yellow">AGB</a>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-gray-700 pt-8 flex items-center justify-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Auto Berndl. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
}
