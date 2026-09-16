"use server";

import { products } from "@/db/schema";
import { db } from "@/lib/db";
import { actionClient } from "@/lib/safe-action";
import z from "zod";

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
      const [newProduct] = await db
        .insert(products)
        .values({
          name: parsedInput.title,
          price: Math.round(parsedInput.price * 100),
          stock: parsedInput.stock,
        })
        .returning();

      return { success: true, productId: newProduct.id };
    } catch (error: any) {
      throw new Error(error.message || "Не удалось создать товар");
    }
  });
