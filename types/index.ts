export interface Owner {
  id: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  phone: string;
  email: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

export interface Car {
  id: string;
  ownerId: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  licensePlate: string;
  vin: string;
  createdAt: string;
  updatedAt: string;
}

export interface OwnerWithCars extends Owner {
  cars: Car[];
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiError {
  error: string;
  details?: Record<string, string[]>;
}

export interface CreateOwnerInput {
  firstName: string;
  lastName: string;
  middleName?: string;
  phone: string;
  email: string;
  address: string;
}

export interface UpdateOwnerInput extends Partial<CreateOwnerInput> {}

export interface CreateCarInput {
  ownerId: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  licensePlate: string;
  vin: string;
}

export interface UpdateCarInput extends Partial<Omit<CreateCarInput, "ownerId">> {
  ownerId?: string;
}

export interface SearchParams {
  page?: number;
  pageSize?: number;
  search?: string;
}
