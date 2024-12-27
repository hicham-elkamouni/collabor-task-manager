export interface PaginationResponse<T> {
  first: number;
  prev: number;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: T;
}

export interface Task {
  id?: string | number;
  title: string;
  description: string;
  status: "pending" | "completed";
}
