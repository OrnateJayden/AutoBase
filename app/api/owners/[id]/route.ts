import { NextRequest } from "next/server";
import {
  getOwnerById,
  getCarsByOwnerId,
  updateOwner,
  deleteOwner,
} from "@/lib/store";
import {
  formatZodErrors,
  jsonError,
  jsonSuccess,
} from "@/lib/api-utils";
import { ownerSchema } from "@/lib/validators";

interface RouteParams {
  params: { id: string };
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  const owner = getOwnerById(params.id);
  if (!owner) {
    return jsonError("Владелец не найден", 404);
  }
  const cars = getCarsByOwnerId(params.id);
  return jsonSuccess({ ...owner, cars });
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const owner = getOwnerById(params.id);
  if (!owner) {
    return jsonError("Владелец не найден", 404);
  }
  try {
    const body = await request.json();
    const parsed = ownerSchema.partial().safeParse(body);
    if (!parsed.success) {
      return jsonError("Ошибка валидации", 400, formatZodErrors(parsed.error));
    }
    const updated = updateOwner(params.id, parsed.data);
    return jsonSuccess(updated);
  } catch {
    return jsonError("Неверный формат данных", 400);
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  const success = deleteOwner(params.id);
  if (!success) {
    return jsonError("Владелец не найден", 404);
  }
  return jsonSuccess({ success: true });
}
