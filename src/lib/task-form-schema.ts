import { z } from "zod";

export const taskFormSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Name must be 2 or more characters long." })
    .max(25, { message: "Name must be 25 characters or fewer." })
    .regex(/^(?!\s*$).+/, { message: "Name cannot be just spaces" }),
  status: z.enum(["pending", "completed"], {
    message: "Invalid status. Please select one of : 'pending' or 'completed'.",
  }),
  description: z
    .string()
    .min(2, { message: "Description must be 2 or more characters long." })
    .max(100, { message: "Description must be 100 characters or fewer." })
    .regex(/^(?!\s*$).+/, { message: "Description cannot be just spaces" }),
});

export type TaskFormType = z.infer<typeof taskFormSchema>;

export const taskInitialValues: TaskFormType = {
  title: "",
  status: "pending",
  description: "",
};
