import { Link } from "react-router-dom";
import { memo, useState } from "react";
import AddToFavButton from "./AddToFavButton";
import "../css/ProductsStyle.css";
import { useGlobalProducts } from "../context/GlobalProducts";
import useUtility from "../hooks/useUtility";
import ConfirmModal from "./ConfirmModal";
import Spinner from "./Spinner";

export default memo(function ProductCard({ product, containerButton, checked, onToggleSelect }) {
    const { copyProduct, copiedProduct, deleteProduct, loading } = useGlobalProducts();
    const { slugify } = useUtility();

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleting, setDeleting] = useState(false);

    // prezzo e sconto (discount = intero, es. 20 -> 20%)
    const priceNum = Number(product.price) || 0;
    const discountPct = (Number(product.discount) || 0) / 100;
    const discounted = (priceNum * (1 - discountPct)).toFixed(2);

    const price = priceNum.toFixed(2).replace(".", ",");
    const discountedPrice = discounted.replace(".", ",");

    const slug = slugify(product?.title);

    return (
        <div className="product-card">
            {loading && <Spinner />}
            {!product && <p>Errore del server</p>}
            {Object.keys(product).length === 0 && <p>Prodotto non trovato</p>}
            <div className="btn-fav-container">
                <AddToFavButton product={product} />
            </div>

            <figure>
                <Link to={`/product/${slug}-${product?.id}`}>
                    <img src={`/prodotti/${product?.image}`} alt={product.title} />
                </Link>
            </figure>

            <div className="card-content">
                <div>
                    <Link to={`/product/${slug}-${product.id}`}>
                        <h5>{product.title}</h5>
                    </Link>
                </div>

                <div className="price-section">
                    {product.in_promozione ? (
                        <div className="discount-section">
                            <span className="original-price">€ {price}</span>
                            <span className="price">€ {discountedPrice}</span>
                        </div>
                    ) : (
                        <span className="price">€ {price}</span>
                    )}
                </div>

                {(!product?.available || product?.stock === 0) && (
                    <p className="out-of-stock">Prodotto non disponibile</p>
                )}

                {containerButton && <div className="container-button">
                    <Link className="btn-skin-1-btn-xs" to={`/product/edit/${product.id}`}>
                        MODIFICA
                    </Link>

                    <button
                        onClick={() => copyProduct(product)}
                        className={copiedProduct && copiedProduct.codice === product.codice ? "btn-skin-1-btn-xs btn-disabled" : "btn-skin-1-btn-xs"}
                    >
                        {copiedProduct && copiedProduct.codice === product.codice
                            ? "Copiato"
                            : "Copia"}
                    </button>

                    <button
                        className="btn-skin-1-btn-xs"
                        onClick={() => setShowDeleteModal(true)}
                        disabled={deleting}
                        title={deleting ? "Eliminazione in corso..." : ""}
                    >
                        {deleting ? "Rimuovo..." : "Rimuovi"}
                    </button>
                    <input type="checkbox" checked={checked} onChange={() => onToggleSelect(product.id)} />
                </div>}
            </div>

            {product.novita && <span className="news">NOVITÀ</span>}

            <ConfirmModal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={async () => {
                    setDeleting(true);
                    await deleteProduct(product.id); // il card verrà smontato dopo il setProducts del context
                    setShowDeleteModal(false);
                }}
                modalTitle="Conferma eliminazione"
                message={`Sei sicuro di voler eliminare il prodotto "${product.title}"? Questa azione non può essere annullata.`}
            />
        </div>
    );
});
