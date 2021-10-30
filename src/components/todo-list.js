import Todo from "./todo";
import React from "react";
import "../styles/todo-list.css";
import { array, func } from "prop-types";

const TodoList = ({todos, updateTodo, deleteTodo}) => {
	return <div className="todo-list">
		{todos.map(todo =>
			<Todo key={todo.id}
				todo={todo}
				updateTodo={updateTodo}
				deleteTodo={deleteTodo}
			/>
		)}
	</div>;
};

TodoList.propTypes = {
	todos: array,
	updateTodo: func,
	deleteTodo: func
};

export default TodoList;
