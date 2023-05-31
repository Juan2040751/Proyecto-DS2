import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const csrfToken = 'my_csrf_token';
    axios.defaults.headers.common['X-CSRFToken'] = csrfToken;

    axios
      .post("http://localhost:8000/users/login", { username, password })
      .then((response) => {
        console.log(response.data);
        navigate("/facturacion")
        // luego redirigir al home de la app
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <div className="wrapper">
      <div className="loginContainer">
        <div className="containerForm">
          <h2>Iniciar sesión</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="id" className="form-label">
                Nombre de Usuario:
              </label>
              <input
                type="text"
                className="form-control"
                id="id"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Contraseña:
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
