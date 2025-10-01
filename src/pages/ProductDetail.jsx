import { Link, useParams } from "react-router-dom";
import { useGlobalProducts } from "../context/GlobalProducts";
import { useEffect, useState } from "react";
import "../css/ProductDetail.css";
import AddToFavButton from "../components/AddToFavButton";
import OverlayImage from "../components/OverlayImage";
import Spinner from "../components/Spinner";

export default function ProductDetail() {

    const { fetchProductById, product, loading } = useGlobalProducts();

    const { slugAndId } = useParams(); // Ottieni l'ID del prodotto dalla URL

    const [showOverlay, setShowOverlay] = useState(false);

    // Estrai l'id numerico dalla parte finale della stringa
    const id = slugAndId.split("-").pop();



    useEffect(() => {
        (async () => {
            await fetchProductById(id); // Fetch del prodotto specifico
        })()
    }, [id])

    if (loading) {
        return <Spinner />
    }

    if (!product) {
        return <p>Errore del server. Riprova più tardi.</p>;
    }
    if (Object.keys(product).length === 0) {
        return <p>Prodotto non trovato.</p>;
    }


    // calocolo prezzo scontato 
    const discount = `0.${product.discount}`
    const discountedPriceCalc = (Number(product.price) - (Number(product.price) * Number(discount))).toFixed(2)
    const discountedPriceToModify = discountedPriceCalc.toString()
    const discountedPrice = discountedPriceToModify.replace(".", ",")

    // modifica prezzo 
    const priceToModify = Number(product.price).toFixed(2)
    const priceToModify2 = priceToModify.toString()
    const price = priceToModify2.replace(".", ",")


    return (
        <main>
            <div className="product-detail-container">
                <div className="product-image-container" onClick={() => setShowOverlay(true)}>
                    <img src={`/prodotti/${product?.image}`} alt={product?.title} />
                    <button className="btn-skin-1 btn-large">Visualizza</button>
                </div>
                <div className="product-content-container">
                    <h2>{product?.title}</h2>
                    <div className="container-product-details">
                        <div>
                            {/* Descrizione prodotto sotto la lista */}
                            {product?.description && (
                                <p>{product.description}</p>
                            )}
                            <ul>
                                {/* 1. Categoria */}
                                {product?.categoria && (
                                    <li>Categoria: {product.categoria}</li>
                                )}
                                {/* 2. Marca */}
                                {product?.brand && (
                                    <li>Marca: {product.brand}</li>
                                )}
                                {/* 3. Codice */}
                                {product?.codice && (
                                    <li>Codice: {product.codice}</li>
                                )}
                                {/* 4. Collezione */}
                                {product?.collezione && (
                                    <li>Collezione: {product.collezione}</li>
                                )}
                                {/* 5. Materiale */}
                                {product?.materiale && (
                                    <li>Materiale: {product.materiale}</li>
                                )}
                                {/* 6. Genere */}
                                {product?.genere && (
                                    <li>Genere: {product.genere}</li>
                                )}
                                {/* 7. Garanzia */}
                                {product?.garanzia && (
                                    <li>Garanzia: {product.garanzia}</li>
                                )}
                                {/* 8. Confezione */}
                                {product?.confezione && (
                                    <li>Confezione: {product.confezione}</li>
                                )}
                            </ul>
                        </div>
                        <div>
                            {product?.available || product?.stock > 0 ? (
                                <div className="product-price-detail product-price">
                                    <div className="price-section">
                                        {product.in_promozione ? (
                                            <div className="discount-section discounted-price-detail">
                                                <span className="original-price original-price-2">€ {price}</span>
                                                <span className="detail-price">€ {discountedPrice}</span>
                                            </div>
                                        ) : (
                                            <span className="detail-price">€ {price}</span>
                                        )}
                                    </div>
                                    <span>iva inclusa</span>
                                    <div className="container-buttons">
                                        <button className="btn-skin-1 btn-large">
                                            Aggiungi al carrello
                                        </button>
                                        <div className="button-fav-detail">
                                            <AddToFavButton product={product} />
                                        </div>
                                    </div>
                                </div>
                            ) : (

                                <p className="out-of-stock">
                                    Prodotto non disponibile
                                    <AddToFavButton product={product} />
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {showOverlay &&
                <OverlayImage image={`/prodotti/${product?.image}`}
                    altText={product?.title}
                    onClose={() => setShowOverlay(false)} />}
        </main>
    )
}