import { fetchQuotations } from "@/lib/data";
import type { Route } from "./+types/test";
import { BASE_URL } from "@/lib/constants";

export async function loader() {
  try {
    const res = await fetch(`${BASE_URL}/api/quotations`);
    if (!res.ok) throw new Error("Error fetching quotations in server");
    const data = await res.json();
    return {
      quotations: data.items,
    };
  } catch (error) {
    throw new Response("Erorr server", { status: 500 });
  }
}

export default function testPage({ loaderData }: Route.ComponentProps) {
  const { quotations } = loaderData;
  console.log(quotations);
  return (
    <div>
      <pre>{JSON.stringify(quotations, null, 2)}</pre>
    </div>
  );
}
