interface ShopPageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function ShopPage({ params }: ShopPageProps) {
  const { slug } = await params;

  const currentSlug = slug || [];
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
        {!category && (
          <div>
            <h2>Добро пожаловать в магазин</h2>
            <p>Выберите категорию выше, чтобы начать</p>
          </div>
        )}
        {category && (
          <div>
            <p>Active Filter</p>
            <div>
              <p>
                <strong>Category:</strong> {category}
              </p>
              {brand && (
                <p>
                  <strong>Brand:</strong> {brand}
                </p>
              )}
              {model && (
                <p>
                  <strong>Model:</strong> {model}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
      <div>DEBUG: slug_state = {JSON.stringify(currentSlug)}</div>
    </div>
  );
}
