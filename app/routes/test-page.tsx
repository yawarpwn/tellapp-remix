import type { Route } from "./+types/test-page";
import { BASE_URL } from "@/lib/constants";

export async function loader() {
  const url = `${BASE_URL}/api/quotations`;
  try {
    const data = await fetch(url).then(async (res) => {
      if (!res.ok) {
        const errorText = await res.text();
        console.error(`Error en petición: ${res.status} - ${errorText}`);
        throw new Error(`Error en petición: ${res.status} - ${errorText}`);
      }
      return res.json();
    });
    return {
      quotations: data.items,
    };
  } catch (err) {
    console.error("Error en loader:", err);
    throw new Response("Error loading quotations", { status: 500 });
  }
}

export default function testPage({ loaderData }: Route.ComponentProps) {
  const { quotations } = loaderData;
  return (
    <div>
      <pre>{JSON.stringify(quotations, null, 2)}</pre>
    </div>
  );
}
