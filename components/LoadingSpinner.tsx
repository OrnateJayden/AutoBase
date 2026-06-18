export default function LoadingSpinner({ text = "Загрузка..." }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-4 border-gray-700 rounded-full" />
        <div className="absolute inset-0 border-4 border-accent-red border-t-transparent rounded-full animate-spin" />
      </div>
      <p className="text-gray-400 text-sm">{text}</p>
    </div>
  );
}
