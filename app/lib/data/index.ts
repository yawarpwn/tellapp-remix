import { BASE_URL } from "../constants";

import type { DataResponse, QuotationClient, Customer, Product } from "@/types";

export async function fetchQuotations(): Promise<QuotationClient[]> {
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  // console.log("resolved");
  const res = await fetch(`${BASE_URL}/api/quotations`);
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

export async function fetchCustomers() {
  const url = `${BASE_URL}/api/customers`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch customers");
    const data = (await res.json()) as DataResponse<Customer>;
    return data.items;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function fetchProducts() {
  const url = `${BASE_URL}/api/products`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch products");
    const data = (await res.json()) as DataResponse<Product>;
    return data.items;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function fetchCustomerByRuc(ruc: string) {
  if (ruc.length !== 11) {
    console.log("ruc must have 11 characters");
    return null;
  }
  const customer = {
    ruc: "20610555536",
    name: "TELL SENALES  SOCIEDAD ANONIMA CERRADa",
    address: "Maquinaria 325 - Callao",
  };

  setTimeout(() => console.log("resolved"), 1000);

  return new Promise((resolve) => {
    resolve(customer);
  });
}
