import Todo from "./components/Todo";
import { useReducer, useState } from "react";
import initialState from "./data/data";
import "./App.css";

// Reducer
function todosReducer(state, action) {
  console.log(action);

  switch (action.type){
    case "add_todo": {
      if (!action.payload.trim()) return state;

      const newTodo = {
        title: action.payload,
        completed: false,
        id: state.length + 1,
        userId: 1,
      };
      return [newTodo, ...state];
    }
    default: {
      return state;
    }
  }
}


function App() {
  const [newTodo, setNewTodo] = useState("")
  const [todos, dispatch] = useReducer(todosReducer, initialState);
  console.log(todos);

  const handleClick = () => {
    dispatch({type: "add_todo", payload: newTodo});
    setNewTodo("");
  };

  return (
    <div className="app-container">
      <h1>Todo-List</h1>

      <input
        type="text"
        placeholder="Enter your task"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        style={{ display: "flex", justifyContent: "center" }}
      />

      <button onClick={handleClick}>Add</button>

      {/* {todos.map(t => <Todo {...t} key={t.id}/>)} */}

      {todos.map((t) => (
        <Todo todo={t} key={t.id} dispatch={dispatch}/>
      ))}
    </div>
  );
}

export default App;
