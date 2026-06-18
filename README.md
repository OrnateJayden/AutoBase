# AUTO ★ BASE

**Каталог автомобилей и владельцев** — учебный Fullstack Next.js проект (вариант B).

## Описание

Веб-приложение для управления каталогом автомобилей и их владельцев. Реализует полный CRUD, поиск, пагинацию, валидацию данных и отображение российских госномеров.

## Технологии

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Zod** (валидация)
- In-memory хранилище (`lib/store.ts`)

## Сущности

### Owner (Владелец)
| Поле | Тип | Описание |
|------|-----|----------|
| id | string | Уникальный идентификатор |
| firstName | string | Имя |
| lastName | string | Фамилия |
| middleName | string? | Отчество |
| phone | string | Телефон |
| email | string | Email |
| address | string | Адрес |

### Car (Автомобиль)
| Поле | Тип | Описание |
|------|-----|----------|
| id | string | Уникальный идентификатор |
| ownerId | string | ID владельца (FK) |
| brand | string | Марка |
| model | string | Модель |
| year | number | Год выпуска |
| color | string | Цвет |
| licensePlate | string | Госномер (формат РФ) |
| vin | string | VIN (17 символов) |

**Связь:** Owner (1) → Car (many). При удалении владельца удаляются все его автомобили.

## Госномера РФ

Формат: `А123ВЕ777` (буква + 3 цифры + 2 буквы + регион 2-3 цифры)

Регулярное выражение:
```
/^[АВЕКМНОРСТУХ]\d{3}[АВЕКМНОРСТУХ]{2}\d{2,3}$/u
```

Допустимые буквы: `АВЕКМНОРСТУХ` (кириллица)

## Seed-данные

- **6 владельцев** (Москва, Санкт-Петербург, Казань)
- **10 автомобилей** с валидными госномерами:
  - А123ВЕ777, К456МН199, Е789ОР750, Т012УХ198, Х345ТУ198
  - М678КС116, Р901СТ154, У234ХК154, В567ЕК196, Н890ТУ123

## Страницы

| Путь | Описание |
|------|----------|
| `/` | Главная (Hero, статистика) |
| `/owners` | Список владельцев (поиск, пагинация) |
| `/owners/new` | Создание владельца |
| `/owners/[id]` | Карточка владельца + его авто |
| `/owners/[id]/edit` | Редактирование владельца |
| `/cars` | Список автомобилей (поиск, пагинация) |
| `/cars/new` | Создание автомобиля |
| `/cars/[id]/edit` | Редактирование автомобиля |
| `/profile` | Профиль системы (статистика) |

## REST API

### Владельцы

| Метод | Endpoint | Описание |
|-------|----------|----------|
| GET | `/api/owners?page=1&pageSize=5&search=` | Список с пагинацией и поиском |
| POST | `/api/owners` | Создание владельца |
| GET | `/api/owners/:id` | Получение владельца + его авто |
| PUT | `/api/owners/:id` | Обновление владельца |
| DELETE | `/api/owners/:id` | Удаление владельца и его авто |

### Автомобили

| Метод | Endpoint | Описание |
|-------|----------|----------|
| GET | `/api/cars?page=1&pageSize=5&search=` | Список с пагинацией и поиском |
| POST | `/api/cars` | Создание автомобиля |
| GET | `/api/cars/:id` | Получение автомобиля |
| PUT | `/api/cars/:id` | Обновление автомобиля |
| DELETE | `/api/cars/:id` | Удаление автомобиля |

### Статистика

| Метод | Endpoint | Описание |
|-------|----------|----------|
| GET | `/api/stats` | Количество владельцев и автомобилей |

## Компоненты

- `Header` — навигация
- `Hero` — главный баннер (4 кнопки btn-primary)
- `Footer` — подвал
- `LoadingSpinner` — индикатор загрузки
- `ErrorMessage` — отображение ошибок
- `Pagination` — пагинация
- `OwnerForm` — форма владельца
- `CarForm` — форма автомобиля
- `OwnersList` — список владельцев
- `LicensePlate` — российский госномер (основная часть + регион + флаг + RUS)

## Библиотеки (lib/)

| Файл | Назначение |
|------|------------|
| `store.ts` | In-memory хранилище с seed-данными |
| `api.ts` | Клиентские fetch-обёртки |
| `api-utils.ts` | Утилиты API (пагинация, ошибки) |
| `validators.ts` | Zod-схемы валидации |
| `constants.ts` | Константы приложения |
| `plate.ts` | Утилиты госномеров |

## Дизайн

- Тёмно-синий фон (navy)
- Красные акценты (accent-red) — кнопки btn-primary
- Жёлтые акценты (accent-yellow) — звезда ★, статистика
- Компонент LicensePlate стилизован под российский номер

## Запуск

### Windows
```bat
start.bat
```

### Вручную
```bash
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000)

## Структура проекта

```
auto-base-new/
├── app/
│   ├── api/
│   │   ├── owners/
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   ├── cars/
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   └── stats/route.ts
│   ├── owners/
│   │   ├── page.tsx
│   │   ├── new/page.tsx
│   │   └── [id]/
│   │       ├── page.tsx
│   │       └── edit/page.tsx
│   ├── cars/
│   │   ├── page.tsx
│   │   ├── new/page.tsx
│   │   └── [id]/edit/page.tsx
│   ├── profile/page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Footer.tsx
│   ├── LoadingSpinner.tsx
│   ├── ErrorMessage.tsx
│   ├── Pagination.tsx
│   ├── OwnerForm.tsx
│   ├── CarForm.tsx
│   ├── OwnersList.tsx
│   └── LicensePlate.tsx
├── lib/
│   ├── store.ts
│   ├── api.ts
│   ├── api-utils.ts
│   ├── validators.ts
│   ├── constants.ts
│   └── plate.ts
├── types/index.ts
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── start.bat
└── README.md
```

## ТЗ (Техническое задание)

### Вариант B — Fullstack Next.js

1. **Сущности:** Owner (1) → Car (many)
2. **Хранилище:** In-memory в `lib/store.ts`
3. **API:** REST через `app/api/` route handlers
4. **CRUD:** Полный для обеих сущностей
5. **Поиск:** По всем текстовым полям
6. **Пагинация:** page + pageSize (по умолчанию 5)
7. **Валидация:** Zod-схемы
8. **Госномера:** Формат РФ с regex-валидацией
9. **UI:** Tailwind CSS, тёмная тема navy/red/yellow
10. **Компонент LicensePlate:** Стилизация под российский номер
