export interface Transaction {
  id: number;
  type: "income" | "expense";
  amount: number;
  category: string;
  note: string;
  date: string;
}

export interface User {
  id: number;
  username: string;
  password: string;
}
