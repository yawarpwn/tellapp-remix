import { BASE_URL } from "@/lib/constants";

import type { DataResponse, QuotationClient, Customer, Product } from "@/types";
import { fetchData } from "@/lib/utils";
import { getCompanybyRuc } from "@/lib/services/sunat";
import { HTTPRequestError } from "@/lib/errors";

export async function fetchQuotations(): Promise<QuotationClient[]> {
  const url = `${BASE_URL}/api/quotations`;
  const data = await fetchData<DataResponse<QuotationClient>>(url);
  return data.items;
}

export async function fetchQuotaitonByNumber(quotationNumber: number) {
  const url = `${BASE_URL}/api/quotations/${quotationNumber}`;
  const data = await fetchData<QuotationClient>(url);
  return data;
}

export async function fetchCustomers(): Promise<Customer[]> {
  const url = `${BASE_URL}/api/customers`;
  const data = await fetchData<DataResponse<Customer>>(url);
  return data.items;
}

export async function fetchProducts(): Promise<Product[]> {
  const url = `${BASE_URL}/api/products`;
  const data = await fetchData<DataResponse<Product>>(url);
  return data.items;
}

type CustomerFromService = {
  id?: string;
  ruc: string;
  name: string;
  address?: string;
};

export async function fetchCustomerByRuc(
  ruc: string
): Promise<CustomerFromService> {
  if (ruc.length !== 11) {
    throw new HTTPRequestError("Ruc must have 11 characters");
  }

  const url = `${BASE_URL}/api/customers/${ruc}`;
  //Search customer in Database
  const customerFromDatabase = await fetchData<Customer>(url);

  if (customerFromDatabase) {
    return {
      id: customerFromDatabase.id,
      ruc: customerFromDatabase.ruc,
      name: customerFromDatabase.name,
      address: customerFromDatabase.address ?? undefined,
    };
  }

  const customerFromSunat = await getCompanybyRuc(ruc);
  return {
    id: undefined,
    ruc: customerFromSunat.ruc,
    name: customerFromSunat.company,
    address: customerFromSunat.address,
  };

  // const customer = {
  //   ruc: "20610555536",
  //   name: "TELL SENALES  SOCIEDAD ANONIMA CERRADa",
  //   address: "Maquinaria 325 - Callao",
  // };
  //
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve(customerFromDatabase);
  //   }, 1000);
  // });
}
