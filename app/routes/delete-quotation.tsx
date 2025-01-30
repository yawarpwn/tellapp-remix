import { deleteQuotationAction } from "@/lib/actions";
import type { Route } from "./+types/delete-quotation";
import { redirect } from "react-router";
import { HTTPRequestError } from "@/lib/errors";

export async function action({ params }: Route.ActionArgs) {
  try {
    await deleteQuotationAction(+params.number);
    return redirect("/quotations/");
  } catch (error) {
    if (error instanceof HTTPRequestError) {
      return { error: error.message };
    }

    return {
      error: "Error deleting quotation",
    };
  }
}
