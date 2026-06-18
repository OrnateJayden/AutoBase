"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Car, Owner } from "@/types";
import { fetchCars, fetchOwners, deleteCar } from "@/lib/api";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import Pagination from "@/components/Pagination";
import LicensePlate from "@/components/LicensePlate";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [ownerMap, setOwnerMap] = useState<Record<string, Owner>>({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadCars = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [carsResult, ownersResult] = await Promise.all([
        fetchCars({ page, pageSize: DEFAULT_PAGE_SIZE, search }),
        fetchOwners({ pageSize: 50 }),
      ]);
      setCars(carsResult.data);
      setTotalPages(carsResult.totalPages);
      const map: Record<string, Owner> = {};
      ownersResult.data.forEach((o) => { map[o.id] = o; });
      setOwnerMap(map);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка загрузки");
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    loadCars();
  }, [loadCars]);

  async function handleDelete(id: string) {
    if (!confirm("Удалить автомобиль?")) return;
    try {
      await deleteCar(id);
      loadCars();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Ошибка удаления");
    }
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setPage(1);
    setSearch(searchInput);
  }

  function getOwnerName(ownerId: string): string {
    const owner = ownerMap[ownerId];
    if (!owner) return "—";
    return `${owner.lastName} ${owner.firstName}`;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="page-title">Автомобили</h1>
          <p className="page-subtitle mb-0">Каталог автомобилей</p>
        </div>
        <Link href="/cars/new" className="btn-primary">
          + Добавить автомобиль
        </Link>
      </div>

      <form onSubmit={handleSearch} className="mb-6 flex gap-3">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Поиск по марке, модели, госномеру, VIN..."
          className="input-field flex-1"
        />
        <button type="submit" className="btn-primary">Найти</button>
        {search && (
          <button
            type="button"
            onClick={() => { setSearch(""); setSearchInput(""); setPage(1); }}
            className="btn-secondary"
          >
            Сброс
          </button>
        )}
      </form>

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} onRetry={loadCars} />}
      {!loading && !error && (
        <>
          {cars.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 mb-4">Автомобили не найдены</p>
              <Link href="/cars/new" className="btn-primary">Добавить автомобиль</Link>
            </div>
          ) : (
            <div className="grid gap-4">
              {cars.map((car) => (
                <div key={car.id} className="card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">
                      {car.brand} {car.model} ({car.year})
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">
                      Владелец: {getOwnerName(car.ownerId)} | Цвет: {car.color}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">VIN: {car.vin}</p>
                    <div className="mt-2">
                      <LicensePlate plate={car.licensePlate} />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/cars/${car.id}/edit`} className="btn-secondary text-sm px-4 py-2">
                      Изменить
                    </Link>
                    <button onClick={() => handleDelete(car.id)} className="btn-danger text-sm">
                      Удалить
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}
    </div>
  );
}
