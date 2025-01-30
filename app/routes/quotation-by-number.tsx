import { fetchQuotaitonByNumber } from "@/lib/data";
import type { Route } from "./+types/quotation-by-number";
import ViewQuotation from "@/quotations/view-quotation";
import { QuotationSkeleton } from "@/components/skeletons/quotations";

import React from "react";

export async function loader({ params }: Route.LoaderArgs) {
  return await fetchQuotaitonByNumber(+params.number);
}

export async function clientLoader({ serverLoader }: Route.ClientLoaderArgs) {
  const quotation = await serverLoader();
  return { quotation };
}

export function HydrateFallback() {
  console.log("hydrateFallback");
  return <p>Skeleton rendered during SSR</p>; // (2)
}

export default function QuotationByNumber({
  loaderData,
}: Route.ComponentProps) {
  const { quotation } = loaderData;
  console.log(quotation);
  // const { quotationPromise } = loaderData;
  return (
    <div>
      MUUU
      {/* <React.Suspense fallback={<QuotationSkeleton />}> */}
      {/*   <h1>noo meee</h1> */}
      {/*   <ViewQuotation quotationPromise={quotationPromise} />; */}
      {/* </React.Suspense> */}
    </div>
  );
}
