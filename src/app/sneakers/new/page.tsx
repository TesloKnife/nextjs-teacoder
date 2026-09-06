"use client";

import { createSneakerDrop } from "@/actions/sneaker";
import { useAction } from "next-safe-action/hooks";

export default function NewDropPage() {
  const { execute, isPending, result } = useAction(createSneakerDrop);
  const mockSneaker = {
    title: "Air Kordan 1 High Mock",
    price: 180,
    stock: 5,
  };

  const handleTriggerDrop = async () => {
    execute(mockSneaker);
  };

  return (
    <main className="p-5">
      <h2>Тестирование Server Action</h2>
      <p>
        Товар для отправки: {mockSneaker.title} (${mockSneaker.price})
      </p>

      <button onClick={handleTriggerDrop} disabled={isPending}>
        {isPending ? "Отправка на сервер..." : "Отправить данные на сервер"}
      </button>
      <div className="mt-5">
        {result.serverError && (
          <p className="text-red-500">Ошибка бэкэнда: {result.serverError}</p>
        )}

        {result.validationErrors && (
          <p className="text-orange-500">
            Ошибка валидации контракта: Проверьте введенные типы данных
          </p>
        )}

        {result.data?.success && (
          <p className="text-emerald-500">
            Успешно создано! ID в базе: {result.data.product.id}
          </p>
        )}
      </div>
    </main>
  );
}
