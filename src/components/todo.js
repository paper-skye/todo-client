import { useState } from "react";

import "../styles/todo-list.css";

const Todo = ({todo, deleteTodo}) => {
    const [isComplete, setIsComplete] = useState(todo.isComplete);

    return <div className="todo">
        <span style={{cursor: "pointer"}} onClick={() => {
            setIsComplete(!isComplete)
        }}>{isComplete ? <s>{todo.task}</s> : todo.task}</span>
        <input type="button" value="✕" className="button button-link"
            onClick={() => deleteTodo(todo.id)} />
    </div>
}

export default Todo;
