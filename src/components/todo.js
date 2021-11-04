import { func, object } from "prop-types";
import React, { useState } from "react";

const Todo = ({todo, updateTodo, deleteTodo}) => {
	const [isComplete, setIsComplete] = useState(todo.isComplete);
	const [taskText, setTaskText] = useState(todo.task);
	const [editText, setEditText] = useState(todo.task);
	const [isEditing, setIsEditing] = useState(false);

	return <>
		{isEditing ?
			<div className="Todo">
				<input type="text" value={editText}
					onChange={(e) => setEditText(e.target.value)}
				/>
				<div>
					<input type="button" value="cancel"
						className="btn btn-plain"
						onClick={() => {
							setEditText(taskText);
							setIsEditing(false);
						}}
					/>
					<input type="button" value="update"
						className="btn btn-main"
						onClick={() => {
							updateTodo({...todo, task: editText});
							setTaskText(editText);
							setIsEditing(false);
						}}
					/>
				</div>
			</div> :
			<div className="Todo">
				<span style={{cursor: "pointer"}} onClick={() => {
					updateTodo({...todo, isComplete: !isComplete});
					setIsComplete(!isComplete);
				}}>{isComplete ? <s>{taskText}</s> : taskText}</span>
				<div>
					<input type="button" value="&#9998;" className="btn btn-plain"
						onClick={() => setIsEditing(true)}
					/>
					<input type="button" value="&#215;" className="btn btn-plain"
						onClick={() => deleteTodo(todo.id)} />
				</div>
			</div>
		}
	</>;
};

Todo.propTypes = {
	todo: object,
	updateTodo: func,
	deleteTodo: func
};

export default Todo;

