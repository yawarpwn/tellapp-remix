import { BASE_URL } from "../constants";
import type { QuotationClient } from "../types";

export async function fetchQuotations(): Promise<QuotationClient[]> {
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  // console.log("resolved");
  const res = await fetch(`${BASE_URL}/api/quotations`);
  console.log(res);
  if (!res.ok) throw new Error("Failed to fetch quotations");
  const data = (await res.json()) as { items: QuotationClient[] };
  return data.items;
}

export async function fetchQuotaitonByNumber(quotationNumber: number) {
  const url = `${BASE_URL}/api/quotations/${quotationNumber}`;
  const res = await fetch(`${BASE_URL}/api/quotations/${quotationNumber}`);
  if (!res.ok) throw new Error("Failed to fetch quotations");
  const data = (await res.json()) as QuotationClient;
  return data;
}
