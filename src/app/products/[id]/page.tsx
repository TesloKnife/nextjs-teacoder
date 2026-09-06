import { cacheLife } from "next/cache";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const res = await fetch("https://dummyjson.com/products");

  const data = await res.json();

  return data.products.map((product: any) => ({
    id: product.id.toString(),
  }));
}

async function fetchProducts(id: string) {
  "use cache";
  cacheLife("days");

  const res = await fetch(`https://dummyjson.com/products/${id}`);

  if (!res.ok) {
    notFound();
  }

  const data = await res.json();

  return data;
}

async function ProductDetails({ params }: PageProps) {
  const { id } = await params;

  const product = await fetchProducts(id);

  return (
    <div className="p-8 max-w-2xl mx-auto bg-gray-900 border border-gray-800 rounded-2xl mt-10">
      <h1 className="text-3xl font-bold text-white mt-2">{product.title}</h1>
      <p className="text-gray-400 mt-4">{product.description}</p>
      <div className="text-2xl font-mono text-white mt-6">${product.price}</div>
    </div>
  );
}

export default function ProductPage({ params }: PageProps) {
  return (
    <Suspense fallback={<div className="p-8 text-white">Загрузка...</div>}>
      <ProductDetails params={params} />
    </Suspense>
  );
}
