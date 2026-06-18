"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Car, Owner } from "@/types";
import { createCar, updateCar, fetchOwners } from "@/lib/api";
import { carSchema, CarFormData } from "@/lib/validators";
import { CAR_BRANDS, CAR_COLORS } from "@/lib/constants";
import LicensePlate from "./LicensePlate";

interface CarFormProps {
  car?: Car;
  mode: "create" | "edit";
  defaultOwnerId?: string;
}

export default function CarForm({ car, mode, defaultOwnerId }: CarFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [owners, setOwners] = useState<Owner[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");

  const [form, setForm] = useState<CarFormData>({
    ownerId: car?.ownerId || defaultOwnerId || "",
    brand: car?.brand || "",
    model: car?.model || "",
    year: car?.year || new Date().getFullYear(),
    color: car?.color || "",
    licensePlate: car?.licensePlate || "",
    vin: car?.vin || "",
  });

  useEffect(() => {
    fetchOwners({ pageSize: 50 })
      .then((res) => setOwners(res.data))
      .catch(() => setOwners([]));
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "year" ? parseInt(value, 10) || 0 : value,
    }));
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

    const parsed = carSchema.safeParse(form);
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
        await createCar(parsed.data);
        router.push("/cars");
      } else if (car) {
        await updateCar(car.id, parsed.data);
        router.push("/cars");
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

      <div>
        <label htmlFor="ownerId" className="label-field">Владелец *</label>
        <select id="ownerId" name="ownerId" value={form.ownerId} onChange={handleChange}
          className="input-field">
          <option value="">Выберите владельца</option>
          {owners.map((o) => (
            <option key={o.id} value={o.id}>
              {o.lastName} {o.firstName} {o.middleName || ""}
            </option>
          ))}
        </select>
        {errors.ownerId && <p className="text-accent-red text-xs mt-1">{errors.ownerId}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="brand" className="label-field">Марка *</label>
          <select id="brand" name="brand" value={form.brand} onChange={handleChange}
            className="input-field">
            <option value="">Выберите марку</option>
            {CAR_BRANDS.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
          {errors.brand && <p className="text-accent-red text-xs mt-1">{errors.brand}</p>}
        </div>
        <div>
          <label htmlFor="model" className="label-field">Модель *</label>
          <input id="model" name="model" value={form.model} onChange={handleChange}
            className="input-field" placeholder="Camry" />
          {errors.model && <p className="text-accent-red text-xs mt-1">{errors.model}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="year" className="label-field">Год выпуска *</label>
          <input id="year" name="year" type="number" value={form.year} onChange={handleChange}
            className="input-field" min={1900} max={new Date().getFullYear() + 1} />
          {errors.year && <p className="text-accent-red text-xs mt-1">{errors.year}</p>}
        </div>
        <div>
          <label htmlFor="color" className="label-field">Цвет *</label>
          <select id="color" name="color" value={form.color} onChange={handleChange}
            className="input-field">
            <option value="">Выберите цвет</option>
            {CAR_COLORS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {errors.color && <p className="text-accent-red text-xs mt-1">{errors.color}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="licensePlate" className="label-field">Госномер (РФ) *</label>
        <input id="licensePlate" name="licensePlate" value={form.licensePlate} onChange={handleChange}
          className="input-field uppercase" placeholder="А123ВЕ777" />
        {errors.licensePlate && <p className="text-accent-red text-xs mt-1">{errors.licensePlate}</p>}
        {form.licensePlate && (
          <div className="mt-3">
            <LicensePlate plate={form.licensePlate} />
          </div>
        )}
      </div>

      <div>
        <label htmlFor="vin" className="label-field">VIN *</label>
        <input id="vin" name="vin" value={form.vin} onChange={handleChange}
          className="input-field uppercase" placeholder="JTDBR32E504012345" maxLength={17} />
        {errors.vin && <p className="text-accent-red text-xs mt-1">{errors.vin}</p>}
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
