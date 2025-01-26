import type { Route } from "./+types/test-page";
import { BASE_URL } from "@/lib/constants";
import type { LoaderFunction } from "react-router";

export const loader: LoaderFunction = async ({ context, params }) => {
  console.log("context", context);

  return { data: [] };
};

// export async function loader() {
//   const url = `https://api.tellsenales.workers.dev/api/test`;
//   try {
//     const data = await fetch(url).then(async (res) => {
//       if (!res.ok) {
//         const errorText = await res.text();
//         console.error(`Error en petición: ${res.status} - ${errorText}`);
//         throw new Error(`Error en petición: ${res.status} - ${errorText}`);
//       }
//       return res.json();
//     });
//     return {
//       data,
//     };
//   } catch (err) {
//     console.error("Error en loader:", err);
//     throw new Response("Error loading quotations", { status: 500 });
//   }
// }

export default function testPage({ loaderData }: Route.ComponentProps) {
  const { data } = loaderData;
  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
