import type { Route } from "./+types/test-page";
import { BASE_URL } from "@/lib/constants";

export async function loader() {
  const url = `${BASE_URL}/api/customers`;
  try {
    const data = await fetch(url).then((res) => {
      console.log(url);
      console.log(JSON.stringify(res));
      if (!res.ok) throw new Error("Error en peticion");
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
