import type { BoardState } from "./types";

export const initialBoardState: BoardState = {
  columns: [
    { id: "col-backlog", title: "Backlog", cardIds: ["card-1", "card-2"] },
    { id: "col-todo", title: "To Do", cardIds: ["card-3", "card-4"] },
    {
      id: "col-in-progress",
      title: "In Progress",
      cardIds: ["card-5", "card-6"],
    },
    { id: "col-review", title: "Review", cardIds: ["card-7", "card-8"] },
    { id: "col-done", title: "Done", cardIds: ["card-9", "card-10"] },
  ],
  cards: {
    "card-1": {
      id: "card-1",
      title: "Research competitors",
      details: "Review top 5 Kanban tools and note UX patterns.",
    },
    "card-2": {
      id: "card-2",
      title: "Define color palette",
      details: "Finalize brand colors for the board UI.",
    },
    "card-3": {
      id: "card-3",
      title: "Wireframe board layout",
      details: "Sketch column layout and card structure.",
    },
    "card-4": {
      id: "card-4",
      title: "Set up project repo",
      details: "Initialize Next.js app in frontend directory.",
    },
    "card-5": {
      id: "card-5",
      title: "Build column component",
      details: "Render columns with rename and card list.",
    },
    "card-6": {
      id: "card-6",
      title: "Implement drag and drop",
      details: "Integrate dnd-kit for card movement.",
    },
    "card-7": {
      id: "card-7",
      title: "Write unit tests",
      details: "Cover board actions and component interactions.",
    },
    "card-8": {
      id: "card-8",
      title: "Polish card styling",
      details: "Refine shadows, spacing, and hover states.",
    },
    "card-9": {
      id: "card-9",
      title: "Add dummy data",
      details: "Populate board with sample project cards.",
    },
    "card-10": {
      id: "card-10",
      title: "Configure Tailwind theme",
      details: "Map brand colors to utility classes.",
    },
  },
};
