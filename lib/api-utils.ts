import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { PaginatedResponse } from "@/types";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "./constants";

export function paginate<T>(
  items: T[],
  page: number = DEFAULT_PAGE,
  pageSize: number = DEFAULT_PAGE_SIZE
): PaginatedResponse<T> {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;
  const data = items.slice(start, start + pageSize);

  return {
    data,
    total,
    page: safePage,
    pageSize,
    totalPages,
  };
}

export function formatZodErrors(error: ZodError): Record<string, string[]> {
  const details: Record<string, string[]> = {};
  error.errors.forEach((err) => {
    const path = err.path.join(".");
    if (!details[path]) details[path] = [];
    details[path].push(err.message);
  });
  return details;
}

export function jsonError(
  message: string,
  status: number = 400,
  details?: Record<string, string[]>
) {
  return NextResponse.json(
    { error: message, ...(details && { details }) },
    { status }
  );
}

export function jsonSuccess<T>(data: T, status: number = 200) {
  return NextResponse.json(data, { status });
}

export function parseSearchParams(searchParams: URLSearchParams) {
  return {
    page: parseInt(searchParams.get("page") || String(DEFAULT_PAGE), 10),
    pageSize: parseInt(
      searchParams.get("pageSize") || String(DEFAULT_PAGE_SIZE),
      10
    ),
    search: searchParams.get("search") || undefined,
  };
}
