"use server";

import { actionClient } from "@/lib/safe-action";
import z, { success } from "zod";

const CreateSneakerSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Название должно быть не короче 3 символов" })
    .max(50, { message: "Название слишком длинное" }),
  price: z.number().positive({ message: "Цена должна быть болеше нуля" }),
  stock: z
    .number()
    .int({ message: "Количество дожно быть целым числом" })
    .nonnegative({ message: "Количество не может быть отрицательным" }),
});

export const createSneakerDrop = actionClient
  .inputSchema(CreateSneakerSchema)
  .action(async ({ parsedInput }) => {
    console.log(`Payload: ${parsedInput}`);

    try {
      const res = await fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...parsedInput,
          category: "mens-shoes",
        }),
      });

      if (!res.ok) {
        throw new Error("Не удалось создать товар");
      }

      const data = await res.json();

      return { success: true, productId: data.id };
    } catch (error: any) {
      throw new Error(error.message || "Не удалось создать товар");
    }
  });

const ToogleFavoriteSchema = z.object({
  id: z.number(),
});

export const toggleFavorite = actionClient
  .inputSchema(ToogleFavoriteSchema)
  .action(async ({ parsedInput }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (parsedInput.id === 2) {
      throw new Error("Не удалось обновить статус избранного для этой модели");
    }

    return { success: true, id: parsedInput.id };
  });
