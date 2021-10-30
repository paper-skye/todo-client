import { LoginForm } from "./login-form";
import React, {useState} from "react";
import { RegisterForm } from "./register-form";

const Login = ({setUser}) => {
    const [login, setLogin] = useState(true);

    return <div className="fullscreen">
        {login ?
            <LoginForm setUser={setUser}
                setRegister={() => setLogin(false)} /> :
            <RegisterForm setUser={setUser}
                setLogin={() => setLogin(true)} />
        }
    </div>
}

export default Login;