import { TaskFormType } from "@lib/task-form-schema";
import { Controller } from "react-hook-form";

export const FormField = ({
  label,
  name,
  control,
  placeholder,
  type = "text",
  error,
}: {
  label: string;
  name: keyof TaskFormType;
  control: any;
  placeholder: string;
  type?: string;
  error?: string;
}) => (
  <div className="task-form__input">
    <label htmlFor={name} className="task-form__label">
      {label}
    </label>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <input
          {...field}
          id={name}
          type={type}
          className={`task-form__input ${
            error ? "task-form__input--error" : ""
          }`}
          placeholder={placeholder}
          aria-invalid={!!error}
        />
      )}
    />
    {error && <ErrorMessage message={error} />}
  </div>
);

const ErrorMessage = ({ message }: { message?: string }) => (
  <p className="task-form__error">{message}</p>
);
