import { BASE_URL } from "../constants";

import type { DataResponse, QuotationClient, Customer, Product } from "@/types";
import { fetchData } from "../utils";
import { getCompanybyRuc } from "../services/sunat";
import { HTTPRequestError } from "../errors";

export async function fetchQuotations(): Promise<QuotationClient[]> {
  const url = `${BASE_URL}/api/quotations`;
  const data = await fetchData<DataResponse<QuotationClient>>(url);
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
    const data = await fetchData<DataResponse<Customer>>(url);
    return data.items;
  } catch (error) {
    if (error instanceof HTTPRequestError) {
      console.log(error);
    }
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

export async function fetchCustomerByRuc(
  ruc: string
): Promise<Customer | null> {
  if (ruc.length !== 11) {
    console.log("ruc must have 11 characters");
    return null;
  }

  const url = `${BASE_URL}/api/customers/${ruc}`;
  //Search customer in Database
  const customerFromDatabase = await fetchData<Customer>(url);

  if (customerFromDatabase) {
    return customerFromDatabase;
  }

  const customerFromSunat = await getCompanybyRuc(ruc);

  const customer = {
    ruc: "20610555536",
    name: "TELL SENALES  SOCIEDAD ANONIMA CERRADa",
    address: "Maquinaria 325 - Callao",
  };

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(customerFromDatabase);
    }, 1000);
  });
}
