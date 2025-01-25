import { fetchQuotations } from "@/lib/data";
import type { Route } from "./+types/test";
import { BASE_URL } from "@/lib/constants";

export async function loader() {
  try {
    const res = await fetch(`${BASE_URL}/api/quotations`);
    if (!res.ok) throw new Error("Failed to fetch quotations");

    const data = await res.json();
    console.log(data.items);
    return {
      quotations: data.items,
    };
  } catch (error) {
    throw new Response("Erorr server", { status: 404 });
  }
}

export default function testPage({ loaderData }: Route.ComponentProps) {
  const { quotations } = loaderData;
  console.log("quos", quotations);
  return (
    <div>
      <pre>{JSON.stringify(quotations, null, 2)}</pre>
    </div>
  );
}
