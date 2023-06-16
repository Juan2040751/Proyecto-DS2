import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/styles.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [exito, setExito] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();

    const csrfToken = 'my_csrf_token';
    axios.defaults.headers.common['X-CSRFToken'] = csrfToken;
    
    await axios
      .post("http://localhost:8000/users/register", { username, email, password, confirmation })
      .then((response) => {
        console.log(response.data);
        if (response.data.message === "Registration successful") {
          setExito("Te has registrado exitosamente");
          localStorage.setItem('isLogged', 'true');
          localStorage.setItem('id', response.data.id);
          localStorage.setItem('username', response.data.username);
          setTimeout(() => {
            navigate("/facturacion");
          }, 2200);
        } else {
          console.log(response.data.message);
          setError(response.data.message);
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
      <div className="registerContainer">
        <div className="containerForm">
          <h2>Registro de usuario</h2>
          {error && (
              <div className="error-alert">
                {error}
                <button className="close-btn" onClick={closeError}>
                  Cerrar
                </button>
              </div>
            )}
          {exito && (<div className="success-alert alert alert-success text-center"> {exito} </div>)}
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Nombre de usuario:
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Correo electrónico:
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Contraseña:
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmation" className="form-label">
                Confirmar contraseña:
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmation"
                value={confirmation}
                onChange={(e) => setConfirmation(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Registrarse
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
