import { getOwnerCount, getCarCount, getAllOwners, getAllCars } from "@/lib/store";
import LicensePlate from "@/components/LicensePlate";

export default function ProfilePage() {
  const ownerCount = getOwnerCount();
  const carCount = getCarCount();
  const owners = getAllOwners();
  const cars = getAllCars();

  const brandStats = cars.reduce<Record<string, number>>((acc, car) => {
    acc[car.brand] = (acc[car.brand] || 0) + 1;
    return acc;
  }, {});

  const sortedBrands = Object.entries(brandStats).sort((a, b) => b[1] - a[1]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="page-title">Профиль системы</h1>
      <p className="page-subtitle">Статистика и информация о каталоге AUTO ★ BASE</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="card text-center">
          <div className="text-4xl font-extrabold text-accent-red">{ownerCount}</div>
          <p className="text-gray-400 mt-2">Владельцев</p>
        </div>
        <div className="card text-center">
          <div className="text-4xl font-extrabold text-accent-yellow">{carCount}</div>
          <p className="text-gray-400 mt-2">Автомобилей</p>
        </div>
        <div className="card text-center">
          <div className="text-4xl font-extrabold text-white">
            {ownerCount > 0 ? (carCount / ownerCount).toFixed(1) : "0"}
          </div>
          <p className="text-gray-400 mt-2">Авто на владельца</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card">
          <h2 className="text-xl font-semibold text-white mb-4">Популярные марки</h2>
          {sortedBrands.length === 0 ? (
            <p className="text-gray-400">Нет данных</p>
          ) : (
            <ul className="space-y-3">
              {sortedBrands.map(([brand, count]) => (
                <li key={brand} className="flex items-center justify-between">
                  <span className="text-gray-300">{brand}</span>
                  <span className="text-accent-yellow font-semibold">{count}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold text-white mb-4">Последние госномера</h2>
          <div className="flex flex-wrap gap-3">
            {cars.slice(-5).map((car) => (
              <LicensePlate key={car.id} plate={car.licensePlate} size="sm" />
            ))}
          </div>
        </div>
      </div>

      <div className="card mt-8">
        <h2 className="text-xl font-semibold text-white mb-4">О проекте</h2>
        <div className="text-gray-300 space-y-2 text-sm">
          <p><strong className="text-white">Название:</strong> AUTO ★ BASE</p>
          <p><strong className="text-white">Тип:</strong> Fullstack Next.js (вариант B)</p>
          <p><strong className="text-white">Хранилище:</strong> In-memory (lib/store.ts)</p>
          <p><strong className="text-white">API:</strong> REST (app/api/)</p>
          <p><strong className="text-white">Валидация:</strong> Zod</p>
          <p><strong className="text-white">Стили:</strong> Tailwind CSS</p>
          <p><strong className="text-white">Связь:</strong> Owner (1) → Car (many)</p>
        </div>
      </div>
    </div>
  );
}
