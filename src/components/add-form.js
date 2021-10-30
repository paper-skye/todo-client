import React, {useState} from "react";
import { func } from "prop-types";

const AddForm = ({createTodo}) => {
	const [task, setTask] = useState("");

	return <form
		onSubmit={(e) => {
			e.preventDefault();
			createTodo({task});
			setTask("");
		}}>
		<input
			type="text"
			placeholder="task..."
			value={task}
			onChange={(e) => setTask(e.target.value)}
		/>
		<input
			type="submit"
			className="button button-main"
			value="Add"
			disabled={!task} />
	</form>;
};

AddForm.propTypes = {
	createTodo: func
};

export default AddForm;
