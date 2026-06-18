import { NextRequest } from "next/server";
import {
  getCarById,
  updateCar,
  deleteCar,
  getOwnerById,
} from "@/lib/store";
import {
  formatZodErrors,
  jsonError,
  jsonSuccess,
} from "@/lib/api-utils";
import { carSchema } from "@/lib/validators";

interface RouteParams {
  params: { id: string };
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  const car = getCarById(params.id);
  if (!car) {
    return jsonError("Автомобиль не найден", 404);
  }
  return jsonSuccess(car);
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const car = getCarById(params.id);
  if (!car) {
    return jsonError("Автомобиль не найден", 404);
  }
  try {
    const body = await request.json();
    const parsed = carSchema.partial().safeParse(body);
    if (!parsed.success) {
      return jsonError("Ошибка валидации", 400, formatZodErrors(parsed.error));
    }
    if (parsed.data.ownerId && !getOwnerById(parsed.data.ownerId)) {
      return jsonError("Владелец не найден", 404);
    }
    const updated = updateCar(params.id, parsed.data);
    if (!updated) {
      return jsonError("Автомобиль с таким госномером уже существует", 409);
    }
    return jsonSuccess(updated);
  } catch {
    return jsonError("Неверный формат данных", 400);
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  const success = deleteCar(params.id);
  if (!success) {
    return jsonError("Автомобиль не найден", 404);
  }
  return jsonSuccess({ success: true });
}
