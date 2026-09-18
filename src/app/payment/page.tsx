// "use client";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment",
};

export default function PaymentPage() {
  console.log("SUPABASE URL: ", process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log("STRIPE SECRET KEY: ", process.env.STRIPE_SECRET_KEY);

  return <div>Payment Form</div>;
}
