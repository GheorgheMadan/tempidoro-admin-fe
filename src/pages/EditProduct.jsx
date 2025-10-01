import { useParams } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import { useGlobalProducts } from "../context/GlobalProducts";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EditProduct() {
    const { fetchProductById, product, modifyProduct } = useGlobalProducts();
    const { id } = useParams();

    const [productToAdd, setProductToAdd] = useState(null);
    const navigate = useNavigate();
    // Carica il prodotto da modificare
    useEffect(() => { fetchProductById(id); }, [id]);
    // Quando il prodotto è caricato, inizializza lo stato del form
    useEffect(() => { if (product) setProductToAdd(product); }, [product]);

    if (!productToAdd) return null;



    return (
        <ProductForm
            textTitle="Modifica Prodotto"
            mode="Edit"
            productToAdd={productToAdd}
            setProductToAdd={setProductToAdd}
            fetch={modifyProduct}          // (id, payload)
            annullaEditButton={<button onClick={() => {
                setProductToAdd(null)
                navigate('/home')
            }} className="btn">Annulla Modifica</button>}
        />
    );
}
