import { useEffect, useReducer, useState } from "react";
import { initialState, todoReducer } from "./reducer";
import { TodoType } from "./types";

export default function TodoList() {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [todoText, setTodoText] = useState<string>("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");
  const [originalText, setOriginalText] = useState<string>("");
  const [plusIsClicked, setPlusIsClicked] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [editMode, setEditMode] = useState(false);

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
        checked: false,
      };
      dispatch({ type: "ADD_TODO", payload: newTodo });
      setTodoText("");
      setPlusIsClicked(false);
    }
  };

  const handleRemoveTodo = (id: number) => {
    dispatch({ type: "REMOVE_TODO", payload: id });
  };

  const handleEditClick = (id: number, text: string) => {
    setEditId(id);
    setOriginalText(text);
    setEditText(text);
    setSelectedTodoId(null);
    setEditMode(true);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditText(e.target.value);
  };

  const handleEditSave = (id: number) => {
    dispatch({ type: "EDIT_TODO", payload: { id, newText: editText } });
    setEditId(null);
    setEditText("");
  };

  const handleToggleCheck = (id: number) => {
    dispatch({ type: "TOGGLE_CHECK", payload: id });
  };

  const handleDropdownToggle = (id: number) => {
    setSelectedTodoId(selectedTodoId === id ? null : id);
    setEditMode(false);
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditText("");
    if (originalText !== "") {
      dispatch({
        type: "EDIT_TODO",
        payload: { id: editId as number, newText: originalText },
      });
      setOriginalText("");
    }
  };

  return (
    <main>
      <h2>Create your Todo list and be productive</h2>
      {!plusIsClicked ? (
        <button className="plus-btn" onClick={() => setPlusIsClicked(true)}>
          +
        </button>
      ) : (
        <div style={{ margin: "10px 0" }}>
          <input
            type="text"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
            className="add-input"
          />
          <button className="add-btn" onClick={handleAddTodo}>
            Add
          </button>
        </div>
      )}
      <ul>
        {state.todos.map((todo) => (
          <li key={todo.id}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "6px",
              }}
            >
              <div
              // style={{
              //   display: "flex",
              //   alignItems: "center",
              //   gap: "6px",
              // }}
              >
                <div
                  style={{
                    width: "14px",
                    height: "14px",
                    borderRadius: "50%",
                    border: "1px solid grey",
                    backgroundColor: todo.checked
                      ? "rgb(244, 244, 144)"
                      : "transparent",
                    cursor: "pointer",
                    marginTop: "5px",
                  }}
                  onClick={() => handleToggleCheck(todo.id)}
                ></div>
              </div>
              {editId === todo.id && editMode ? (
                <div>
                  <input
                    autoFocus
                    className="editing-input"
                    type="text"
                    value={editText}
                    onChange={handleEditChange}
                  />
                  <button
                    className="save-btn"
                    onClick={() => handleEditSave(todo.id)}
                  >
                    Save
                  </button>
                  <button className="cancel-btn" onClick={handleCancelEdit}>
                    Cancel
                  </button>
                </div>
              ) : (
                <p className="todo-text">{todo.text}</p>
              )}
            </div>

            <button
              className="click-btn"
              onClick={() => handleDropdownToggle(todo.id)}
            >
              &#8942;
            </button>
            {selectedTodoId === todo.id && (
              <>
                <button
                  className="edit-btn"
                  onClick={() => handleEditClick(todo.id, todo.text)}
                >
                  Edit
                </button>
                <button
                  className="remove-btn"
                  onClick={() => handleRemoveTodo(todo.id)}
                >
                  Remove
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
