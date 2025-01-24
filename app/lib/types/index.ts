export interface QuotationClient {
  id: string;
  number: number;
  deadline: number;
  credit: number;
  includeIgv: boolean;
  isPaymentPending: boolean;
  items: QuotationItem[];
  createdAt: Date;
  updatedAt: Date;
  customer: Customer;
  customerId?: string | null;
}

export interface Customer {
  id: string;
  name: string;
  ruc: string;
  phone: null;
  address: null;
  email: null;
  isRegular: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface QuotationItem {
  id: string;
  description: string;
  price: number;
  cost: number;
  link: string;
  qty: number;
  code: string;
  unitSize: string;
}
