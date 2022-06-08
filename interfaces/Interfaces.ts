export interface NotificationProps {
  color: "success" | "info" | "danger";
  message: string;
}

export interface ExpenseObject {
  id: number;
  name: string;
  startDate: string;
  installmentValue: number;
  installmentAmount: number;
  cardId: number | null;
}

export interface CardObject {
  id: string;
  name: string;
  limit: number;
  expirationDay: number;
  cardNumber: string;
}

export interface FetchOptions {
  method?: "POST" | "DELETE" | "PATCH";
  headers?: {
    "content-type": string;
  };
  body?: string;
}
