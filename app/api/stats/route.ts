import { getOwnerCount, getCarCount } from "@/lib/store";
import { jsonSuccess } from "@/lib/api-utils";

export async function GET() {
  return jsonSuccess({
    owners: getOwnerCount(),
    cars: getCarCount(),
  });
}
