"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Car } from "@/types";
import { fetchCar } from "@/lib/api";
import CarForm from "@/components/CarForm";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";

export default function EditCarPage() {
  const params = useParams();
  const id = params.id as string;
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCar(id)
      .then(setCar)
      .catch((err) => setError(err instanceof Error ? err.message : "Ошибка загрузки"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!car) return <ErrorMessage message="Автомобиль не найден" />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="page-title">Редактирование автомобиля</h1>
      <p className="page-subtitle">
        {car.brand} {car.model} ({car.year})
      </p>
      <CarForm car={car} mode="edit" />
    </div>
  );
}
