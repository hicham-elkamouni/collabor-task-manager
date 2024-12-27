import axios, { AxiosResponse } from "axios";
import { BASE_URL, PAGE_SIZE } from "@lib/constants";
import { PaginationResponse, Task } from "../types/task";

export const getTasks = async (currentPage: number) => {
  const response: AxiosResponse<PaginationResponse<Task[]>> = await axios.get(
    `${BASE_URL}?_page=${currentPage}&_per_page=${PAGE_SIZE}`
  );
  return response.data;
};

export const getTask = async (id: string) => {
  const response: AxiosResponse<Task> = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};
