import Todo from "./todo";

import "../styles/todo-list.css";

const TodoList = ({todos, deleteTodo}) => {
    return <div className="todo-list">
        {todos.map(todo =>
            <Todo key={todo.id} todo={todo} deleteTodo={deleteTodo} />
        )}
    </div>
}

export default TodoList;
