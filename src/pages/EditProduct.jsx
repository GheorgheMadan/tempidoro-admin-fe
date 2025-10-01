import { useParams } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import { useGlobalProducts } from "../context/GlobalProducts";
import { useEffect, useState } from "react";

export default function EditProduct() {
    const { fetchProductById, product, modifyProduct } = useGlobalProducts();
    const { id } = useParams();

    const [productToAdd, setProductToAdd] = useState(null);

    useEffect(() => { fetchProductById(id); }, [id]);
    useEffect(() => { if (product) setProductToAdd(product); }, [product]);

    if (!productToAdd) return null; // o loader

    return (
        <ProductForm
            textTitle="Modifica Prodotto"
            mode="Edit"
            productToAdd={productToAdd}
            setProductToAdd={setProductToAdd}
            fetch={modifyProduct}          // (id, payload)
        />
    );
}
