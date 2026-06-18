import {
  Owner,
  Car,
  OwnerWithCars,
  PaginatedResponse,
  CreateOwnerInput,
  UpdateOwnerInput,
  CreateCarInput,
  UpdateCarInput,
  SearchParams,
  ApiError,
} from "@/types";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error: ApiError = await response.json();
    throw new Error(error.error || "Произошла ошибка");
  }
  return response.json();
}

function buildQuery(params?: SearchParams): string {
  if (!params) return "";
  const query = new URLSearchParams();
  if (params.page) query.set("page", String(params.page));
  if (params.pageSize) query.set("pageSize", String(params.pageSize));
  if (params.search) query.set("search", params.search);
  const str = query.toString();
  return str ? `?${str}` : "";
}

export async function fetchOwners(
  params?: SearchParams
): Promise<PaginatedResponse<Owner>> {
  const response = await fetch(`/api/owners${buildQuery(params)}`);
  return handleResponse<PaginatedResponse<Owner>>(response);
}

export async function fetchOwner(id: string): Promise<OwnerWithCars> {
  const response = await fetch(`/api/owners/${id}`);
  return handleResponse<OwnerWithCars>(response);
}

export async function createOwner(data: CreateOwnerInput): Promise<Owner> {
  const response = await fetch("/api/owners", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<Owner>(response);
}

export async function updateOwner(
  id: string,
  data: UpdateOwnerInput
): Promise<Owner> {
  const response = await fetch(`/api/owners/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<Owner>(response);
}

export async function deleteOwner(id: string): Promise<void> {
  const response = await fetch(`/api/owners/${id}`, { method: "DELETE" });
  await handleResponse<{ success: boolean }>(response);
}

export async function fetchCars(
  params?: SearchParams
): Promise<PaginatedResponse<Car>> {
  const response = await fetch(`/api/cars${buildQuery(params)}`);
  return handleResponse<PaginatedResponse<Car>>(response);
}

export async function fetchCar(id: string): Promise<Car> {
  const response = await fetch(`/api/cars/${id}`);
  return handleResponse<Car>(response);
}

export async function createCar(data: CreateCarInput): Promise<Car> {
  const response = await fetch("/api/cars", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<Car>(response);
}

export async function updateCar(
  id: string,
  data: UpdateCarInput
): Promise<Car> {
  const response = await fetch(`/api/cars/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<Car>(response);
}

export async function deleteCar(id: string): Promise<void> {
  const response = await fetch(`/api/cars/${id}`, { method: "DELETE" });
  await handleResponse<{ success: boolean }>(response);
}

export async function fetchStats(): Promise<{
  owners: number;
  cars: number;
}> {
  const response = await fetch("/api/stats");
  return handleResponse<{ owners: number; cars: number }>(response);
}
