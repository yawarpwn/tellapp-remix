import type { Route } from "./+types/test-page";
import { BASE_URL } from "@/lib/constants";

export async function loader() {
  const url = `${BASE_URL}/api/quotations`;
  try {
    const data = await fetch(url).then(async (res) => {
      // res.headers.forEach((h, k) => console.log(k, h));
      if (!res.ok) {
        console.log(await res.text());
        throw new Error("Error en peticion");
      }
      return res.json();
    });
    return {
      quotations: data.items,
    };
  } catch (err) {
    console.log(err);
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
