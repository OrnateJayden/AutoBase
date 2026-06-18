import Hero from "@/components/Hero";
import Link from "next/link";
import { getOwnerCount, getCarCount } from "@/lib/store";

export default function HomePage() {
  const ownerCount = getOwnerCount();
  const carCount = getCarCount();

  return (
    <>
      <Hero />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="card text-center">
            <div className="text-5xl font-extrabold text-accent-red mb-2">{ownerCount}</div>
            <p className="text-gray-400 text-lg">Владельцев</p>
            <Link href="/owners" className="btn-primary mt-4 inline-block">
              Перейти к владельцам
            </Link>
          </div>
          <div className="card text-center">
            <div className="text-5xl font-extrabold text-accent-yellow mb-2">{carCount}</div>
            <p className="text-gray-400 text-lg">Автомобилей</p>
            <Link href="/cars" className="btn-primary mt-4 inline-block">
              Перейти к автомобилям
            </Link>
          </div>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold text-white mb-4">Возможности системы</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-300">
            <li className="flex items-center gap-2">
              <span className="text-accent-red">★</span> CRUD для владельцев и автомобилей
            </li>
            <li className="flex items-center gap-2">
              <span className="text-accent-red">★</span> Поиск и пагинация
            </li>
            <li className="flex items-center gap-2">
              <span className="text-accent-red">★</span> Валидация данных (Zod)
            </li>
            <li className="flex items-center gap-2">
              <span className="text-accent-red">★</span> Российские госномера
            </li>
            <li className="flex items-center gap-2">
              <span className="text-accent-red">★</span> REST API
            </li>
            <li className="flex items-center gap-2">
              <span className="text-accent-red">★</span> In-memory хранилище
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
