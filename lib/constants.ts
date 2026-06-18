export const APP_NAME = "AUTO ★ BASE";
export const APP_DESCRIPTION = "Каталог автомобилей и владельцев";

export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 5;
export const MAX_PAGE_SIZE = 50;

export const RF_PLATE_REGEX =
  /^[АВЕКМНОРСТУХ]\d{3}[АВЕКМНОРСТУХ]{2}\d{2,3}$/u;

export const ALLOWED_PLATE_LETTERS = "АВЕКМНОРСТУХ";

export const CAR_BRANDS = [
  "Toyota",
  "BMW",
  "Mercedes-Benz",
  "Audi",
  "Volkswagen",
  "Lada",
  "Hyundai",
  "Kia",
  "Nissan",
  "Ford",
  "Chevrolet",
  "Mazda",
  "Honda",
  "Renault",
  "Skoda",
] as const;

export const CAR_COLORS = [
  "Белый",
  "Чёрный",
  "Серый",
  "Серебристый",
  "Красный",
  "Синий",
  "Зелёный",
  "Жёлтый",
  "Коричневый",
  "Бежевый",
] as const;

export const NAV_LINKS = [
  { href: "/", label: "Главная" },
  { href: "/owners", label: "Владельцы" },
  { href: "/cars", label: "Автомобили" },
  { href: "/profile", label: "Профиль" },
] as const;
