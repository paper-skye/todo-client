import AddForm from "./components/add-form";
import TodoList from "./components/todo-list";
import Login from "./components/login";
import { getTodos, logout, me, postTodo, deleteTodo } from "./requests";
import { useEffect, useState } from "react";

import "./styles/shared.css";

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
  }

  const deleteTodoHandler = async (todoId) => {
    try {
      await deleteTodo(todoId);
      setTodos(todos.filter(todo => todo.id !== todoId))
    }
    catch (error) {
      if (error.response) {
        setError(error.response.data.message);
        setTimeout(() => setError(null), 2000);
      }

      console.error(error.message);
    }
  }

  // Determine initial auth state and populate todos
  useEffect(() => {
    if (!user) {
      try {
        me()
          .then(response => {
            console.log("User response: ", response.data);
            setUser(response.data)
            getTodos()
              .then(response => {
                console.log("Todos response: ", response.data);
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
              })
          })
          .catch(error => {
            if (error.response) {
              setError(error.response.data.message);
              setTimeout(() => setError(null), 2000);
            }

            console.error(error.message);
            setLoading(false);
          })
      } catch (error) {}
    }
    else {
      getTodos()
        .then(response => {
          console.log("Todos response: ", response.data);
          setTodos(response.data)
          setLoading(false)
        })
        .catch(error => {
          if (error.response) {
            setError(error.response.data.message);
            setTimeout(() => setError(null), 2000);
          }

          console.error(error.message);
          setLoading(false);
        })
    }
  }, [user])

  return (
    <div className="fullscreen">
      {loading ? <p>loading...</p>
        :
        user ? <>
          
          <h1>{user.displayName}'s list</h1>
          
          {error}
          <AddForm
            createTodo={createTodoHandler} />
          <TodoList todos={todos}
            deleteTodo={deleteTodoHandler} />
          <input type="button"
            className="button button-link"
            value="logout"
            onClick={() => {
               logout()
                .then(() => {
                  setUser(null)
                  setTodos([])
                })
                .catch(error => {
                  if (error.response) {
                    setError(error.response.data.message);
                    setError(() => setError(null), 2000);
                  }
                })
            }} />
        </>
        :
        <Login setUser={setUser} />}
    </div>
  );
}

export default App;
