import { fetchQuotations } from "@/lib/data";
import type { Route } from "./+types/quotations";
import { DataTable } from "@/components/quotations/data-table";
import { columns } from "@/components/quotations/columns";

export async function loader() {
  try {
    const quotations = await fetchQuotations();
    return { quotations };
  } catch (error) {
    console.log(error);
    return new Response("Error loading quotations", { status: 500 });
  }
}

// export function HydrateFallback() {
//   return <div>Loading...</div>;
// }

export default function QuotationsPage({ loaderData }: Route.ComponentProps) {
  const { quotations } = loaderData;
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={quotations} />
    </div>
  );
}
