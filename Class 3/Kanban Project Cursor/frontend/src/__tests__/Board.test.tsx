import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Board } from "@/components/Board";

describe("Board", () => {
  it("renders dummy data with 5 columns", () => {
    render(<Board />);
    expect(screen.getByTestId("board-columns")).toBeInTheDocument();
    expect(screen.getByText("Backlog")).toBeInTheDocument();
    expect(screen.getByText("To Do")).toBeInTheDocument();
    expect(screen.getByText("In Progress")).toBeInTheDocument();
    expect(screen.getByText("Review")).toBeInTheDocument();
    expect(screen.getByText("Done")).toBeInTheDocument();
  });

  it("adds a card to a column", () => {
    render(<Board />);
    fireEvent.click(screen.getByTestId("add-card-toggle-col-todo"));
    fireEvent.change(screen.getByTestId("add-card-title-col-todo"), {
      target: { value: "Integration test card" },
    });
    fireEvent.click(screen.getByTestId("add-card-submit-col-todo"));
    expect(screen.getByText("Integration test card")).toBeInTheDocument();
  });

  it("deletes a card", () => {
    render(<Board />);
    expect(screen.getByText("Research competitors")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("delete-card-card-1"));
    expect(screen.queryByText("Research competitors")).not.toBeInTheDocument();
  });
});
