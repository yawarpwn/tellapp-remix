import { fetchQuotaitonByNumber } from "../data";
import { BASE_URL } from "../constants";

export async function deleteQuotation(id: string) {
  const url = `${BASE_URL}/api/quotations/${id}`;
  const res = await fetch(url, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete quotation");
  return res.json();
}

export async function createQuotation(newQuotation: Object) {
  const url = `${BASE_URL}/api/quotations`;
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(newQuotation),
  });

  if (!res.ok) throw new Error("Failed to create quotation");
  return res.json();
}

export async function duplicateQuotation(quotationNumber: number) {
  const quotation = await fetchQuotaitonByNumber(quotationNumber);
  const createdQuotation = await createQuotation(quotation);

  if (!createdQuotation) throw new Error("Failed to duplicate quotation");

  return { number: createdQuotation.data.insertedNumber };
}
