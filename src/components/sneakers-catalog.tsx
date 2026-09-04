import { handlePurchaseNotif } from "@/actions";
import { useRouter } from "next/navigation";

async function getSpecsCatalog() {
  const res = await fetch(
    "https://dummyjson.com/products/category/mens-shoes",
    {
      next: { tags: ["sneakers-data"] },
    },
  );

  if (!res.ok) throw new Error("Ошибка сети");

  const data = await res.json();

  return data.products;
}

export async function SneakerCatalog() {
  const products = await getSpecsCatalog();

  return (
    <section>
      <h2>Доступный каталог обуви</h2>
      <ul>
        {products.map((item: any) => (
          <li key={item.id}>
            {item.title} = <strong>Осталось - {item.stock} шт.</strong>
          </li>
        ))}
      </ul>
    </section>
  );
}

function BuyButton() {
  const rouser = useRouter();

  const handleBuy = async () => {
    await handlePurchaseNotif("1");

    rouser.refresh();
  };
}
