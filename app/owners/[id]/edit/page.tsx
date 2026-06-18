"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Owner } from "@/types";
import { fetchOwner } from "@/lib/api";
import OwnerForm from "@/components/OwnerForm";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";

export default function EditOwnerPage() {
  const params = useParams();
  const id = params.id as string;
  const [owner, setOwner] = useState<Owner | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOwner(id)
      .then((data) => setOwner(data))
      .catch((err) => setError(err instanceof Error ? err.message : "Ошибка загрузки"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!owner) return <ErrorMessage message="Владелец не найден" />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="page-title">Редактирование владельца</h1>
      <p className="page-subtitle">
        {owner.lastName} {owner.firstName}
      </p>
      <OwnerForm owner={owner} mode="edit" />
    </div>
  );
}
