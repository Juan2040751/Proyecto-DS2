import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  Card,
  Fade,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  Modal,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct, updateProduct } from "./api/products.api";

export function NuevoProducto({ open, setOpen, handleOpen }) {
  const [producto, setProducto] = useState({
    name: "",
    description: "",
    price: 0,
    manufacturer: "",
    weight: "",
    category: "",
    numberUnits: "",
  });
  const [message, setMessage] = useState({
    state: false,
    message: "producto añadido con exito!",
  });
  const params = useParams();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (params.id) {
      await updateProduct(params.id, producto);
      navigate("/lista-productos/")
    } else {
      await axios({
        method: "post",
        url: "https://tienda-service.onrender.com/products/",
        data: producto,
      })
        .then(async function (responseUser) {
          console.log(responseUser.data);
          setProducto({
            name: "",
            description: "",
            price: 0,
            manufacturer: "",
            weight: "",
            category: "",
            numberUnits: "",
          });
          setMessage({ ...message, state: true });
        })
        .catch(function (error) {
          setMessage({ state: true, message: "error!" });
          console.log(error);
        });
    }
  };

  useEffect(() => {
    async function loadProduct() {
      if (params.id) {
        const res = await getProduct(params.id);
        setProducto(res.data);
      }
    }
    loadProduct();
  }, []);

  {
    params.id && setOpen(true);
  }

  return (
    <>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleOpen}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box
              sx={{
                position: "absolute",
                minWidth: 400,
                maxWidth: "50%",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "transparent",
              }}
            >
              <Card
                sx={{
                  padding: 4,
                  width: "100%",
                  borderRadius: 4,
                }}
              >
                <Box
                  sx={{
                    flexGrow: 1,
                    display: { xs: "flex", md: "flex" },
                    justifyContent: "space-between",
                    paddingRight: "3%",
                  }}
                >
                {params.id ? (
                  <Typography
                    variant="h4"
                    noWrap
                    component="a"
                    href="#"
                    sx={{
                      mr: 0,
                      display: { xs: "flex", md: "flex" },
                      fontFamily: "sans-serif",
                      fontWeight: 700,
                      fontSize: 25,
                      color: "black",
                      textDecoration: "none",
                    }}
                  >
                    Actualizar Producto
                  </Typography>
                ) : (
                  <Typography
                        variant="h4"
                        noWrap
                        component="a"
                        href="#"
                        sx={{
                          mr: 0,
                          display: { xs: "flex", md: "flex" },
                          fontFamily: "sans-serif",
                          fontWeight: 700,
                          fontSize: 25,
                          color: "black",
                          textDecoration: "none",
                        }}
                      >
                        Nuevo Producto
                      </Typography>
                )}

                {params.id ? (
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "orange",
                      borderRadius: 7,
                      textTransform: "initial",
                    }}
                    onClick={submitHandler}
                  >
                    <AddIcon sx={{ mr: 0.5 }} />
                    Actualizar
                  </Button>
                ) : (
                  <Button
                        variant="contained"
                        style={{
                          backgroundColor: "#00AB55",
                          borderRadius: 7,
                          textTransform: "initial",
                        }}
                        onClick={submitHandler}
                      >
                        <AddIcon sx={{ mr: 0.5 }} />
                        Crear
                      </Button>
                )}
                  
              </Box>

  
              <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 30,
                  }}
                >
                  <TextField
                    id="standard-search"
                    label="Nombre del Producto"
                    type="text"
                    variant="standard"
                  //defaultValue={producto.name}
                    //defaultValue={producto.name}
                  onChange={(e) =>
                      setProducto({ ...producto, name: e.target.value })
                    }
                    value={producto.name}
                  />
                  <FormControl variant="standard">
                    <InputLabel htmlFor="standard-adornment-amount">
                      Precio del Producto
                    </InputLabel>
                    <Input
                      id="standard-adornment-amount"
                      onChange={(e) =>
                        setProducto({ ...producto, price: e.target.value })
                      }
                      value={producto.price}
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                    />
                  </FormControl>

                  <TextField
                    
                    label="Fabricante del Producto"
                    type="text"
                    onChange={(e) =>
                      setProducto({ ...producto, manufacturer: e.target.value })
                    }
                    value={producto.manufacturer}
                    variant="standard"
                  />

                  <TextField
                      label="Descripción del Producto"
                    type="text"
                    onChange={(e) =>
                      setProducto({ ...producto, description: e.target.value })
                    }
                    value={producto.description}
                    variant="standard"
                  />

                  <FormControl variant="standard">
                    <InputLabel id="standard-weight-helper-text">
                      Peso del Producto
                    </InputLabel>
                    <Input
                      id="standard-adornment-weight"
                      onChange={(e) =>
                        setProducto({ ...producto, weight: e.target.value })
                      }
                      value={producto.weight}
                      endAdornment={
                        <InputAdornment position="end">Kg</InputAdornment>
                      }
                      aria-describedby="standard-weight-helper-text"
                      inputProps={{
                        "aria-label": "weight",
                      }}
                    />
                  </FormControl>
                  <TextField
                    
                    label="Categoria del Producto"
                    type="text"
                    onChange={(e) =>
                      setProducto({ ...producto, category: e.target.value })
                    }
                    value={producto.category}
                    variant="standard"
                  />
                  <TextField
                    
                    label="Unidades del Producto"
                    type="number"
                    onChange={(e) =>
                      setProducto({ ...producto, numberUnits: e.target.value })
                    }
                    value={producto.numberUnits}
                    variant="standard"
                  />
                </div>
              </Card>
            </Box>
          </Fade>
        </Modal>
        <Snackbar
        open={message.state}
        onClose={() => setMessage({ ...message, state: false })}
        message={message.message}
      />
    </>
  );
}

export default function Productos() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <div style={{ display: "flex" }}>
      <Box
        sx={{
          flexGrow: 2,
          display: { md: "block" },
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "flex", md: "flex" },
            justifyContent: "space-between",
            padding: "3%",
          }}
        >
          <Typography
            variant="h4"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "flex" },
              fontFamily: "sans-serif",
              fontWeight: 700,
              fontSize: 25,
              color: "black",
              textDecoration: "none",
            }}
            onClick={() => {
              navigate("/lista-productos/");
            }}
          >
            Lista de Productos
          </Typography>

          {params.id ? (
            <Button
              variant="contained"
              style={{
                backgroundColor: "orange",
                borderRadius: 7,
                textTransform: "initial",
              }}
              onClick={handleOpen}
            >
              <AddIcon sx={{ mr: 0.5 }} />
              Actualizar Producto
            </Button>
          ) : (
            <Button
              variant="contained"
              style={{
                backgroundColor: "#00AB55",
                borderRadius: 7,
                textTransform: "initial",
              }}
              onClick={handleOpen}
            >
              <AddIcon sx={{ mr: 0.5 }} />
              Agregar Producto
            </Button>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          display: { md: "block" },
        }}
      ></Box>
      <NuevoProducto open={open} setOpen={setOpen} handleOpen={handleOpen} />
    </div>
  );
}
