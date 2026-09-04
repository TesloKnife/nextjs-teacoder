"use server";

import { revalidateTag } from "next/cache";

export async function handlePurchaseNotif(id: string) {
  // Максимальная актуальность данныъ
  revalidateTag(`sneaker-${id}`, { expire: 0 });
  revalidateTag(`sneakers-data`, { expire: 0 });
}
