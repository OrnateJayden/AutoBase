import { NextRequest } from "next/server";
import {
  getAllOwners,
  searchOwners,
  createOwner,
} from "@/lib/store";
import {
  paginate,
  formatZodErrors,
  jsonError,
  jsonSuccess,
  parseSearchParams,
} from "@/lib/api-utils";
import { ownerSchema } from "@/lib/validators";

export async function GET(request: NextRequest) {
  const { page, pageSize, search } = parseSearchParams(
    request.nextUrl.searchParams
  );
  const items = search ? searchOwners(search) : getAllOwners();
  const result = paginate(items, page, pageSize);
  return jsonSuccess(result);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = ownerSchema.safeParse(body);
    if (!parsed.success) {
      return jsonError("Ошибка валидации", 400, formatZodErrors(parsed.error));
    }
    const owner = createOwner(parsed.data);
    return jsonSuccess(owner, 201);
  } catch {
    return jsonError("Неверный формат данных", 400);
  }
}
