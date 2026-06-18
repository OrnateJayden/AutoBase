import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light to-navy-dark" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-accent-red rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent-yellow rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-navy-light/80 border border-gray-700 rounded-full mb-6">
            <span className="w-2 h-2 bg-accent-red rounded-full animate-pulse" />
            <span className="text-sm text-gray-300">Каталог автомобилей</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-extrabold mb-6 tracking-tight">
            <span className="text-white">AUTO</span>
            <span className="text-accent-yellow mx-2">★</span>
            <span className="text-accent-red">BASE</span>
          </h1>

          <p className="text-xl text-gray-400 mb-10 leading-relaxed">
            Управляйте каталогом автомобилей и владельцев.
            Полный CRUD, поиск, пагинация и российские госномера.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/owners" className="btn-primary w-full sm:w-auto">
              Владельцы
            </Link>
            <Link href="/cars" className="btn-primary w-full sm:w-auto">
              Автомобили
            </Link>
            <Link href="/owners/new" className="btn-primary w-full sm:w-auto">
              Добавить владельца
            </Link>
            <Link href="/cars/new" className="btn-primary w-full sm:w-auto">
              Добавить авто
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
