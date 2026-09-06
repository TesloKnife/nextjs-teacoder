"use server";

interface NewSneakerInput {
  title: string;
  price: number;
  stock: number;
}

export async function createSneakerDrop(payload: NewSneakerInput) {
  console.log(`Payload: ${payload}`);

  try {
    const res = await fetch("https://dummyjson.com/products/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...payload,
        category: "mens-shoes",
      }),
    });

    if (!res.ok) {
      throw new Error("Не удалось создать товар");
    }

    const data = await res.json();

    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message || "Internal server error" };
  }
}
