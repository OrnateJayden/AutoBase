import { z } from "zod";
import { RF_PLATE_REGEX } from "./constants";

export const ownerSchema = z.object({
  firstName: z
    .string()
    .min(1, "Имя обязательно")
    .max(50, "Имя не должно превышать 50 символов"),
  lastName: z
    .string()
    .min(1, "Фамилия обязательна")
    .max(50, "Фамилия не должна превышать 50 символов"),
  middleName: z
    .string()
    .max(50, "Отчество не должно превышать 50 символов")
    .optional(),
  phone: z
    .string()
    .min(1, "Телефон обязателен")
    .regex(
      /^(\+7|8)?[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/,
      "Неверный формат телефона"
    ),
  email: z
    .string()
    .min(1, "Email обязателен")
    .email("Неверный формат email"),
  address: z
    .string()
    .min(1, "Адрес обязателен")
    .max(200, "Адрес не должен превышать 200 символов"),
});

export const carSchema = z.object({
  ownerId: z.string().min(1, "Владелец обязателен"),
  brand: z
    .string()
    .min(1, "Марка обязательна")
    .max(50, "Марка не должна превышать 50 символов"),
  model: z
    .string()
    .min(1, "Модель обязательна")
    .max(50, "Модель не должна превышать 50 символов"),
  year: z
    .number()
    .int("Год должен быть целым числом")
    .min(1900, "Год не может быть меньше 1900")
    .max(new Date().getFullYear() + 1, "Год не может быть в будущем"),
  color: z
    .string()
    .min(1, "Цвет обязателен")
    .max(30, "Цвет не должен превышать 30 символов"),
  licensePlate: z
    .string()
    .min(1, "Госномер обязателен")
    .regex(
      RF_PLATE_REGEX,
      "Неверный формат госномера (пример: А123ВЕ777)"
    ),
  vin: z
    .string()
    .min(17, "VIN должен содержать 17 символов")
    .max(17, "VIN должен содержать 17 символов")
    .regex(/^[A-HJ-NPR-Z0-9]{17}$/i, "Неверный формат VIN"),
});

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(50).default(5),
  search: z.string().optional(),
});

export type OwnerFormData = z.infer<typeof ownerSchema>;
export type CarFormData = z.infer<typeof carSchema>;
