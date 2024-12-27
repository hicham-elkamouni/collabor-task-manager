import { getTasks, getTask } from "@api/queries";
import { useQuery } from "@tanstack/react-query";

export const useGetTasks = (currentPage: number) => {
  const tasksQuery = useQuery({
    queryKey: ["tasks", currentPage],
    queryFn: () => getTasks(currentPage),
  });
  return tasksQuery;
};

export const useGetTask = (id: string) => {
  const taskQuery = useQuery({
    queryKey: ["task", id],
    queryFn: () => getTask(id),
    enabled: !!id,
  });
  return taskQuery;
};
