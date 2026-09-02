import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { EditableColumnTitle } from "@/components/EditableColumnTitle";

describe("EditableColumnTitle", () => {
  it("renders title as button", () => {
    render(<EditableColumnTitle title="Backlog" onSave={vi.fn()} />);
    expect(screen.getByTestId("column-title")).toHaveTextContent("Backlog");
  });

  it("enters edit mode on click", () => {
    render(<EditableColumnTitle title="Backlog" onSave={vi.fn()} />);
    fireEvent.click(screen.getByTestId("column-title"));
    expect(screen.getByTestId("column-title-input")).toBeInTheDocument();
  });

  it("saves on Enter", () => {
    const onSave = vi.fn();
    render(<EditableColumnTitle title="Backlog" onSave={onSave} />);
    fireEvent.click(screen.getByTestId("column-title"));
    const input = screen.getByTestId("column-title-input");
    fireEvent.change(input, { target: { value: "Ideas" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onSave).toHaveBeenCalledWith("Ideas");
  });

  it("cancels on Escape", () => {
    const onSave = vi.fn();
    render(<EditableColumnTitle title="Backlog" onSave={onSave} />);
    fireEvent.click(screen.getByTestId("column-title"));
    const input = screen.getByTestId("column-title-input");
    fireEvent.change(input, { target: { value: "Ideas" } });
    fireEvent.keyDown(input, { key: "Escape" });
    expect(onSave).not.toHaveBeenCalled();
    expect(screen.getByTestId("column-title")).toHaveTextContent("Backlog");
  });
});
