import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  taskFormSchema,
  TaskFormType,
  taskInitialValues,
} from "@lib/task-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "@components/task-form/form-field";
import { Task } from "../../types/task";
import { useParams } from "react-router-dom";
import { useAddTask, useUpdateTask } from "@hooks/use-mutation-tasks";

interface TaskFormProps {
  task: Task | undefined;
}

const TaskForm = ({ task }: TaskFormProps) => {
  const { id: taskId } = useParams();
  const addTask = useAddTask();
  const updateTask = useUpdateTask();
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TaskFormType>({
    mode: "onChange",
    shouldFocusError: false,
    resolver: zodResolver(taskFormSchema),
    defaultValues: taskInitialValues,
  });

  const onSubmit: SubmitHandler<TaskFormType> = (data) => {
    !taskId ? addTask.mutate(data) : updateTask.mutate({ ...data, id: taskId });
  };

  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        description: task.description,
        status: task.status,
      });
    }
  }, [task, reset]);

  return (
    <form className="task-form" onSubmit={handleSubmit(onSubmit)}>
      <FormField
        label="Task Title"
        name="title"
        control={control}
        placeholder="Input Title"
        error={errors.title?.message}
      />
      <FormField
        label="Task Status"
        name="status"
        control={control}
        placeholder="Input Status"
        error={errors.status?.message}
      />
      <FormField
        label="Task Description"
        name="description"
        control={control}
        placeholder="Input Description"
        error={errors.description?.message}
      />

      <button
        type="submit"
        className="task-form__submit-button"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default TaskForm;
