import axios, { AxiosResponse } from "axios";
import { Task } from "../types/task";
import { BASE_URL } from "@lib/constants";

export const addTask = async (taskPayload: Omit<Task, "id">) => {
  const response: AxiosResponse<Task[]> = await axios.post(
    `${BASE_URL}`,
    taskPayload
  );
  return response.data;
};

export const updateTask = async (task: Task) => {
  const response: AxiosResponse<Task[]> = await axios.put(
    `${BASE_URL}/${task.id}`,
    task
  );
  return response.data;
};

export const deleteTask = async (id: string) => {
  const response: AxiosResponse<Task[]> = await axios.delete(
    `${BASE_URL}/${id}`
  );
  return response.data;
};
