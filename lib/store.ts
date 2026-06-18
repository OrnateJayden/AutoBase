import { Owner, Car } from "@/types";

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

function now(): string {
  return new Date().toISOString();
}

const owners: Owner[] = [
  {
    id: "owner-1",
    firstName: "Иван",
    lastName: "Петров",
    middleName: "Сергеевич",
    phone: "+7 (916) 123-45-67",
    email: "ivan.petrov@mail.ru",
    address: "г. Москва, ул. Ленина, д. 10, кв. 5",
    createdAt: "2024-01-15T10:00:00.000Z",
    updatedAt: "2024-01-15T10:00:00.000Z",
  },
  {
    id: "owner-2",
    firstName: "Мария",
    lastName: "Сидорова",
    middleName: "Александровна",
    phone: "+7 (921) 234-56-78",
    email: "maria.sidorova@gmail.com",
    address: "г. Санкт-Петербург, Невский пр., д. 25",
    createdAt: "2024-02-20T11:30:00.000Z",
    updatedAt: "2024-02-20T11:30:00.000Z",
  },
  {
    id: "owner-3",
    firstName: "Алексей",
    lastName: "Козлов",
    middleName: "Дмитриевич",
    phone: "+7 (903) 345-67-89",
    email: "alex.kozlov@yandex.ru",
    address: "г. Казань, ул. Баумана, д. 7",
    createdAt: "2024-03-10T09:15:00.000Z",
    updatedAt: "2024-03-10T09:15:00.000Z",
  },
  {
    id: "owner-4",
    firstName: "Елена",
    lastName: "Новикова",
    middleName: "Викторовна",
    phone: "+7 (495) 456-78-90",
    email: "elena.novikova@mail.ru",
    address: "г. Москва, ул. Тверская, д. 15",
    createdAt: "2024-04-05T14:00:00.000Z",
    updatedAt: "2024-04-05T14:00:00.000Z",
  },
  {
    id: "owner-5",
    firstName: "Дмитрий",
    lastName: "Волков",
    middleName: "Игоревич",
    phone: "+7 (812) 567-89-01",
    email: "dmitry.volkov@inbox.ru",
    address: "г. Санкт-Петербург, ул. Марата, д. 42",
    createdAt: "2024-05-12T16:45:00.000Z",
    updatedAt: "2024-05-12T16:45:00.000Z",
  },
  {
    id: "owner-6",
    firstName: "Ольга",
    lastName: "Морозова",
    middleName: "Петровна",
    phone: "+7 (843) 678-90-12",
    email: "olga.morozova@gmail.com",
    address: "г. Казань, пр. Победы, д. 100",
    createdAt: "2024-06-01T08:30:00.000Z",
    updatedAt: "2024-06-01T08:30:00.000Z",
  },
];

const cars: Car[] = [
  {
    id: "car-1",
    ownerId: "owner-1",
    brand: "Toyota",
    model: "Camry",
    year: 2020,
    color: "Белый",
    licensePlate: "А123ВЕ777",
    vin: "JTDBR32E504012345",
    createdAt: "2024-01-16T10:00:00.000Z",
    updatedAt: "2024-01-16T10:00:00.000Z",
  },
  {
    id: "car-2",
    ownerId: "owner-1",
    brand: "BMW",
    model: "X5",
    year: 2022,
    color: "Чёрный",
    licensePlate: "К456МН199",
    vin: "WBAFR9C50BC123456",
    createdAt: "2024-01-20T11:00:00.000Z",
    updatedAt: "2024-01-20T11:00:00.000Z",
  },
  {
    id: "car-3",
    ownerId: "owner-2",
    brand: "Mercedes-Benz",
    model: "E-Class",
    year: 2021,
    color: "Серебристый",
    licensePlate: "Е789ОР750",
    vin: "WDDHF8JB5CA123456",
    createdAt: "2024-02-21T12:00:00.000Z",
    updatedAt: "2024-02-21T12:00:00.000Z",
  },
  {
    id: "car-4",
    ownerId: "owner-3",
    brand: "Lada",
    model: "Vesta",
    year: 2023,
    color: "Красный",
    licensePlate: "Т012УХ198",
    vin: "XTA219040S0123456",
    createdAt: "2024-03-11T13:00:00.000Z",
    updatedAt: "2024-03-11T13:00:00.000Z",
  },
  {
    id: "car-5",
    ownerId: "owner-3",
    brand: "Hyundai",
    model: "Solaris",
    year: 2019,
    color: "Синий",
    licensePlate: "Х345ТУ198",
    vin: "Z94CB41AADR123456",
    createdAt: "2024-03-15T14:00:00.000Z",
    updatedAt: "2024-03-15T14:00:00.000Z",
  },
  {
    id: "car-6",
    ownerId: "owner-4",
    brand: "Audi",
    model: "A4",
    year: 2020,
    color: "Серый",
    licensePlate: "М678КС116",
    vin: "WAUZZZ8K9DA123456",
    createdAt: "2024-04-06T15:00:00.000Z",
    updatedAt: "2024-04-06T15:00:00.000Z",
  },
  {
    id: "car-7",
    ownerId: "owner-4",
    brand: "Volkswagen",
    model: "Polo",
    year: 2018,
    color: "Белый",
    licensePlate: "Р901СТ154",
    vin: "WVWZZZ6RZCY123456",
    createdAt: "2024-04-10T16:00:00.000Z",
    updatedAt: "2024-04-10T16:00:00.000Z",
  },
  {
    id: "car-8",
    ownerId: "owner-5",
    brand: "Kia",
    model: "Rio",
    year: 2021,
    color: "Зелёный",
    licensePlate: "У234ХК154",
    vin: "Z94FB41AAMR123456",
    createdAt: "2024-05-13T17:00:00.000Z",
    updatedAt: "2024-05-13T17:00:00.000Z",
  },
  {
    id: "car-9",
    ownerId: "owner-5",
    brand: "Nissan",
    model: "Qashqai",
    year: 2022,
    color: "Чёрный",
    licensePlate: "В567ЕК196",
    vin: "SJNFBAJ11U1234567",
    createdAt: "2024-05-18T18:00:00.000Z",
    updatedAt: "2024-05-18T18:00:00.000Z",
  },
  {
    id: "car-10",
    ownerId: "owner-6",
    brand: "Ford",
    model: "Focus",
    year: 2017,
    color: "Жёлтый",
    licensePlate: "Н890ТУ123",
    vin: "WF0AXXWPMA1234567",
    createdAt: "2024-06-02T19:00:00.000Z",
    updatedAt: "2024-06-02T19:00:00.000Z",
  },
];

