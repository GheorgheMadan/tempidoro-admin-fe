import { useEffect, useMemo, useState } from "react";
import { useGlobalProducts } from "../context/GlobalProducts";
import "../css/addProductStyle.css";
import useUtility from "../hooks/useUtility";
import ConfirmModal from "../components/ConfirmModal";
import AllertModal from "../components/AllertModal";

// import vari componenti del form
import BaseForm from "../components/formComponents/BaseForm";
import LogisticForm from "../components/formComponents/LogisticForm";
import GeneralAtt from "../components/formComponents/GeneralAtt";
import SpecificAtt from "../components/formComponents/SpecificAtt";

export default function AddProduct() {

    const [openModal, setOpenModal] = useState(false)
    const [allertModal, setAllertModal] = useState(false)
    const {
        categoriesList,
        getCategoryFilterList,
        table,
        getTableData,
    } = useGlobalProducts();

    // IMPORTO LA FUNZIONE CHE GESTIRA' IL NOME DELL'IMMAGINE
    const { buildImageFileNameWithExt } = useUtility();

    // stato per dropdown brand
    const [openMenu, setOpenMenu] = useState(null);

    // stato per il prodotto da aggiungere
    const [productToAdd, setProductToAdd] = useState({
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
    });

    // stato per segnare quali campi sono stati "toccati"
    const [touched, setTouched] = useState({});

    // funzione helper → quando un campo perde il focus, lo segno come toccato
    const markTouched = (field) => {
        setTouched((prev) => ({ ...prev, [field]: true }));
    };

    // funzione helper → mostra errore SOLO se il campo è stato toccato e ha un errore
    const showError = (field) => touched[field] && errors[field];

    useEffect(() => {
        productToAdd.categoria && getCategoryFilterList(productToAdd.categoria);
    }, [productToAdd.categoria]);

    // apro il menu e carico i dati dal be in base alla tabella e al campo cliccato
    const handleOpen = async (tableName, fieldKey) => {
        if (table?.tableName !== tableName) {
            await getTableData(tableName);
        }
        setOpenMenu({ table: tableName, field: fieldKey });
    };

    // toggle icona
    const handleToggle = async (tableName, fieldKey) => {
        if (openMenu?.table === tableName) {
            setOpenMenu(null);
        } else {
            await handleOpen(tableName, fieldKey);
        }
    };

    // filtro i dati della tabella in base a quello che scrivo nell'input
    const filteredDataTable = useMemo(() => {
        const list = table?.tableData || [];
        if (!openMenu) return list;
        const q = String(productToAdd[openMenu.field] || "").toLowerCase();
        return list.filter((item) => (item.name || "").toLowerCase().includes(q));
    }, [table, openMenu, productToAdd]);

    // util per sapere se il menu di quella tabella è aperto
    const isOpen = (tableName) => openMenu?.table === tableName;

    // --- HANDLER BASE DELL'IMMAGINE ---
    const handleImageChange = (e) => {
        if (!productToAdd.title?.trim()) {
            return;
        }
        const file = e.target.files?.[0];
        if (!file) return;

        const computedName = buildImageFileNameWithExt(file, productToAdd);

        setProductToAdd((prev) => ({
            ...prev,
            image: computedName,
        }));
    };

    // costante contenete simboli
    const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~"
    // verifico se ci sono caratteri speciali nel nome 
    const isIncludes = symbols.split('').some(symbol => productToAdd.title.includes(symbol))

    // errors con useMemo → si aggiorna solo quando cambia productToAdd
    const errors = useMemo(() => {
        const e = {};

        // se manca la categoria
        if (!productToAdd.categoria.trim()) e.categoria = "Inserisci la categoria!";

        // se manca il titolo
        if (!productToAdd.title.trim()) e.title = "Nome prodotto obbligatorio";
        if (isIncludes) e.title = "Il nome prodotto non può contenere simboli o caratteri speciali"

        // se manca il brand
        if (!productToAdd.brand.trim()) e.brand = "Seleziona un Brand altrimenti verrà segnato 'senza marca'";

        // validazione prezzo
        const price = Number(productToAdd.price);
        if (!price) {
            e.price = "Il prezzo è obbligatorio"
        } else if (isNaN(price)) {
            e.price = "Il prezzo deve contenere solo numeri";
        } else if (price <= 0) {
            e.price = "Il prezzo non può essere minore o uguale a 0";
        }
        // VALIDAZIONE STOCK
        const stock = Number(productToAdd.stock)
        if (isNaN(stock)) {
            e.stock = "Lo stock deve contenere solo numeri"
        } else if (stock < 0) {
            e.stock = "Lo stock non può essere negativo"
        }
        // VALIDAZIONE SCONTO
        const discount = Number(productToAdd.discount)
        if (isNaN(discount)) {
            e.discount = "Lo sconto deve contenere solo numeri"
        } else if (discount < 0) {
            e.discount = "Lo sconto non può essere negativo"
        }
        // VALIDAZIONE CODICE EAN
        const codiceEean = Number(productToAdd.codice_ean)
        if (isNaN(codiceEean)) e.codice_ean = "Il codice EAN deve contenere solo numeri"
        if (productToAdd.codice_ean.length < 8 || productToAdd.codice_ean.length > 13) e.codice_ean = "Il codice EAN non valido"

        if (!productToAdd.image) e.image = "Immagine obbligatoria"

        return e;
    }, [productToAdd]);

    console.log(productToAdd);


    return (
        <>
            <h1 className="form-title">Aggiungi un nuovo prodotto</h1>

            <form className="ap-form">
                <div className="add-product-form-container ap-grid-2 ap-section">
                    {/* *********************************************************************** */}
                    {/* CATEGORIA, TITLE, BRAND E DESCRIZIONE */}
                    {/* *********************************************************************** */}
                    <BaseForm
                        productToAdd={productToAdd}
                        setProductToAdd={setProductToAdd}
                        markTouched={markTouched}
                        categoriesList={categoriesList}
                        errors={errors}
                        showError={showError}
                        isOpen={isOpen}
                        handleOpen={handleOpen}
                        handleToggle={handleToggle}
                        table={table}
                        filteredDataTable={filteredDataTable}
                        setOpenMenu={setOpenMenu}
                    />
                    {/* *********************************************************************** */}
                    {/*PREZZO, SCONTO, STOCK, DISPONIBILE, NOVITA', IN PROMOZIONE, IN EVIDENZA, CODICE, CODICE PRODUTTORE, CODICE EAN CONFEZIONE E GARANZIA */}
                    {/* *********************************************************************** */}
                    <LogisticForm
                        productToAdd={productToAdd}
                        setProductToAdd={setProductToAdd}
                        markTouched={markTouched}
                        errors={errors}
                        showError={showError}
                        filteredDataTable={filteredDataTable}
                    />
                    {/* *********************************************************************** */}
                </div>

                {/* ATTRIBUTI GENERALI GENERE, TIPOLOGIA, COLLEZIONE, MATERIALE, COLORE, FINITURA, IMMAGINE */}
                {/* *********************************************************************** */}
                <h2 className="section-title">Attributi generali</h2>
                <GeneralAtt
                    productToAdd={productToAdd}
                    setProductToAdd={setProductToAdd}
                    markTouched={markTouched}
                    errors={errors}
                    showError={showError}
                    isOpen={isOpen}
                    handleOpen={handleOpen}
                    handleToggle={handleToggle}
                    table={table}
                    filteredDataTable={filteredDataTable}
                    setOpenMenu={setOpenMenu}
                    handleImageChange={handleImageChange}
                />
                {/* *********************************************************************** */}
                {productToAdd.categoria && !productToAdd.categoria === "Sveglie" && !productToAdd.categoria === "Orologi da parete" && (
                    <h2 className="section-title m-bottom">
                        Attributi specifici per categoria
                    </h2>
                )}

                {/* ATTRIBUTI SPECIFICI IN BASE ALLA CATEGORIA */}
                <SpecificAtt
                    productToAdd={productToAdd}
                    setProductToAdd={setProductToAdd}
                    markTouched={markTouched}
                    errors={errors}
                    showError={showError}
                    isOpen={isOpen}
                    handleOpen={handleOpen}
                    handleToggle={handleToggle}
                    table={table}
                    filteredDataTable={filteredDataTable}
                    setOpenMenu={setOpenMenu}
                />

                {/* azioni */}
                <div className="actions ap-section">
                    <button
                        type="submit"
                        disabled={!productToAdd.categoria}
                        className="btn btn-primary"
                        title={!productToAdd.categoria ? "Seleziona una categoria" : ""}
                        onClick={(e) => {
                            e.preventDefault()
                            setOpenModal(true)
                        }}
                    >
                        Aggiungi prodotto
                    </button>
                </div>

                {/* MODALE DI CONFERMA */}
                <ConfirmModal
                    show={openModal}
                    onClose={() => setOpenModal(false)}
                    onConfirm={() => {
                        setOpenModal(false)
                        setAllertModal(true)
                    }}
                    modalTitle="Confermi l'aggiunta del prodotto?"
                />
                <AllertModal
                    show={allertModal}
                    onConfirm={() => setAllertModal(false)}
                />
            </form>
        </>
    );
}
