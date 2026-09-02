import { describe, it, expect, beforeEach } from "vitest";
import {
  addCard,
  deleteCard,
  moveCard,
  renameColumn,
} from "@/lib/board-actions";
import { initialBoardState } from "@/lib/dummy-data";

describe("renameColumn", () => {
  it("updates the column title", () => {
    const result = renameColumn(initialBoardState, "col-backlog", "Ideas");
    expect(result.columns.find((c) => c.id === "col-backlog")?.title).toBe(
      "Ideas",
    );
  });

  it("does not change other columns", () => {
    const result = renameColumn(initialBoardState, "col-backlog", "Ideas");
    expect(result.columns.find((c) => c.id === "col-todo")?.title).toBe(
      "To Do",
    );
  });

  it("rejects empty title", () => {
    const result = renameColumn(initialBoardState, "col-backlog", "   ");
    expect(result).toBe(initialBoardState);
  });
});

describe("addCard", () => {
  it("adds a card to the correct column", () => {
    const result = addCard(
      initialBoardState,
      "col-todo",
      "New task",
      "Some details",
    );
    const column = result.columns.find((c) => c.id === "col-todo")!;
    const newId = column.cardIds[column.cardIds.length - 1];
    expect(result.cards[newId]).toEqual({
      id: newId,
      title: "New task",
      details: "Some details",
    });
    expect(column.cardIds).toContain(newId);
  });

  it("rejects empty title", () => {
    const result = addCard(initialBoardState, "col-todo", "  ", "details");
    expect(result).toBe(initialBoardState);
  });
});

describe("deleteCard", () => {
  it("removes card from cards and column", () => {
    const result = deleteCard(initialBoardState, "card-1");
    expect(result.cards["card-1"]).toBeUndefined();
    expect(
      result.columns.find((c) => c.id === "col-backlog")?.cardIds,
    ).not.toContain("card-1");
  });

  it("handles deleting last card in column", () => {
    let state = initialBoardState;
    state = deleteCard(state, "card-1");
    state = deleteCard(state, "card-2");
    expect(
      state.columns.find((c) => c.id === "col-backlog")?.cardIds,
    ).toHaveLength(0);
  });

  it("returns unchanged state for unknown card", () => {
    const result = deleteCard(initialBoardState, "card-unknown");
    expect(result).toBe(initialBoardState);
  });
});

describe("moveCard", () => {
  it("reorders within the same column", () => {
    const result = moveCard(initialBoardState, "card-1", "col-backlog", 1);
    const ids = result.columns.find((c) => c.id === "col-backlog")?.cardIds;
    expect(ids).toEqual(["card-2", "card-1"]);
  });

  it("moves card to another column", () => {
    const result = moveCard(initialBoardState, "card-1", "col-todo", 0);
    expect(
      result.columns.find((c) => c.id === "col-backlog")?.cardIds,
    ).not.toContain("card-1");
    expect(
      result.columns.find((c) => c.id === "col-todo")?.cardIds[0],
    ).toBe("card-1");
  });

  it("returns unchanged state for unknown card", () => {
    const result = moveCard(
      initialBoardState,
      "card-unknown",
      "col-todo",
      0,
    );
    expect(result).toBe(initialBoardState);
  });
});
