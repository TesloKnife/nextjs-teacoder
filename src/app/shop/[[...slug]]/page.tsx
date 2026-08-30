interface ShopPageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function ShopPage({ params }: ShopPageProps) {
  const { slug } = await params;

  const currentSlug = slug || "";
  const [category, brand, model] = currentSlug;

  return (
    <div>
      <header className="mb-10">
        <h1>{category ? `Catalog / ${category}` : "Main Store"}</h1>
        <p>
          {brand ? `Exploring ${brand} collection` : "Browse all our products"}
        </p>
      </header>

        <nav>
          <span>Shop</span>

          {currentSlug.map((segment, index) => (
            <div key={index}>
              <span>/</span>
              <span>{segment}</span>
            </div>
          ))}
        </nav>

        <div>
          <div>
            <span>Category</span>
            <p>{category}</p>
          </div>
          {brand && (
            <div>
              <span>Brand</span>
              <p>{brand}</p>
            </div>
          )}
          {model && (
            <div>
              <span>Model</span>
              <p>{model.replace("-", "")}</p>
            </div>
          )}
        </div>
      </div>
      <p>[DEBUG] Raw segment array: {JSON.stringify(slug)}</p>
    </div>
  );
}
