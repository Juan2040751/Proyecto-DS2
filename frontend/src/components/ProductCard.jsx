import { useNavigate, useParams } from "react-router-dom";
import { deleteProduct } from "../api/products.api";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";



export function ProductCard({ product }) {

  const navigate = useNavigate();
  const params = useParams();

  return (
    <>
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Description: {product.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: {product.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manufacturer: {product.manufacturer}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Weight: {product.weight}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Category: {product.category}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Number of Units: {product.numberUnits}
        </Typography>
      </CardContent>
      <CardActions>
          <Button
            onClick={async () => {
              const accepted = window.confirm("Estas seguro?");
              if (accepted) {
                await deleteProduct(product.id);
                window.location.reload();
              }
              
            }}
          >
            {" "}
            Eliminar{" "}
          </Button>

          <Button
          onClick={ () => {
            navigate(`/productos/${product.id}`)
          }}
          > Actualizar </Button>
        </CardActions>
    </Card>

    </>
  );
}
