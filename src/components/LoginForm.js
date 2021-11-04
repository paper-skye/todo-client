import React, {useState} from "react";
import { login } from "../requests";
import {func} from "prop-types";

const LoginForm = ({setUser, setRegister}) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);

	return (
		<>
			<h1>Login</h1>

			<form
				className="auth-form"
				onSubmit={(e) => {
					e.preventDefault();
					login({email, password})
						.then(response => {
							setUser(response.data);
						})
						.catch(error => {
							if (error.response) {
								setError(error.response.data.message);
								setTimeout(() => setError(null), 2000);
							}

							console.error(error.message);
						});

					setEmail("");
					setPassword("");
				}}>
				<input
					type="email"
					placeholder="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					placeholder="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

				<input type="button" value="register instead"
					className="btn btn-link"
					onClick={() => setRegister()} />
				<input type="submit"
					className="btn btn-main" value="login" />
			</form>
			<br />
			<span className="error-message">{error}</span>
		</>
	);
};

LoginForm.propTypes = {
	setUser: func,
	setRegister: func
};

export default LoginForm;
