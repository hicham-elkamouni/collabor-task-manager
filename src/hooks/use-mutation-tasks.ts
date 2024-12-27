import { addTask, deleteTask, updateTask } from "@api/mutations";
import { getCurrentPage } from "@lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const QUERY_KEYS = {
  tasks: "tasks",
  task: (id: string) => ["task", id],
};

export const useAddTask = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.tasks] });
      navigate("/tasks");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.tasks] });
    },
  });
};

export const useUpdateTask = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const currentPage = getCurrentPage();

  return useMutation({
    mutationFn: updateTask,
    onSuccess: async () => {
      navigate("/tasks");
    },
    onSettled: async (_, __, updatedTask) => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.tasks] });
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.task, updatedTask.id],
      });
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.tasks, currentPage],
      });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.tasks] });
    },
  });
};
