import "@testing-library/jest-dom"; 
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import { render, screen, waitFor } from "@testing-library/react";
import { vi, describe, it, expect, Mock } from "vitest";
import PrincipalPage from "@pages/principal-page";
import { useGetTasks } from "@hooks/use-query-tasks";
import { MemoryRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@lib/constants";

vi.mock("@hooks/use-query-tasks");

afterEach(() => {
  cleanup();
});

describe("PrincipalPage", () => {
  it("should render loading state", () => {
    (useGetTasks as Mock).mockReturnValue({
      data: undefined,
      isError: false,
      isLoading: true,
    });

    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <PrincipalPage />
        </QueryClientProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Loading.../)).toBeInTheDocument();
  });

  it("should render error state", () => {
    (useGetTasks as Mock).mockReturnValue({
      data: undefined,
      isError: true,
      isLoading: false,
    });

    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <PrincipalPage />
        </QueryClientProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Error/)).toBeInTheDocument();
  });

  it("should render tasks in table when data is fetched", async () => {
    const mockTasks = {
      data: [
        { id: "1", title: "Task 1", status: "Completed" },
        { id: "2", title: "Task 2", status: "Pending" },
      ],
      next: null,
      prev: null,
    };

    (useGetTasks as Mock).mockReturnValue({
      data: mockTasks,
      isError: false,
      isLoading: false,
    });

    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <PrincipalPage />
        </QueryClientProvider>
      </MemoryRouter>
    );

    await waitFor(
      () => {
        const task1 = screen.queryByText((content) =>
          content.includes("Task 1")
        );
        const task2 = screen.queryByText((content) =>
          content.includes("Task 2")
        );

        expect(task1).toBeInTheDocument();
        expect(task2).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });
});
