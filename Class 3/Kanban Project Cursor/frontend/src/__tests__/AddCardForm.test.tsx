import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AddCardForm } from "@/components/AddCardForm";

describe("AddCardForm", () => {
  it("shows toggle button when collapsed", () => {
    render(<AddCardForm columnId="col-todo" onAdd={vi.fn()} />);
    expect(screen.getByTestId("add-card-toggle-col-todo")).toBeInTheDocument();
  });

  it("expands form on toggle click", () => {
    render(<AddCardForm columnId="col-todo" onAdd={vi.fn()} />);
    fireEvent.click(screen.getByTestId("add-card-toggle-col-todo"));
    expect(screen.getByTestId("add-card-form-col-todo")).toBeInTheDocument();
  });

  it("submits card with title and details", () => {
    const onAdd = vi.fn();
    render(<AddCardForm columnId="col-todo" onAdd={onAdd} />);
    fireEvent.click(screen.getByTestId("add-card-toggle-col-todo"));
    fireEvent.change(screen.getByTestId("add-card-title-col-todo"), {
      target: { value: "New task" },
    });
    fireEvent.change(screen.getByTestId("add-card-details-col-todo"), {
      target: { value: "Task details" },
    });
    fireEvent.click(screen.getByTestId("add-card-submit-col-todo"));
    expect(onAdd).toHaveBeenCalledWith("col-todo", "New task", "Task details");
  });

  it("does not submit with empty title", () => {
    const onAdd = vi.fn();
    render(<AddCardForm columnId="col-todo" onAdd={onAdd} />);
    fireEvent.click(screen.getByTestId("add-card-toggle-col-todo"));
    fireEvent.click(screen.getByTestId("add-card-submit-col-todo"));
    expect(onAdd).not.toHaveBeenCalled();
  });

  it("cancels and collapses form", () => {
    render(<AddCardForm columnId="col-todo" onAdd={vi.fn()} />);
    fireEvent.click(screen.getByTestId("add-card-toggle-col-todo"));
    fireEvent.click(screen.getByTestId("add-card-cancel-col-todo"));
    expect(screen.getByTestId("add-card-toggle-col-todo")).toBeInTheDocument();
  });
});
