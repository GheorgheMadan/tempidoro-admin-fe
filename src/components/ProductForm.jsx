import { useMemo, useState } from "react";
import { useGlobalProducts } from "../context/GlobalProducts";
import "../css/addProductStyle.css";
import useUtility from "../hooks/useUtility";
import ConfirmModal from "../components/ConfirmModal";
import AllertModal from "../components/AllertModal";
import { useNavigate } from "react-router-dom";

// import vari componenti del form
import BaseForm from "../components/formComponents/BaseForm";
import LogisticForm from "../components/formComponents/LogisticForm";
import GeneralAtt from "../components/formComponents/GeneralAtt";
import SpecificAtt from "../components/formComponents/SpecificAtt";

export default function ProductForm({ annullaEditButton, textTitle, copiedProductSection, setProductToAdd, productToAdd, categoriesList, mode, fetch, clearFormButton }) {

    const [openModal, setOpenModal] = useState(false)
    const [allertModal, setAllertModal] = useState(false)
    const {
        table,
        getTableData,
        response,
        setResponse,
    } = useGlobalProducts();

    const isEdit = mode === "Edit";

    // IMPORTO LA FUNZIONE CHE GESTIRA' IL NOME DELL'IMMAGINE
    const { buildImageFileNameWithExt, compact, slugify, capitalizeFirst, smartCapitalizeWords } = useUtility();

    // stato per dropdown brand
    const [openMenu, setOpenMenu] = useState(null);

    // stato per segnare quali campi sono stati "toccati"
    const [touched, setTouched] = useState({});

    const [alertErrors, setAlertErrors] = useState([])

    // funzione helper → quando un campo perde il focus, lo segno come toccato
    const markTouched = (field) => {
        setTouched((prev) => ({ ...prev, [field]: true }));
    };

    // funzione helper → mostra errore SOLO se il campo è stato toccato e ha un errore
    const showError = (field) => touched[field] && errors[field];

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

    // errors con useMemo → si aggiorna solo quando cambia productToAdd
    const errors = useMemo(() => {
        const e = {};

        // se manca la categoria
        if (!productToAdd?.categoria.trim() && !isEdit) e.categoria = "Inserisci la categoria!";

        // se manca il titolo
        if (!productToAdd?.title.trim()) e.title = "Nome prodotto obbligatorio";

        // se manca il brand
        if (!productToAdd?.brand.trim()) e.brand = "Seleziona un Brand altrimenti verrà segnato 'senza marca'";

        // validazione prezzo
        const price = Number(productToAdd?.price);
        if (!price) {
            e.price = "Il prezzo è obbligatorio"
        } else if (isNaN(price)) {
            e.price = "Il prezzo deve contenere solo numeri";
        } else if (price <= 0) {
            e.price = "Il prezzo non può essere minore o uguale a 0";
        }
        // VALIDAZIONE STOCK
        const stock = Number(productToAdd?.stock)
        if (isNaN(stock)) {
            e.stock = "Lo stock deve contenere solo numeri"
        } else if (stock < 0) {
            e.stock = "Lo stock non può essere negativo"
        }
        // VALIDAZIONE SCONTO
        const discount = Number(productToAdd?.discount)
        if (isNaN(discount)) {
            e.discount = "Lo sconto deve contenere solo numeri"
        } else if (discount < 0) {
            e.discount = "Lo sconto non può essere negativo"
        }
        // VALIDAZIONE CODICE EAN
        const codiceEean = Number(productToAdd?.codice_ean)
        if (isNaN(codiceEean)) e.codice_ean = "Il codice EAN deve contenere solo numeri"
        if (productToAdd?.codice_ean.length < 8 || productToAdd?.codice_ean.length > 13) e.codice_ean = "Il codice EAN non valido"

        if (!productToAdd?.image && !isEdit) e.image = "Immagine obbligatoria"

        return e;
    }, [productToAdd]);

    const handleSubmit = async () => {
        // pulisco eventuali errori precedenti
        setAlertErrors([]);

        // se ci sono errori di validazione...
        if (Object.keys(errors).length) {
            setTouched(Object.fromEntries(Object.keys(productToAdd).map(k => [k, true])));
            const list = Object.values(errors);
            setAlertErrors(list);        // PASSO UN ARRAY
            return false;                // segnalo che NON va avanti
        }

        if (!productToAdd.categoria) return;

        // base comune
        const baseProduct = {
            categoria: capitalizeFirst(productToAdd.categoria),
            brand: capitalizeFirst(productToAdd.brand || "Senza marca"),
            title: smartCapitalizeWords(productToAdd.title),
            codice: productToAdd.codice,
            // tipizza i numeri
            price: Number(productToAdd.price),
            discount: Number(productToAdd.discount),
            description: productToAdd.description,
            available: productToAdd.available,
            stock: Number(productToAdd.stock),
            in_promozione: productToAdd.in_promozione,
            in_evidenza: productToAdd.in_evidenza,
            novita: productToAdd.novita,
            // EAN lo lascio stringa perché potrebbe avere zeri iniziali
            codice_ean: productToAdd.codice_ean,
            image: productToAdd.image,
            // attributi generali
            materiale: capitalizeFirst(productToAdd.materiale),
            colore: capitalizeFirst(productToAdd.colore),
            finitura: capitalizeFirst(productToAdd.finitura),
            tipologia: capitalizeFirst(productToAdd.tipologia),
            collezione: capitalizeFirst(productToAdd.collezione),
            genere: capitalizeFirst(productToAdd.genere),
            confezione: capitalizeFirst(productToAdd.confezione),
            garanzia: capitalizeFirst(productToAdd.garanzia),
            codice_produttore: productToAdd.codice_produttore,
        };

        // specifici gioielleria “base”
        const baseGioielleria = { ...baseProduct, pietre: productToAdd.pietre };

        // aggiunte per categoria
        let finalProduct;
        const cat = productToAdd.categoria;

        if (cat === "Occhiali da sole" || cat === "Montature da vista") {
            finalProduct = { ...baseProduct, tipo_lenti: productToAdd.tipo_lenti };
        } else if (cat === "Cinturini") {
            finalProduct = {
                ...baseProduct,
                tipologia_cinturino: capitalizeFirst(productToAdd.tipologia_cinturino),
                materiale_cinturino: capitalizeFirst(productToAdd.materiale_cinturino),
                misura_ansa: capitalizeFirst(productToAdd.misura_ansa),
            };
        } else if (cat === "Orologi") {
            finalProduct = {
                ...baseProduct,
                tipologia_cinturino: capitalizeFirst(productToAdd.tipologia_cinturino),
                materiale_cinturino: capitalizeFirst(productToAdd.materiale_cinturino),
                materiale_cassa: capitalizeFirst(productToAdd.materiale_cassa),
                tipologia_movimento: capitalizeFirst(productToAdd.tipologia_movimento),
            };
        } else if (
            cat === "Orecchini" ||
            cat === "Ciondoli" ||
            cat === "Portachiavi" ||
            cat === "Collane" ||
            cat === "Bracciali" ||
            cat === "Cavigliere"
        ) {
            finalProduct = baseGioielleria;
        } else if (cat === "Anelli") {
            finalProduct = { ...baseGioielleria, misura_anello: capitalizeFirst(productToAdd.misura_anello) };
        } else if (cat === "Preziosi") {
            finalProduct = { ...baseGioielleria, modello_gioielleria: capitalizeFirst(productToAdd.modello_gioielleria) };
        } else if (cat === "Sveglie" || cat === "Orologi da parete") {
            finalProduct = baseProduct;
        } else {
            // fallback: prendi il base + compatta (così non mandi mille chiavi vuote)
            finalProduct = baseProduct;
        }

        // pulizia finale: niente stringhe vuote, niente null/undefined
        finalProduct = compact(finalProduct);

        if (isEdit) {
            await fetch(productToAdd.id, finalProduct);
        } else {
            await fetch(finalProduct);
        }

        setAlertErrors([]);
        return true;
    };

    // genero lo slug per la navigazione dopo il submit
    const slug = slugify(productToAdd?.title);

    const navigate = useNavigate()

    console.log(response);

    return (
        <>
            <h1 className="form-title">{textTitle}</h1>
            {copiedProductSection}
            {clearFormButton}
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
                        mode={mode}
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
                {productToAdd?.categoria && productToAdd?.categoria !== "Sveglie" && productToAdd?.categoria !== "Orologi da parete" && (
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
                    {annullaEditButton}
                    <button
                        type="submit"
                        disabled={!productToAdd?.categoria}
                        className="btn btn-primary"
                        title={!productToAdd?.categoria ? "Seleziona una categoria" : ""}
                        onClick={(e) => {
                            e.preventDefault()
                            setOpenModal(true)
                        }}
                    >
                        {isEdit ? "Salva modifiche" : "Aggiungi prodotto"}
                    </button>
                </div>

                {/* MODALE DI CONFERMA */}
                <ConfirmModal
                    show={openModal}
                    onClose={() => setOpenModal(false)}
                    onConfirm={async () => {
                        await handleSubmit()
                        setOpenModal(false)
                        setAllertModal(true)
                    }}
                    modalTitle={isEdit ? "Confermi la modifica?" : "Confermi l'aggiunta del prodotto?"}
                />
                <AllertModal
                    show={allertModal}
                    onConfirm={() => {
                        const id = mode === "Edit" ? productToAdd?.id : response?.productId;
                        if (response?.success) {
                            navigate(`/product/${slug}-${id}`);
                        }
                        if (mode === "Edit") {
                            setProductToAdd(null)
                        }
                        setAllertModal(false)
                    }}
                    text={response?.message}
                    errors={alertErrors}
                />
            </form>
        </>
    );
}