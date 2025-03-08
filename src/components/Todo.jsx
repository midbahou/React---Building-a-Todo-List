import { useState } from "react";

function Todo({ todo, dispatch }) {
    const { title, completed, id, isEditing } = todo;
    const [editText, setEditText] = useState(title);

    return (
        <div className="todo-item">
        {!isEditing ? (
            <>
            <input
                type="checkbox"
                onChange={() =>
                    dispatch({ type: "toggle_complete", payload: { id: todo.id } })
                }
                checked={completed}
            />

            <h2>{title}</h2>

            <button onClick={() => dispatch({ type: "edit-todo", payload: id })}>Edit</button>

            {/* disabled when the task is not completed */}
            <button onClick={() => dispatch({ type: "delete-todo", payload: id })} disabled={!completed}>Delete</button> 
            </>

        ) : (
          <>
          <input type="text" value={editText} onChange={(e) => setEditText(e.target.value)}/>

          <button onClick={() => dispatch({ type: "save-todo", payload: {id, newTitle: editText} })}>Save</button>
          </>
        )}
        </div>
    );
}

export default Todo;
