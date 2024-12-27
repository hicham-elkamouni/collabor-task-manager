import { render, screen, fireEvent } from "@testing-library/react";
import { vi, Mock } from "vitest";
import Table from "@components/table/table";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { useDeleteTask } from "@hooks/use-mutation-tasks";
import { Task } from "../types/task";

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));

vi.mock("@hooks/use-mutation-tasks", () => ({
  useDeleteTask: vi.fn(() => ({ mutate: vi.fn() })),
  useUpdateTask: vi.fn(() => ({ mutate: vi.fn() })),
}));

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, unknown>;
  return {
    ...actual,
    MemoryRouter: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    useNavigate: vi.fn(),
  };
});

describe("Table Component", () => {
  const mockTasks: Task[] = [
    {
      id: "1",
      title: "Task 1",
      status: "pending",
      description: "Description 1",
    },
    {
      id: "2",
      title: "Task 2",
      status: "completed",
      description: "Description 1",
    },
  ];
  const mockNavigate = vi.fn();

  beforeEach(() => {
    mockNavigate.mockClear();
    (useDeleteTask as Mock).mockClear();
  });

  it("renders table rows based on tasks prop", () => {
    render(
      <MemoryRouter>
        <Table tasks={mockTasks} children={<></>} />
      </MemoryRouter>
    );

    expect(screen.getByText("Task 1")).toBeDefined();
    expect(screen.getByText("Task 2")).toBeDefined();

    expect(screen.getByText("completed")).toBeDefined();
    expect(screen.getByText("pending")).toBeDefined();
  });

  it("should call navigate when the Edit button is clicked", () => {
    const mockNavigate = vi.fn();
    (useNavigate as Mock).mockReturnValue(mockNavigate);

    render(<Table tasks={mockTasks} children={<></>} />);

    fireEvent.click(screen.getAllByText("Edit")[0]);

    expect(mockNavigate).toHaveBeenCalledWith("/tasks/1");
  });

  it("should call deleteTask.mutate when the Delete button is clicked", () => {
    const mockDeleteTask = vi.fn();
    (useDeleteTask as Mock).mockReturnValue({ mutate: mockDeleteTask });

    render(<Table tasks={mockTasks} children={<></>} />);

    fireEvent.click(screen.getAllByText("Delete")[0]);

    expect(mockDeleteTask).toHaveBeenCalledWith("1");
  });

  it("should render 'No tasks available' when tasks prop is undefined", () => {
    render(<Table tasks={undefined} children={<></>} />);

    expect(screen.getByText("No tasks available")).toBeDefined();
  });
});
