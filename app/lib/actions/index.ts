import { fetchQuotaitonByNumber } from "@/lib/data";
import { BASE_URL } from "@/lib/constants";

export async function deleteQuotationAction(quotationNumber: number) {
  const url = `${BASE_URL}/api/quotations/${quotationNumber}`;
  const res = await fetch(url, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete quotation");
  return res.json();
}

export async function createQuotationAction(newQuotation: Object) {
  const url = `${BASE_URL}/api/quotations`;
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(newQuotation),
  });

  if (!res.ok) throw new Error("Failed to create quotation");
  return (await res.json()) as { insertedNumber: number };
}

export async function duplicateQuotationAction(quotationNumber: number) {
  const quotation = await fetchQuotaitonByNumber(quotationNumber);
  const createdQuotation = await createQuotationAction(quotation);

  if (!createdQuotation) throw new Error("Failed to duplicate quotation");

  return { number: createdQuotation.insertedNumber };
}
