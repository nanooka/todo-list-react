export type TodoType = {
  id: number;
  text: string;
};

export type TodoStateType = {
  todos: TodoType[];
};

export type TodoActionType =
  | { type: "ADD_TODO"; payload: TodoType }
  | { type: "REMOVE_TODO"; payload: number }
  | { type: "EDIT_TODO"; payload: { id: number; newText: string } }
  | { type: "SET_TODOS"; payload: TodoType[] };
