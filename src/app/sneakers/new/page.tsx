"use client";

import { createSneakerDrop } from "@/actions/sneaker";
import { SubmitButton } from "@/components/submit-button";
import { useActionState } from "react";

type FormState = {
  success: boolean;
  productId: string | null;
  error: string | null;
  validationErrors: {
    title?: string[];
    price?: string[];
    stock?: string[];
  };
};

const initialState: FormState = {
  success: false,
  productId: null,
  error: null,
  validationErrors: {},
};

export default function NewDropPage() {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    async (prevState, formData) => {
      const rawTitle = formData.get("title") as string;
      const rawPrice = Number(formData.get("price"));
      const rawStock = Number(formData.get("stock"));

      const result = await createSneakerDrop({
        title: rawTitle,
        price: rawPrice,
        stock: rawStock,
      });

      // Если zod вернул ошибку валидации
      if (result?.validationErrors) {
        return {
          success: false,
          productId: null,
          error: null,
          validationErrors: {
            title: result.validationErrors.title?._errors,
            price: result.validationErrors.price?._errors,
            stock: result.validationErrors.stock?._errors,
          },
        };
      }

      // Если ошибка сервера.
      if (result?.serverError) {
        return {
          success: false,
          productId: null,
          error: result.serverError,
          validationErrors: {},
        };
      }

      // Если успех
      if (result?.data?.success) {
        return {
          success: true,
          productId: result.data.productId,
          error: null,
          validationErrors: {},
        };
      }

      return prevState;
    },
    initialState,
  );

  return (
    <main className="p-5">
      <h2>Тестирование Server Action</h2>
      <form action={formAction} className="flex flex-col gap-4">
        <div>
          <label htmlFor="title" className="block mb-1 text-sm font-medium">
            Название модели
          </label>
          <input
            type="text"
            id="title"
            name="title"
            disabled={isPending}
            className="w-full border rounded px-3 py-2 disabled:opacity-50"
          />
          {state.validationErrors.title && (
            <span className="text-red-500 text-xs">
              {state.validationErrors.title.join(", ")}
            </span>
          )}
        </div>

        <div>
          <label htmlFor="price" className="block mb-1 text-sm font-medium">
            Цена ($):
          </label>
          <input
            type="number"
            id="price"
            name="price"
            disabled={isPending}
            className="w-full border rounded px-3 py-2 disabled:opacity-50"
          />
          {state.validationErrors.price && (
            <span className="text-red-500 text-xs">
              {state.validationErrors.price.join(", ")}
            </span>
          )}
        </div>

        <div>
          <label htmlFor="title" className="block mb-1 text-sm font-medium">
            Количество (Stock):
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            disabled={isPending}
            className="w-full border rounded px-3 py-2 disabled:opacity-50"
          />
          {state.validationErrors.stock && (
            <span className="text-red-500 text-xs">
              {state.validationErrors.stock.join(", ")}
            </span>
          )}
        </div>

        <SubmitButton />
      </form>

      {state.error && (
        <div className="text-red-500 mt-4 p-3 border border-red-500 rounded">
          {state.error}
        </div>
      )}

      {state.success && (
        <div className="text-green-500 mt-4 p-3 border border-green-500 roundend">
          Дроп создан! ID товара: {state.productId}
        </div>
      )}
    </main>
  );
}
