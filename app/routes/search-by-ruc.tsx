import { fetchCustomerByRuc } from "@/lib/data";
import type { Route } from "./+types/search-by-ruc";

export async function action({ context, params, request }: Route.ActionArgs) {
  console.log("action search-by-ruc");
  const formData = await request.formData();
  const ruc = formData.get("ruc") as string;
  const customer = await fetchCustomerByRuc(ruc);
  console.log(customer);
  return {
    customer,
  };
}
