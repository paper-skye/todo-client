import Todo from "./Todo";
import React from "react";
import { array, func } from "prop-types";

const TodoList = ({todos, updateTodo, deleteTodo}) => {
	return <div className="TodoList">
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
