import { headers } from "next/headers";

interface DashboardPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const currentSort = params.sort === "desc" ? "desc" : "asc";

  return (
    <div>
      Current Page: {currentPage} <br /> Current Sort: {currentSort}
    </div>
  );
}
