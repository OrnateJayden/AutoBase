"use client";

import Link from "next/link";
import { Owner } from "@/types";

interface OwnersListProps {
  owners: Owner[];
  onDelete?: (id: string) => void;
}

export default function OwnersList({ owners, onDelete }: OwnersListProps) {
  if (owners.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 mb-4">Владельцы не найдены</p>
        <Link href="/owners/new" className="btn-primary">
          Добавить владельца
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {owners.map((owner) => (
        <div key={owner.id} className="card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">
              {owner.lastName} {owner.firstName} {owner.middleName || ""}
            </h3>
            <div className="mt-2 space-y-1 text-sm text-gray-400">
              <p>📞 {owner.phone}</p>
              <p>✉️ {owner.email}</p>
              <p>📍 {owner.address}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link href={`/owners/${owner.id}`} className="btn-secondary text-sm px-4 py-2">
              Просмотр
            </Link>
            <Link href={`/owners/${owner.id}/edit`} className="btn-secondary text-sm px-4 py-2">
              Изменить
            </Link>
            {onDelete && (
              <button
                onClick={() => onDelete(owner.id)}
                className="btn-danger text-sm"
              >
                Удалить
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
