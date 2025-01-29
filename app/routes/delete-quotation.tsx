import { deleteQuotationAction } from "@/lib/actions";
import type { Route } from "./+types/delete-quotation";
import { redirect } from "react-router";

export async function action({ params }: Route.ActionArgs) {
  console.log(params.number);
  try {
    await deleteQuotationAction(+params.number);
    return redirect("/quotations/");
  } catch (error) {
    return new Response("Error deleting quotation", { status: 500 });
  }
}
