import { useReducer, useState } from "react";
import initialState from "./data/data";
import Todo from "./components/Todo";
import "./App.css";

// Reducer function
function todosReducer(state, action) {
  // console.log("Log Action: ", action);

  switch (action.type) {
    case "add_todo":
      const newTodo = {
        // id: state.length + 1, // cause error about two children with the same key, `20`!
        id: Date.now(), // unique Id generation
        title: action.payload,
        completed: false,
        isEditing: false
      }
      return [newTodo, ...state];

    case "toggle_complete":
      return state.map(todo => {
        if (todo.id === action.payload.id) {
          return { ...todo, completed: !todo.completed }
        }
        return todo
      });

    case "delete-todo":
      return state.filter(todo => todo.id !== action.payload)

    case "edit-todo":
      return state.map(todo => {
        if (todo.id === action.payload) {
          return { ...todo, isEditing: true };
        }
        return todo
      })

    case "save_todo":
      return state.map(todo =>
        todo.id === action.payload.id ? { ...todo, title: action.payload.newTitle, isEditing: false } : todo
    );

    default: {
      return state;
    }
  }
}


function App() {
  const [newTodo, setNewTodo] = useState("")
  const [todos, dispatch] = useReducer(todosReducer, initialState.map(todo => ({
    ...todo,
    isEditing: false
  })));
  console.log(todos);

  const handleAddTodo = () => {
    if(newTodo.trim()){
    dispatch({ type: "add_todo", payload: newTodo });
    setNewTodo("");
  }
  };

  return (
    <div className="app-container">
      <h1>Todo-List</h1>

      <input
        type="text"
        placeholder="Enter your task"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />

      <button onClick={handleAddTodo}>Add</button>

      {/* {todos.map(t => <Todo {...t} key={t.id}/>)} */}

      {todos.map((t) => (
        <Todo key={t.id} todo={t} dispatch={dispatch} />
      ))}
    </div>
  );
}

export default App;
