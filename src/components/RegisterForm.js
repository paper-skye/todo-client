import { func } from "prop-types";
import React, {useState} from "react";
import { register } from "../requests";

const RegisterForm = ({setUser, setLogin}) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [displayName, setDisplayName] = useState("");
	const [error, setError] = useState(null);

	return (
		<>
			<h1>Register</h1>

			<form
				className="auth-form"
				onSubmit={(e) => {
					e.preventDefault();

					register({displayName, email, password})
						.then(response => {
							setEmail("");
							setPassword("");
							setDisplayName("");

							setUser(response.data);
						})
						.catch(error => {
							if (error.response) {
								setError(error.response.data.message);
								setTimeout(() => setError(null), 2000);
							}

							console.error(error.message);
						});
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

				<input
					type="text"
					placeholder="display name"
					value={displayName}
					onChange={(e) => setDisplayName(e.target.value)}
				/>
				<input type="button" value="login instead"
					className="btn btn-link"
					onClick={() => setLogin()} />
				<input type="submit"
					className="btn btn-main" value="register" />
			</form>
			<br />
			<span className="error-message">{error}</span>
		</>
	);
};

RegisterForm.propTypes = {
	setUser: func,
	setLogin: func
};

export default RegisterForm;
