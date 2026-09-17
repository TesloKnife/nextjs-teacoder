import { products } from "@/db/schema";
import { db } from "@/lib/db";

// export const dynamic = "force-static";

// export const revalidate = 60;

export default async function ProductsListPage() {
  const items = await db.select().from(products).orderBy(products.createdAt);

  return (
    <div>
      {items.map((item, index) => (
        <div key={index} className="flex flex-col gap-3">
          <h2 className="font-semibold text-lg">{item.name}</h2>
          <p>{item.price}</p>
        </div>
      ))}
    </div>
  );
}
