"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Owner } from "@/types";
import { fetchOwners, deleteOwner } from "@/lib/api";
import OwnersList from "@/components/OwnersList";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import Pagination from "@/components/Pagination";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";

export default function OwnersPage() {
  const [owners, setOwners] = useState<Owner[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadOwners = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const result = await fetchOwners({ page, pageSize: DEFAULT_PAGE_SIZE, search });
      setOwners(result.data);
      setTotalPages(result.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка загрузки");
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    loadOwners();
  }, [loadOwners]);

  async function handleDelete(id: string) {
    if (!confirm("Удалить владельца и все его автомобили?")) return;
    try {
      await deleteOwner(id);
      loadOwners();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Ошибка удаления");
    }
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setPage(1);
    setSearch(searchInput);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="page-title">Владельцы</h1>
          <p className="page-subtitle mb-0">Управление владельцами автомобилей</p>
        </div>
        <Link href="/owners/new" className="btn-primary">
          + Добавить владельца
        </Link>
      </div>

      <form onSubmit={handleSearch} className="mb-6 flex gap-3">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Поиск по имени, email, телефону..."
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
      {error && <ErrorMessage message={error} onRetry={loadOwners} />}
      {!loading && !error && (
        <>
          <OwnersList owners={owners} onDelete={handleDelete} />
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}
    </div>
  );
}
