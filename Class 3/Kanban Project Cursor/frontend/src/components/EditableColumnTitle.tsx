"use client";

import { useState, useRef, useEffect } from "react";

type EditableColumnTitleProps = {
  title: string;
  onSave: (title: string) => void;
};

export function EditableColumnTitle({
  title,
  onSave,
}: EditableColumnTitleProps) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(title);
  }, [title]);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  const save = () => {
    const trimmed = value.trim();
    if (trimmed) {
      onSave(trimmed);
    } else {
      setValue(title);
    }
    setEditing(false);
  };

  const cancel = () => {
    setValue(title);
    setEditing(false);
  };

  if (editing) {
    return (
      <input
        ref={inputRef}
        data-testid="column-title-input"
        className="w-full rounded border border-blue-primary bg-white px-2 py-1 text-sm font-semibold text-navy outline-none focus:ring-2 focus:ring-blue-primary/30"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={save}
        onKeyDown={(e) => {
          if (e.key === "Enter") save();
          if (e.key === "Escape") cancel();
        }}
      />
    );
  }

  return (
    <button
      type="button"
      data-testid="column-title"
      className="w-full truncate text-left text-sm font-semibold text-navy hover:text-blue-primary"
      onClick={() => setEditing(true)}
    >
      {title}
    </button>
  );
}
