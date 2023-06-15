import { React, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Productos from "./productos";
import Register from "./registro";
import Login from "./login";

const CheckAuthentication = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLogged = localStorage.getItem('isLogged');
    if (isLogged !== 'true') {
      navigate('/');
    }
  }, [navigate]);

  return children;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={
            <div>
              <div>
                <Login />
              </div>
              <div>
                <Register />
              </div>
            </div>
        }/>
      <Route
      
        path="/productos"
        element={
          <CheckAuthentication>
            <App>
              <Productos />
            </App>
          </CheckAuthentication>
        }
      />
    </Routes>
  </BrowserRouter>
);
