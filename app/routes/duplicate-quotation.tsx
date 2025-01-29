import { duplicateQuotationAction } from "@/lib/actions";
import type { Route } from "./+types/duplicate-quotation";
import { redirect } from "react-router";

export async function action({ params }: Route.ActionArgs) {
  try {
    const createdQuotation = await duplicateQuotationAction(+params.number);
    return redirect("/quotations/" + createdQuotation.number);
  } catch (error) {
    return new Response("Error duplicating quotation", { status: 500 });
  }
}
