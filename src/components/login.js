import LoginForm from "./LoginForm";
import React, {useState} from "react";
import RegisterForm from "./RegisterForm";
import { func } from "prop-types";

const Login = ({setUser}) => {
	const [login, setLogin] = useState(true);

	return <>
		{login ?
			<LoginForm setUser={setUser}
				setRegister={() => setLogin(false)} /> :
			<RegisterForm setUser={setUser}
				setLogin={() => setLogin(true)} />
		}
	</>;
};

Login.propTypes = {
	setUser: func
};

export default Login;