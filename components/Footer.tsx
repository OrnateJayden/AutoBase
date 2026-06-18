import { APP_NAME } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-navy-dark border-t border-gray-700/50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">
              <span className="text-white">AUTO</span>
              <span className="text-accent-yellow mx-1">★</span>
              <span className="text-accent-red">BASE</span>
            </span>
          </div>
          <p className="text-sm text-gray-500">
            {APP_NAME} — Учебный проект Fullstack Next.js (вариант B)
          </p>
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Все права защищены
          </p>
        </div>
      </div>
    </footer>
  );
}
