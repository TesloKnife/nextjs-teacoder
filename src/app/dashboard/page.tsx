import { redirect } from "next/navigation";
import { cookies, headers } from "next/headers";

export default async function DashboardPage() {
  //   const cookieStore = await cookies();

  //   const sessionToken = cookieStore.get("session_token")?.value;

  //   if (!sessionToken) {
  //     redirect("/login");
  //   }

  const headersStore = await headers();

  const token = headersStore.get("host");

  return <div>Your token: {token}</div>;
}
