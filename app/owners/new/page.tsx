import OwnerForm from "@/components/OwnerForm";

export default function NewOwnerPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="page-title">Новый владелец</h1>
      <p className="page-subtitle">Добавление нового владельца в каталог</p>
      <OwnerForm mode="create" />
    </div>
  );
}