export function getAllOwners(): Owner[] {
  return [...owners];
}

export function getOwnerById(id: string): Owner | undefined {
  return owners.find((o) => o.id === id);
}

export function searchOwners(query: string): Owner[] {
  const q = query.toLowerCase().trim();
  if (!q) return getAllOwners();
  return owners.filter(
    (o) =>
      o.firstName.toLowerCase().includes(q) ||
      o.lastName.toLowerCase().includes(q) ||
      (o.middleName && o.middleName.toLowerCase().includes(q)) ||
      o.email.toLowerCase().includes(q) ||
      o.phone.includes(q) ||
      o.address.toLowerCase().includes(q)
  );
}

export function createOwner(
  data: Omit<Owner, "id" | "createdAt" | "updatedAt">
): Owner {
  const owner: Owner = {
    ...data,
    id: generateId(),
    createdAt: now(),
    updatedAt: now(),
  };
  owners.push(owner);
  return owner;
}

export function updateOwner(
  id: string,
  data: Partial<Omit<Owner, "id" | "createdAt" | "updatedAt">>
): Owner | undefined {
  const index = owners.findIndex((o) => o.id === id);
  if (index === -1) return undefined;
  owners[index] = {
    ...owners[index],
    ...data,
    updatedAt: now(),
  };
  return owners[index];
}

export function deleteOwner(id: string): boolean {
  const index = owners.findIndex((o) => o.id === id);
  if (index === -1) return false;
  owners.splice(index, 1);
  const carIndices = cars
    .map((c, i) => (c.ownerId === id ? i : -1))
    .filter((i) => i !== -1)
    .reverse();
  carIndices.forEach((i) => cars.splice(i, 1));
  return true;
}

export function getAllCars(): Car[] {
  return [...cars];
}

export function getCarById(id: string): Car | undefined {
  return cars.find((c) => c.id === id);
}

export function getCarsByOwnerId(ownerId: string): Car[] {
  return cars.filter((c) => c.ownerId === ownerId);
}

export function searchCars(query: string): Car[] {
  const q = query.toLowerCase().trim();
  if (!q) return getAllCars();
  return cars.filter(
    (c) =>
      c.brand.toLowerCase().includes(q) ||
      c.model.toLowerCase().includes(q) ||
      c.color.toLowerCase().includes(q) ||
      c.licensePlate.toLowerCase().includes(q) ||
      c.vin.toLowerCase().includes(q)
  );
}

export function createCar(
  data: Omit<Car, "id" | "createdAt" | "updatedAt">
): Car | null {
  if (!getOwnerById(data.ownerId)) return null;
  const existingPlate = cars.find(
    (c) => c.licensePlate.toUpperCase() === data.licensePlate.toUpperCase()
  );
  if (existingPlate) return null;
  const car: Car = {
    ...data,
    licensePlate: data.licensePlate.toUpperCase(),
    id: generateId(),
    createdAt: now(),
    updatedAt: now(),
  };
  cars.push(car);
  return car;
}

export function updateCar(
  id: string,
  data: Partial<Omit<Car, "id" | "createdAt" | "updatedAt">>
): Car | undefined {
  const index = cars.findIndex((c) => c.id === id);
  if (index === -1) return undefined;
  if (data.ownerId && !getOwnerById(data.ownerId)) return undefined;
  if (data.licensePlate) {
    const existing = cars.find(
      (c) =>
        c.id !== id &&
        c.licensePlate.toUpperCase() === data.licensePlate!.toUpperCase()
    );
    if (existing) return undefined;
    data.licensePlate = data.licensePlate.toUpperCase();
  }
  cars[index] = {
    ...cars[index],
    ...data,
    updatedAt: now(),
  };
  return cars[index];
}

export function deleteCar(id: string): boolean {
  const index = cars.findIndex((c) => c.id === id);
  if (index === -1) return false;
  cars.splice(index, 1);
  return true;
}

export function getOwnerCount(): number {
  return owners.length;
}

export function getCarCount(): number {
  return cars.length;
}
