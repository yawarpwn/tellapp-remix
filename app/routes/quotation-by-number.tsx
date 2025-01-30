import { fetchQuotaitonByNumber } from "@/lib/data";
import type { Route } from "./+types/quotation-by-number";
import ViewQuotation from "@/quotations/view-quotation";
import { QuotationSkeleton } from "@/components/skeletons/quotations";

import React from "react";

export async function loader({ params }: Route.LoaderArgs) {
  return fetchQuotaitonByNumber(+params.number);
}

export async function clientLoader({ serverLoader }: Route.ClientLoaderArgs) {
  const quotation = await serverLoader();
  console.log("client", quotation);
  return { quotation };
}

export function HydrateFallback() {
  return <QuotationSkeleton />; // (2)
}

clientLoader.hydrate = true as const; // (3)

export default function QuotationByNumber({
  loaderData,
}: Route.ComponentProps) {
  const { quotation } = loaderData;
  return (
    <div>
      <ViewQuotation quotation={quotation} />;
    </div>
  );
}
