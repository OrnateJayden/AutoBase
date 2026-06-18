import { NextRequest } from "next/server";
import {
  getAllCars,
  searchCars,
  createCar,
  getOwnerById,
} from "@/lib/store";
import {
  paginate,
  formatZodErrors,
  jsonError,
  jsonSuccess,
  parseSearchParams,
} from "@/lib/api-utils";
import { carSchema } from "@/lib/validators";

export async function GET(request: NextRequest) {
  const { page, pageSize, search } = parseSearchParams(
    request.nextUrl.searchParams
  );
  const items = search ? searchCars(search) : getAllCars();
  const result = paginate(items, page, pageSize);
  return jsonSuccess(result);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = carSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError("Ошибка валидации", 400, formatZodErrors(parsed.error));
    }
    if (!getOwnerById(parsed.data.ownerId)) {
      return jsonError("Владелец не найден", 404);
    }
    const car = createCar(parsed.data);
    if (!car) {
      return jsonError("Автомобиль с таким госномером уже существует", 409);
    }
    return jsonSuccess(car, 201);
  } catch {
    return jsonError("Неверный формат данных", 400);
  }
}
