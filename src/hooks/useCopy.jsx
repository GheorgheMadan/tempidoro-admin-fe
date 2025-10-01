import { useState, useEffect } from "react";

export default function useCopy() {

    const [copiedProduct, setCopiedProduct] = useState(() => {
        const storedCopiedProduct = localStorage.getItem('copiedProduct');
        return storedCopiedProduct ? JSON.parse(storedCopiedProduct) : null;
    });


    useEffect(() => {
        localStorage.setItem('copiedProduct', JSON.stringify(copiedProduct));
    }, [copiedProduct]);

    function normalizeCopiedProduct(copied) {
        if (!copied) return null;

        return {
            categoria: copied.categoria || "",
            brand: copied.brand || "",
            title: copied.title || "",
            // codice e codice_ean li azzero per evitare duplicati
            codice: "",
            codice_ean: "",
            // numeri li porto a stringa per i tuoi input
            price: copied.price != null ? String(copied.price) : "",
            discount: copied.discount != null ? String(copied.discount) : "",
            stock: copied.stock != null ? String(copied.stock) : "",
            description: copied.description || "",
            available: copied.available ?? true,
            in_promozione: copied.in_promozione ?? false,
            in_evidenza: copied.in_evidenza ?? true,
            novita: copied.novita ?? true,
            image: "",
            materiale: copied.materiale || "",
            colore: copied.colore || "",
            finitura: copied.finitura || "",
            tipologia: copied.tipologia || "",
            collezione: copied.collezione || "",
            genere: copied.genere || "",
            confezione: copied.confezione || "",
            garanzia: copied.garanzia || "",
            codice_produttore: copied.codice_produttore || "",
            // DETTAGLI OCCHIALI
            tipo_lenti: copied.tipo_lenti || "",
            // DETTAGLI CINTURINI E OROLOGI
            materiale_cinturino: copied.materiale_cinturino || "",
            tipologia_cinturino: copied.tipologia_cinturino || "",
            // DETTAGLI CINTURINI
            misura_ansa: copied.misura_ansa || "",
            // DETTAGLI OROLOGI
            materiale_cassa: copied.materiale_cassa || "",
            tipologia_movimento: copied.tipologia_movimento || "",
            // ATTRIBUTI SPECIFICI ORECCHINI, ANELLI, CIONDOLI, PORTACHIAVI, COLLANE, BRACCIALI, PREZIOSI, CAVIGLIERE
            pietre: copied.pietre || "",
            // ATTRIBUTI SPECIFICI PREZIOSI
            modello_gioielleria: copied.modello_gioielleria || "",
            // ATTRIBUTI SPECIFICI SOLO ANELLI
            misura_anello: copied.misura_anello || "",
        };
    }


    function copyProduct(product) {
        setCopiedProduct(product)
    }

    function pasteCopiedProduct(product, setProductToAdd) {
        const normalized = normalizeCopiedProduct(product)

        setProductToAdd(normalized)
    }

    const hasCopiedProduct = !!copiedProduct;

    return { copyProduct, copiedProduct, hasCopiedProduct, pasteCopiedProduct, setCopiedProduct }
}