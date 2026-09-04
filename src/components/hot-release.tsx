async function getSingleSneaker(id: string) {
  const res = await fetch(`https://dummyjson.com/products/${id}`, {
    next: {
      tags: ["sneakers-data", `sneaker-${id}`],
    },
  });

  if (!res.ok) throw new Error("Товар не найден");

  return res.json();
}

export async function HotRelease({ id }: { id: string }) {
  const item = await getSingleSneaker(id);

  return (
    <section style={{ border: "1px solid #000", padding: "15px" }}>
      <h3>Товар дня</h3>
      <p>Модель: {item.title}</p>
      <p>Цена: ${item.price}</p>
      <p>Актуальный остаток: {item.stock}</p>
    </section>
  );
}
