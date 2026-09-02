import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { KanbanCardContent } from "@/components/KanbanCardContent";

const testCard = {
  id: "card-test",
  title: "Test Card",
  details: "Test details here",
};

describe("KanbanCardContent", () => {
  it("renders title and details", () => {
    render(<KanbanCardContent card={testCard} onDelete={vi.fn()} />);
    expect(screen.getByText("Test Card")).toBeInTheDocument();
    expect(screen.getByText("Test details here")).toBeInTheDocument();
  });

  it("calls onDelete when delete clicked", () => {
    const onDelete = vi.fn();
    render(<KanbanCardContent card={testCard} onDelete={onDelete} />);
    fireEvent.click(screen.getByTestId("delete-card-card-test"));
    expect(onDelete).toHaveBeenCalledWith("card-test");
  });
});
