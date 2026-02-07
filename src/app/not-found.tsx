import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4 px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900">Página no encontrada</h1>
      <p className="text-gray-600 text-center">
        La ruta que buscás no existe. Volvé al inicio para continuar.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center font-semibold rounded-pill h-11 px-6 bg-primary-600 text-white hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
      >
        Ir al inicio
      </Link>
    </div>
  );
}
