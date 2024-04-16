import { TodoStateType, TodoActionType } from "./types";

export const initialState: TodoStateType = {
  todos: JSON.parse(localStorage.getItem("todos") || "[]"),
};

export const todoReducer = (
  state: TodoStateType,
  action: TodoActionType
): TodoStateType => {
  let updatedTodosAdd,
    updatedTodosRemove,
    updatedTodosEdit,
    updatedTodosToggleCheck;

  switch (action.type) {
    case "ADD_TODO":
      updatedTodosAdd = [...state.todos, action.payload];
      localStorage.setItem("todos", JSON.stringify(updatedTodosAdd));
      return {
        ...state,
        todos: updatedTodosAdd,
      };
    case "REMOVE_TODO":
      updatedTodosRemove = state.todos.filter(
        (todo) => todo.id !== action.payload
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodosRemove));
      return {
        ...state,
        todos: updatedTodosRemove,
      };
    case "EDIT_TODO":
      updatedTodosEdit = state.todos.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.newText }
          : todo
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodosEdit));
      return {
        ...state,
        todos: updatedTodosEdit,
      };
    case "TOGGLE_CHECK":
      updatedTodosToggleCheck = state.todos.map((todo) =>
        todo.id === action.payload ? { ...todo, checked: !todo.checked } : todo
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodosToggleCheck));
      return {
        ...state,
        todos: updatedTodosToggleCheck,
      };
    case "SET_TODOS":
      return {
        ...state,
        todos: action.payload,
      };
    default:
      return state;
  }
};
