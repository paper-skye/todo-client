import AddForm from "./components/AddForm";
import TodoList from "./components/TodoList";
import Login from "./components/Login";
import { getTodos, logout, me, postTodo, deleteTodo, patchTodo } from "./requests";
import React, { useEffect, useState } from "react";

function App() {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [user, setUser] = useState(null);
	const [todos, setTodos] = useState([]);

	// Callbacks
	const createTodoHandler = async (todoDTO) => {
		try {
			const response = await postTodo(todoDTO);
			const todo = response.data;
			setTodos(todos => [todo, ...todos]);
		}
		catch (error) {
			if (error.response) {
				setError(error.response.data.message);
				setTimeout(() => setError(null), 2000);
			}

			console.error(error.message);
		}
	};

	const updateTodoHandler = async (todoDTO) => {
		try {
			const response = await patchTodo(todoDTO);
			const responseTodo = response.data;
			setTodos(todos.map(todo => todo.id === responseTodo.id ?
				responseTodo :
				todo));
		}
		catch (error) {
			if (error.response) {
				setError(error.response.data.message);
				setTimeout(() => setError(null), 2000);
			}

			console.error(error.message);
		}
	};

	const deleteTodoHandler = async (todoId) => {
		try {
			await deleteTodo(todoId);
			setTodos(todos.filter(todo => todo.id !== todoId));
		}
		catch (error) {
			if (error.response) {
				setError(error.response.data.message);
				setTimeout(() => setError(null), 2000);
			}

			console.error(error.message);
		}
	};

	// Determine initial auth state and populate todos
	useEffect(() => {
		if (!user) {
			me()
				.then(response => {
					setUser(response.data);
					getTodos()
						.then(response => {
							setTodos(response.data);
							setLoading(false);
						})
						.catch(error => {
							if (error.response) {
								setError(error.response.data.message);
								setTimeout(() => setError(null), 2000);
							}

							console.error(error.message);
							setLoading(false);
						});
				})
				.catch(error => {
					if (error.response) {
						setError(error.response.data.message);
						setTimeout(() => setError(null), 2000);
					}

					console.error(error.message);
					setLoading(false);
				});
		}
		else {
			getTodos()
				.then(response => {
					setTodos(response.data);
					setLoading(false);
				})
				.catch(error => {
					if (error.response) {
						setError(error.response.data.message);
						setTimeout(() => setError(null), 2000);
					}

					console.error(error.message);
					setLoading(false);
				});
		}
	}, [user]);

	return (
		<div className="App centered">
			{loading ? <div className="loading">loading...</div>
				:
				user ? <>
          
					<h1>{user.displayName[0].toUpperCase() + user.displayName.substring(1)}&apos;s List</h1>
          
					<span className="error-message">{error}</span>
					<AddForm
						createTodo={createTodoHandler} />
					<div className="todo-list-container">
						<TodoList todos={todos}
							updateTodo={updateTodoHandler}
							deleteTodo={deleteTodoHandler} />
					</div>
					<input type="button"
						className="btn btn-link"
						value="Logout"
						onClick={() => {
							logout()
								.then(() => {
									setUser(null);
									setTodos([]);
								})
								.catch(error => {
									if (error.response) {
										setError(error.response.data.message);
										setError(() => setError(null), 2000);
									}
								});
						}} />
				</>
					:
					<Login setUser={setUser} />}
		</div>
	);
}

export default App;
