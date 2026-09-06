"use client";

import { createSneakerDrop } from "@/actions/sneaker";

export default function NewDropPage() {
  const mockSneaker = {
    title: "Air Kordan 1 High Mock",
    price: 180,
    stock: 5,
  };

  const handleTriggerDrop = async () => {
    const result = await createSneakerDrop(mockSneaker);

    if (result.success) {
      alert(`Товар успешно создан. ID: ${result.data.id}`);
    } else {
      alert(`Ошибка: ${result.error}`);
    }
  };

  return (
    <main className="p-5">
      <h2>Тестирование Server Action</h2>
      <p>
        Товар для отправки: {mockSneaker.title} (${mockSneaker.price})
      </p>

      <button onClick={handleTriggerDrop}>Отправить данные на сервер</button>
    </main>
  );
}
