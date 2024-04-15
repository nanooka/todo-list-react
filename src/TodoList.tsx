import { useEffect, useReducer, useState } from "react";
import { initialState, todoReducer } from "./reducer";
import { TodoType } from "./types";

export default function TodoList() {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [todoText, setTodoText] = useState<string>("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      dispatch({ type: "SET_TODOS", payload: JSON.parse(storedTodos) });
    }
  });

  const handleAddTodo = () => {
    if (todoText.trim()) {
      const newTodo: TodoType = {
        id: Date.now(),
        text: todoText.trim(),
      };
      dispatch({ type: "ADD_TODO", payload: newTodo });
      setTodoText("");
    }
  };

  const handleRemoveTodo = (id: number) => {
    dispatch({ type: "REMOVE_TODO", payload: id });
  };

  const handleEditClick = (id: number, text: string) => {
    setEditId(id);
    setEditText(text);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditText(e.target.value);
  };

  const handleEditSave = (id: number) => {
    dispatch({ type: "EDIT_TODO", payload: { id, newText: editText } });
    setEditId(null);
    setEditText("");
  };

  return (
    <main>
      <h2>Create your Todo list and be productive</h2>
      <input
        type="text"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul>
        {state.todos.map((todo) => (
          <li key={todo.id}>
            {editId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={handleEditChange}
                />
                <button onClick={() => handleEditSave(todo.id)}>Save</button>
              </>
            ) : (
              <>
                {todo.text}
                <button onClick={() => handleEditClick(todo.id, todo.text)}>
                  Edit
                </button>
              </>
            )}
            <button onClick={() => handleRemoveTodo(todo.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
