"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import CarForm from "@/components/CarForm";
import LoadingSpinner from "@/components/LoadingSpinner";

function NewCarForm() {
  const searchParams = useSearchParams();
  const ownerId = searchParams.get("ownerId") || undefined;
  return <CarForm mode="create" defaultOwnerId={ownerId} />;
}

export default function NewCarPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="page-title">Новый автомобиль</h1>
      <p className="page-subtitle">Добавление нового автомобиля в каталог</p>
      <Suspense fallback={<LoadingSpinner />}>
        <NewCarForm />
      </Suspense>
    </div>
  );
}
