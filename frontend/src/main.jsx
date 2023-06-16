import { React, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import App from "./app";
import Facturacion from "./facturacion"
import Login from "./login";
import Productos from "./productos";
import Register from "./registro";
import ListaProductos from "./components/list_products"

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
      <Route
        path="/facturacion"
        element={
          <CheckAuthentication>
            <App>
              <Facturacion />
            </App>
          </CheckAuthentication>
        }
      />
      <Route
        path="/lista-productos"
        element={
          <CheckAuthentication>
            <App>
              <ListaProductos />
          </App>
          </CheckAuthentication>
        }
      />
      <Route
        path="/productos/:id"
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
