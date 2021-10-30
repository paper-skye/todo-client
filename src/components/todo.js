import { func, object } from "prop-types";
import React, { useState } from "react";

import "../styles/todo-list.css";

const Todo = ({todo, updateTodo, deleteTodo}) => {
	const [isComplete, setIsComplete] = useState(todo.isComplete);
	const [taskText, setTaskText] = useState(todo.task);
	const [editText, setEditText] = useState(todo.task);
	const [isEditing, setIsEditing] = useState(false);

	return <div className="todo">
		{isEditing ?
			<div>
				
				<input type="text" value={editText}
					onChange={(e) => setEditText(e.target.value)}
				/>
				<input type="button" value="update"
					className="button button-main"
					onClick={() => {
						updateTodo({...todo, task: editText});
						setTaskText(editText);
						setIsEditing(false);
					}}
				/>
			</div> :
			<div>
				<span style={{cursor: "pointer"}} onClick={() => {
					updateTodo({...todo, isComplete: !isComplete});
					setIsComplete(!isComplete);
				}}>{isComplete ? <s>{taskText}</s> : taskText}</span>
				<input type="button" value="&#9998;" className="button button-link"
					onClick={() => setIsEditing(true)}
				/>
				<input type="button" value="&#215;" className="button button-link"
					onClick={() => deleteTodo(todo.id)} />
			</div>
		}
	</div>;
};

Todo.propTypes = {
	todo: object,
	updateTodo: func,
	deleteTodo: func
};

export default Todo;
