export interface QuotationClient {
  id: string;
  number: number;
  deadline: number;
  credit: number | null;
  includeIgv: boolean;
  isPaymentPending: boolean;
  items: QuotationItem[];
  createdAt: Date;
  updatedAt: Date;
  customer: Omit<Customer, "createdAt" | "updatedAt">;
  customerId?: string | null;
}

export type CreateQuotationClient = Omit<
  QuotationClient,
  "id" | "number" | "createdAt" | "updatedAt"
>;

export interface Customer {
  id: string;
  name: string;
  ruc: string;
  phone?: string | null;
  address?: string | null;
  email?: string | null;
  isRegular: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  description: string;
  code: string;
  unitSize: string;
  category: string;
  link?: string;
  rank: number;
  price: number;
  cost: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface QuotationItem {
  id: string;
  description: string;
  price: number;
  cost?: number;
  link?: string | null;
  qty: number;
  code: string;
  unitSize: string;
}
export interface DataResponse<T> {
  items: T[];
  meta: Meta;
  links: Links;
}

export interface Links {}

export interface Meta {
  totalItems: number;
}
