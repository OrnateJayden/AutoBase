"use client";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | "...")[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= page - 1 && i <= page + 1)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="px-3 py-2 text-sm bg-navy-light border border-gray-600 rounded-lg
                   text-gray-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed
                   transition-colors"
      >
        ←
      </button>

      {pages.map((p, idx) =>
        p === "..." ? (
          <span key={`dots-${idx}`} className="px-2 text-gray-500">…</span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`px-3 py-2 text-sm rounded-lg transition-colors ${
              p === page
                ? "bg-accent-red text-white font-semibold"
                : "bg-navy-light border border-gray-600 text-gray-300 hover:text-white"
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className="px-3 py-2 text-sm bg-navy-light border border-gray-600 rounded-lg
                   text-gray-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed
                   transition-colors"
      >
        →
      </button>
    </div>
  );
}
