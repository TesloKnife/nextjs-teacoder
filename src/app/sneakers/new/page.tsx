"use client";

import { createSneakerDrop } from "@/actions/sneaker";
import { useActionState } from "react";

type FormState = {
  success: boolean;
  productId: number | null;
  error: string | null;
  validationErrors: {
    title?: string[];
    price?: number[];
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
            price: result.validationErrors.title?._errors,
            stock: result.validationErrors.title?._errors,
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
          validationsErrors: {},
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
      </form>
    </main>
  );
}
