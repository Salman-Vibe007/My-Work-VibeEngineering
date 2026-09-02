"use client";

import { useState } from "react";

type AddCardFormProps = {
  columnId: string;
  onAdd: (columnId: string, title: string, details: string) => void;
};

export function AddCardForm({ columnId, onAdd }: AddCardFormProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  const reset = () => {
    setTitle("");
    setDetails("");
    setOpen(false);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(columnId, title, details);
    reset();
  };

  if (!open) {
    return (
      <button
        type="button"
        data-testid={`add-card-toggle-${columnId}`}
        className="mt-2 w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-blue-primary transition-colors hover:bg-blue-primary/10"
        onClick={() => setOpen(true)}
      >
        + Add card
      </button>
    );
  }

  return (
    <form
      data-testid={`add-card-form-${columnId}`}
      className="mt-2 space-y-2 rounded-lg bg-white p-3 shadow-sm"
      onSubmit={submit}
    >
      <input
        data-testid={`add-card-title-${columnId}`}
        className="w-full rounded border border-gray-200 px-2 py-1.5 text-sm text-navy outline-none focus:border-blue-primary focus:ring-2 focus:ring-blue-primary/20"
        placeholder="Card title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoFocus
      />
      <textarea
        data-testid={`add-card-details-${columnId}`}
        className="w-full resize-none rounded border border-gray-200 px-2 py-1.5 text-sm text-gray-text outline-none focus:border-blue-primary focus:ring-2 focus:ring-blue-primary/20"
        placeholder="Details (optional)"
        rows={2}
        value={details}
        onChange={(e) => setDetails(e.target.value)}
      />
      <div className="flex gap-2">
        <button
          type="submit"
          data-testid={`add-card-submit-${columnId}`}
          className="rounded bg-purple-secondary px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-purple-secondary/90"
        >
          Add card
        </button>
        <button
          type="button"
          data-testid={`add-card-cancel-${columnId}`}
          className="rounded px-3 py-1.5 text-sm text-gray-text transition-colors hover:bg-gray-100"
          onClick={reset}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
