"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { OwnerWithCars } from "@/types";
import { fetchOwner } from "@/lib/api";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import LicensePlate from "@/components/LicensePlate";

export default function OwnerDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [owner, setOwner] = useState<OwnerWithCars | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOwner(id)
      .then(setOwner)
      .catch((err) => setError(err instanceof Error ? err.message : "Ошибка загрузки"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!owner) return <ErrorMessage message="Владелец не найден" />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="page-title">
            {owner.lastName} {owner.firstName} {owner.middleName || ""}
          </h1>
          <p className="page-subtitle mb-0">Карточка владельца</p>
        </div>
        <div className="flex gap-3">
          <Link href={`/owners/${id}/edit`} className="btn-primary">
            Редактировать
          </Link>
          <Link href="/owners" className="btn-secondary">
            Назад
          </Link>
        </div>
      </div>

      <div className="card max-w-2xl mb-8">
        <h2 className="text-lg font-semibold text-white mb-4">Контактные данные</h2>
        <dl className="space-y-3 text-gray-300">
          <div className="flex gap-2">
            <dt className="text-gray-500 w-24">Телефон:</dt>
            <dd>{owner.phone}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-gray-500 w-24">Email:</dt>
            <dd>{owner.email}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-gray-500 w-24">Адрес:</dt>
            <dd>{owner.address}</dd>
          </div>
        </dl>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">
            Автомобили ({owner.cars.length})
          </h2>
          <Link href={`/cars/new?ownerId=${id}`} className="btn-primary text-sm px-4 py-2">
            + Добавить авто
          </Link>
        </div>

        {owner.cars.length === 0 ? (
          <p className="text-gray-400">У владельца нет автомобилей</p>
        ) : (
          <div className="grid gap-4">
            {owner.cars.map((car) => (
              <div key={car.id} className="card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {car.brand} {car.model} ({car.year})
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">Цвет: {car.color} | VIN: {car.vin}</p>
                  <div className="mt-2">
                    <LicensePlate plate={car.licensePlate} />
                  </div>
                </div>
                <Link href={`/cars/${car.id}/edit`} className="btn-secondary text-sm px-4 py-2">
                  Изменить
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
