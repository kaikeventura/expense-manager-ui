export interface InvoiceReference {
  referenceMonth: string;
  state: string;
}

export interface InvoiceResponse {
  referenceMonth: string;
  totalValue: number;
  state: string;
  statements: StatementResponse[];
}

export interface StatementResponse {
  code: string;
  description: string;
  category: string;
  value: number;
  type: string;
  createdAt: string;
}
