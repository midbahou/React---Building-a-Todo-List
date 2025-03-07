

function Todo({todo}) {
// function Todo({title, completed}) {
    console.log(todo);
    const { title, completed, id } = todo;
    
    
    return(
        <div>
            <div className="todo-item">
                <input type="checkbox"
                checked={completed}
                />
                <h2>{title}</h2>
                <button>Edit</button>
                <button>Delete</button>
            </div>
        </div>
    )
}



export default Todo;