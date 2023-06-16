import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/styles.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    const csrfToken = 'my_csrf_token';
    axios.defaults.headers.common['X-CSRFToken'] = csrfToken;
    localStorage.clear();
    await axios
      .post("http://localhost:8000/users/login", { username, password })
      .then((response) => {
        console.log(response.data);
        if (response.data.message === "Login successful") {
          localStorage.setItem('isLogged', 'true');
          localStorage.setItem('id', response.data.id);
          localStorage.setItem('username', response.data.username);
          navigate("/facturacion")
        } else {
          setError("Acceso inválido. Por favor, inténtelo otra vez.");
          localStorage.setItem('isLogged', 'false');
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const closeError = () => {
    setError("");
  };

  return (
    <div className="wrapper">
      <div className="loginContainer">
        <div className="containerForm">
          <h2>Iniciar sesión</h2>
          {error && (
              <div className="error-alert">
                {error}
                <button className="close-btn" onClick={closeError}>
                  Cerrar
                </button>
              </div>
            )}
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
