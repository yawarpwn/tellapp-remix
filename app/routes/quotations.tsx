import { fetchQuotations } from "@/lib/data";
import type { Route } from "./+types/quotations";
import { DataTable } from "@/quotations/data-table";
import { columns } from "@/quotations/columns";
import { HTTPRequestError } from "@/lib/errors";

export async function loader() {
  try {
    const quotations = await fetchQuotations();
    return { quotations };
  } catch (error) {
    if (error instanceof HTTPRequestError) {
      console.log("HTTPgRequestError: ", error);
    } // rethrow HTTPRequestError

    console.log("Error: ", error);
    throw new Response("Error loading quotations", { status: 500 });
  }
}

// export function HydrateFallback() {
//   return <div>Loading...</div>;
// }

export default function QuotationsPage({ loaderData }: Route.ComponentProps) {
  const { quotations } = loaderData;
  return <DataTable columns={columns} data={quotations} />;
}
