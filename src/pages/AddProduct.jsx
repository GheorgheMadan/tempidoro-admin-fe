import ProductForm from "../components/ProductForm";
import { useGlobalProducts } from "../context/GlobalProducts";
import ProductCard from "../components/ProductCard";
import { useState, useEffect } from "react";
import ConfirmModal from "../components/ConfirmModal";

export default function AddProduct() {

    const { copiedProduct,
        hasCopiedProduct,
        pasteCopiedProduct,
        setCopiedProduct,
        getCategoryFilterList,
        categoriesList,
        addProduct
    } = useGlobalProducts()

    const [showClearAllert, setShowClearAllert] = useState(false);

    const product = {
        categoria: "",
        brand: "",
        title: "",
        codice: "",
        price: "",
        discount: "",
        description: "",
        available: true,
        stock: "",
        in_promozione: false,
        in_evidenza: true,
        novita: true,
        codice_ean: "",
        image: "",
        materiale: "",
        colore: "",
        finitura: "",
        tipologia: "",
        collezione: "",
        genere: "",
        confezione: "",
        garanzia: "",
        codice_produttore: "",
        // DETTAGLI OCCHIALI
        tipo_lenti: "",
        // DETTAGLI CINTURINI E OROLOGI
        materiale_cinturino: "",
        tipologia_cinturino: "",
        // DETTAGLI CINTURINI
        misura_ansa: "",
        // DETTAGLI OROLOGI
        materiale_cassa: "",
        tipologia_movimento: "",
        // ATTRIBUTI SPECIFICI ORECCHINI, ANELLI, CIONDOLI, PORTACHIAVI, COLLANE, BRACCIALI, PREZIOSI, CAVIGLIERE
        pietre: "",
        // ATTRIBUTI SPECIFICI PREZIOSI
        modello_gioielleria: "",
        // ATTRIBUTI SPECIFICI SOLO ANELLI
        misura_anello: "",
    }

    // stato per il prodotto da aggiungere
    const [productToAdd, setProductToAdd] = useState(() => {
        const stored = sessionStorage.getItem('newProductForm');
        return stored ? JSON.parse(stored) : product;
    });

    useEffect(() => {
        sessionStorage.setItem('newProductForm', JSON.stringify(productToAdd));
    }, [productToAdd]);

    // effetto per caricare le categorie nel select
    useEffect(() => {
        productToAdd.categoria && getCategoryFilterList(productToAdd.categoria);
    }, [productToAdd.categoria]);

    // funzione per incollare il prodotto copiato nel form
    const handlePaste = () => {
        pasteCopiedProduct(copiedProduct, setProductToAdd);
    };

    return (
        <>
            <ProductForm
                textTitle="Aggiungi un nuovo prodotto"
                copiedProductSection={
                    hasCopiedProduct &&
                    <div>
                        <h2 className="section-title m-bottom">Prodotto copiato</h2>
                        <div className="copied-buttons-container">
                            <button onClick={() => handlePaste()}>
                                Incolla
                            </button>
                            <button onClick={() => setCopiedProduct(null)}>
                                Svuota
                            </button>
                        </div>
                        <div className="section-copied-product" >
                            <ProductCard product={copiedProduct} />
                        </div>
                    </div>}
                setProductToAdd={setProductToAdd}
                productToAdd={productToAdd}
                categoriesList={categoriesList}
                fetch={addProduct}
                clearFormButton={
                    <button onClick={() => setShowClearAllert(true)} className="btn red-btn">Svuota</button>
                }

            />
            <ConfirmModal
                show={showClearAllert}
                onClose={() => setShowClearAllert(false)}
                onConfirm={() => {
                    setProductToAdd(product);
                    setShowClearAllert(false);
                }}
                modalTitle="Sei sicuro di voler svuotare il form? Perderai tutti i dati inseriti."
            />
        </>
    )

}
