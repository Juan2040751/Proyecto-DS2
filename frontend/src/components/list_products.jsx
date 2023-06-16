import { useEffect, useState } from "react"
import { getAllProducts } from "../api/products.api";
import { ProductCard } from "./ProductCard";

export default function listProducts(){

    const [products, setProducts] = useState([]);

    useEffect(() => {

        async function loadProducts(){
            const res = await getAllProducts();
            setProducts(res.data);
        }
        loadProducts();
        
    }, []);

    return <div>
        {products.map(product => (
             <ProductCard key={product.id} product={product}/>
        ))}
    </div>
}