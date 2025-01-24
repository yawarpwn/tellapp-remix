import { fetchQuotations } from "@/lib/data";
import type { Route } from "./+types/test";

export async function loader() {
  const quotations = await fetchQuotations();
  return { quotations };
}

export default function testPage({ loaderData }: Route.ComponentProps) {
  const { quotations } = loaderData;
  return (
    <div>
      <pre>{JSON.stringify(quotations, null, 2)}</pre>
    </div>
  );
}
