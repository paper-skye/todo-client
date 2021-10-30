import React, {useState} from 'react';
import { login } from '../requests';
import "../styles/shared.css";
import "../styles/login.css";

export const LoginForm = ({setUser, setRegister}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    return (
        <div className="fullscreen">
            <h1>Login</h1>

            <form
                className="form-center"
                onSubmit={(e) => {
                    e.preventDefault()
                    login({email, password})
                        .then(response => {
                            setUser(response.data)
                        })
                        .catch(error => {
                            if (error.response) {
                                setError(error.response.data.message);
                                setTimeout(() => setError(null), 2000);
                            }

                            console.error(error.message)
                        })

                    setEmail('')
                    setPassword('')
                }}>
                <input
                    type="text"
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
                    className="button button-link underline"
                    onClick={() => setRegister()} />
                <input type="submit"
                    className="button button-main" value="login" />
            </form>
            <br />
            <span className="error-message">{error}</span>
        </div>
    )
}
