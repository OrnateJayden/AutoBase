"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Owner } from "@/types";
import { createOwner, updateOwner } from "@/lib/api";
import { ownerSchema, OwnerFormData } from "@/lib/validators";

interface OwnerFormProps {
  owner?: Owner;
  mode: "create" | "edit";
}

export default function OwnerForm({ owner, mode }: OwnerFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");

  const [form, setForm] = useState<OwnerFormData>({
    firstName: owner?.firstName || "",
    lastName: owner?.lastName || "",
    middleName: owner?.middleName || "",
    phone: owner?.phone || "",
    email: owner?.email || "",
    address: owner?.address || "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setFormError("");
    setErrors({});

    const parsed = ownerSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.errors.forEach((err) => {
        const key = err.path[0] as string;
        fieldErrors[key] = err.message;
      });
      setErrors(fieldErrors);
      setLoading(false);
      return;
    }

    try {
      if (mode === "create") {
        await createOwner(parsed.data);
        router.push("/owners");
      } else if (owner) {
        await updateOwner(owner.id, parsed.data);
        router.push(`/owners/${owner.id}`);
      }
      router.refresh();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Ошибка сохранения");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card max-w-2xl mx-auto space-y-5">
      {formError && (
        <div className="p-4 bg-red-900/30 border border-red-700 rounded-lg text-red-300 text-sm">
          {formError}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="lastName" className="label-field">Фамилия *</label>
          <input id="lastName" name="lastName" value={form.lastName} onChange={handleChange}
            className="input-field" placeholder="Иванов" />
          {errors.lastName && <p className="text-accent-red text-xs mt-1">{errors.lastName}</p>}
        </div>
        <div>
          <label htmlFor="firstName" className="label-field">Имя *</label>
          <input id="firstName" name="firstName" value={form.firstName} onChange={handleChange}
            className="input-field" placeholder="Иван" />
          {errors.firstName && <p className="text-accent-red text-xs mt-1">{errors.firstName}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="middleName" className="label-field">Отчество</label>
        <input id="middleName" name="middleName" value={form.middleName} onChange={handleChange}
          className="input-field" placeholder="Иванович" />
        {errors.middleName && <p className="text-accent-red text-xs mt-1">{errors.middleName}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className="label-field">Телефон *</label>
          <input id="phone" name="phone" value={form.phone} onChange={handleChange}
            className="input-field" placeholder="+7 (999) 123-45-67" />
          {errors.phone && <p className="text-accent-red text-xs mt-1">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="email" className="label-field">Email *</label>
          <input id="email" name="email" type="email" value={form.email} onChange={handleChange}
            className="input-field" placeholder="ivan@mail.ru" />
          {errors.email && <p className="text-accent-red text-xs mt-1">{errors.email}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="address" className="label-field">Адрес *</label>
        <textarea id="address" name="address" value={form.address} onChange={handleChange}
          className="input-field min-h-[80px] resize-y" placeholder="г. Москва, ул. Ленина, д. 1" />
        {errors.address && <p className="text-accent-red text-xs mt-1">{errors.address}</p>}
      </div>

      <div className="flex gap-4 pt-2">
        <button type="submit" disabled={loading} className="btn-primary disabled:opacity-50">
          {loading ? "Сохранение..." : mode === "create" ? "Создать" : "Сохранить"}
        </button>
        <button type="button" onClick={() => router.back()} className="btn-secondary">
          Отмена
        </button>
      </div>
    </form>
  );
}
