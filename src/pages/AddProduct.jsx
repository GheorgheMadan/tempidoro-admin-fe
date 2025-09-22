import { useEffect, useMemo, useState } from "react";
import { useGlobalProducts } from "../context/GlobalProducts";
import InputProductDetail from "../components/InputProductDetail";
import "../css/addProductStyle.css";
import useUtility from "../hooks/useUtility";

export default function AddProduct() {
    const {
        categoriesList,
        getCategoryFilterList,
        table,
        getTableData,
    } = useGlobalProducts();

    const { buildImageFileNameWithExt } = useUtility();

    // stato per dropdown brand
    const [openMenu, setOpenMenu] = useState(null);

    // stato per il prodotto da aggiungere
    const [productToAdd, setProductToAdd] = useState({
        categoria: "", // fatto
        brand: "", // fatto
        title: "", // fatto
        codice: "", // fatto
        price: 0, // fatto
        discount: 0, // fatto
        description: "", // fatto
        available: true, // fatto
        stock: 0, // fatto
        in_promozione: false, // fatto
        in_evidenza: true, // fatto
        novita: true, // fatto
        codice_ean: "", // fatto
        image: "", // fatto
        materiale: "", // fatto
        colore: "", // fatto
        finitura: "", // fatto
        tipologia: "", // fatto
        collezione: "", // fatto
        genere: "", // fatto
        confezione: "", // fatto
        garanzia: "", // fatto
        codice_produttore: "", // fatto
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

    // carico una volta i brand
    useEffect(() => {
        getTableData("brands");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        productToAdd.categoria && getCategoryFilterList(productToAdd.categoria);
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

    // --- HANDLER BASE ---
    const handleImageChange = (e) => {
        if (!productToAdd.title?.trim()) {
            alert(
                "Inserisci prima il Nome prodotto: senza titolo il nome immagine sarà generico."
            );
            return;
        }
        const file = e.target.files?.[0];
        if (!file) return;

        const computedName = buildImageFileNameWithExt(file, productToAdd);

        setProductToAdd((prev) => ({
            ...prev,
            image: computedName,
        }));

        console.log("Nome immagine calcolato:", computedName);
    };

    return (
        <>
            <h1 className="form-title">Aggiungi un nuovo prodotto</h1>

            <form className="ap-form">
                <div className="add-product-form-container ap-grid-2 ap-section">
                    <div className="ap-col right-border m-bottom">
                        <h2 className="section-title">Base</h2>

                        {/* categoria */}
                        <div className="input-container">
                            <label className="field-label">Scegli la categoria</label>
                            <div className="input-icon-container">
                                <select
                                    className="field-input"
                                    value={productToAdd.categoria}
                                    onChange={(e) =>
                                        setProductToAdd({
                                            ...productToAdd,
                                            categoria: e.target.value,
                                        })
                                    }
                                >
                                    <option value="">-- seleziona una categoria --</option>
                                    {categoriesList.map((category, i) => (
                                        <option key={i} value={category.category_name}>
                                            {category.category_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* nome prodotto */}
                        <div className="input-container">
                            <label className="field-label">Nome prodotto</label>
                            <div className="input-icon-container">
                                <input
                                    className="field-input"
                                    type="text"
                                    value={productToAdd.title}
                                    onChange={(e) =>
                                        setProductToAdd({ ...productToAdd, title: e.target.value })
                                    }
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setProductToAdd({ ...productToAdd, title: "" })
                                    }
                                    className="delete-input-icon"
                                    aria-label="Pulisci Nome prodotto"
                                    title="Pulisci"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>

                        {/* brand con dropdown */}
                        <InputProductDetail
                            productToAdd={productToAdd}
                            setProductToAdd={setProductToAdd}
                            isOpen={isOpen("brands")}
                            handleOpen={() => handleOpen("brands", "brand")}
                            table={table}
                            filteredDataTable={filteredDataTable}
                            inputName={"brand"}
                            handleToggle={() => handleToggle("brands", "brand")}
                            setOpenMenu={setOpenMenu}
                            nameField={"Brand"}
                            changeInput={(e) =>
                                setProductToAdd({ ...productToAdd, brand: e.target.value })
                            }
                            inputValue={productToAdd.brand}
                            handleClick={(item) =>
                                setProductToAdd({ ...productToAdd, brand: item.name })
                            }
                            deleteInput={() =>
                                setProductToAdd({ ...productToAdd, brand: "" })
                            }
                        />

                        {/* description */}
                        <div className="input-container">
                            <label className="field-label">Descrizione</label>
                            <div className="input-icon-container">
                                <textarea
                                    className="field-input"
                                    name="description"
                                    value={productToAdd.description}
                                    onChange={(e) =>
                                        setProductToAdd({
                                            ...productToAdd,
                                            description: e.target.value,
                                        })
                                    }
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setProductToAdd({ ...productToAdd, description: "" })
                                    }
                                    className="delete-input-icon"
                                    aria-label="Pulisci Descrizione"
                                    title="Pulisci"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="ap-col m-bottom">
                        <h2 className="section-title">Prezzo & Stock</h2>

                        {/* prezzo / sconto / stock */}
                        <div className="row-container ap-row-wrap">
                            {/* prezzo */}
                            <div className="input-container">
                                <label className="field-label">Prezzo (€)</label>
                                <div className="input-icon-container">
                                    <input
                                        className="field-input"
                                        type="number"
                                        value={productToAdd.price}
                                        onChange={(e) =>
                                            setProductToAdd({
                                                ...productToAdd,
                                                price: parseFloat(e.target.value || 0),
                                            })
                                        }
                                        min="0"
                                        step="1"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setProductToAdd({ ...productToAdd, price: 0 })
                                        }
                                        className="delete-input-icon right-22px"
                                        aria-label="Azzera prezzo"
                                        title="Azzera"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>

                            {/* Discount */}
                            <div className="input-container">
                                <label className="field-label">Sconto (%)</label>
                                <div className="input-icon-container">
                                    <input
                                        className="field-input"
                                        type="number"
                                        value={productToAdd.discount}
                                        onChange={(e) =>
                                            setProductToAdd({
                                                ...productToAdd,
                                                discount: parseFloat(e.target.value || 0),
                                            })
                                        }
                                        min="0"
                                        step="1"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setProductToAdd({ ...productToAdd, discount: 0 })
                                        }
                                        className="delete-input-icon right-22px"
                                        aria-label="Azzera sconto"
                                        title="Azzera"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>

                            {/* Stock */}
                            <div className="input-container">
                                <label className="field-label">Stock</label>
                                <div className="input-icon-container">
                                    <input
                                        className="field-input"
                                        type="number"
                                        value={productToAdd.stock}
                                        onChange={(e) =>
                                            setProductToAdd({
                                                ...productToAdd,
                                                stock: parseFloat(e.target.value || 0),
                                            })
                                        }
                                        min="0"
                                        step="1"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setProductToAdd({ ...productToAdd, stock: 0 })
                                        }
                                        className="delete-input-icon right-22px"
                                        aria-label="Azzera stock"
                                        title="Azzera"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* RADIO: disponibile / novità / promo / evidenza */}
                        <div className="row-container ap-row-wrap">
                            <div className="input-container">
                                <span className="checkbox-label">Disponibile</span>
                                <div className="row-container right-border ap-radio-group">
                                    <label className="row-container ap-radio-option">
                                        <input
                                            type="radio"
                                            name="disponibile"
                                            value="true"
                                            checked={productToAdd.available === true}
                                            onChange={(e) =>
                                                setProductToAdd((p) => ({
                                                    ...p,
                                                    available: e.target.value === "true",
                                                }))
                                            }
                                        />
                                        <span>Sì</span>
                                    </label>

                                    <label className="row-container ap-radio-option">
                                        <input
                                            type="radio"
                                            name="disponibile"
                                            value="false"
                                            checked={productToAdd.available === false}
                                            onChange={(e) =>
                                                setProductToAdd((p) => ({
                                                    ...p,
                                                    available: e.target.value === "true",
                                                }))
                                            }
                                        />
                                        <span>No</span>
                                    </label>
                                </div>
                            </div>

                            <div className="input-container">
                                <span className="checkbox-label">Novità</span>
                                <div className="row-container right-border ap-radio-group">
                                    <label className="row-container ap-radio-option">
                                        <input
                                            type="radio"
                                            name="novita"
                                            value="true"
                                            checked={productToAdd.novita === true}
                                            onChange={(e) =>
                                                setProductToAdd((p) => ({
                                                    ...p,
                                                    novita: e.target.value === "true",
                                                }))
                                            }
                                        />
                                        <span>Sì</span>
                                    </label>

                                    <label className="row-container ap-radio-option">
                                        <input
                                            type="radio"
                                            name="novita"
                                            value="false"
                                            checked={productToAdd.novita === false}
                                            onChange={(e) =>
                                                setProductToAdd((p) => ({
                                                    ...p,
                                                    novita: e.target.value === "true",
                                                }))
                                            }
                                        />
                                        <span>No</span>
                                    </label>
                                </div>
                            </div>

                            <div className="input-container">
                                <span className="checkbox-label">In promozione</span>
                                <div className="row-container right-border ap-radio-group">
                                    <label className="row-container ap-radio-option">
                                        <input
                                            type="radio"
                                            name="in_promozione"
                                            value="true"
                                            checked={productToAdd.in_promozione === true}
                                            onChange={(e) =>
                                                setProductToAdd((p) => ({
                                                    ...p,
                                                    in_promozione: e.target.value === "true",
                                                }))
                                            }
                                        />
                                        <span>Sì</span>
                                    </label>

                                    <label className="row-container ap-radio-option">
                                        <input
                                            type="radio"
                                            name="in_promozione"
                                            value="false"
                                            checked={productToAdd.in_promozione === false}
                                            onChange={(e) =>
                                                setProductToAdd((p) => ({
                                                    ...p,
                                                    in_promozione: e.target.value === "true",
                                                }))
                                            }
                                        />
                                        <span>No</span>
                                    </label>
                                </div>
                            </div>

                            <div className="input-container">
                                <span className="checkbox-label">In evidenza</span>
                                <div className="row-container ap-radio-group">
                                    <label className="row-container ap-radio-option">
                                        <input
                                            type="radio"
                                            name="in_evidenza"
                                            value="true"
                                            checked={productToAdd.in_evidenza === true}
                                            onChange={(e) =>
                                                setProductToAdd((p) => ({
                                                    ...p,
                                                    in_evidenza: e.target.value === "true",
                                                }))
                                            }
                                        />
                                        <span>Sì</span>
                                    </label>

                                    <label className="row-container ap-radio-option">
                                        <input
                                            type="radio"
                                            name="in_evidenza"
                                            value="false"
                                            checked={productToAdd.in_evidenza === false}
                                            onChange={(e) =>
                                                setProductToAdd((p) => ({
                                                    ...p,
                                                    in_evidenza: e.target.value === "true",
                                                }))
                                            }
                                        />
                                        <span>No</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* sezione logistica codici */}
                        <div className="ap-section">
                            <div className="row-container2 ap-grid-2 gap-20">
                                {/* CODICE */}
                                <div className="input-container">
                                    <label className="field-label">Codice</label>
                                    <div className="input-icon-container">
                                        <input
                                            className="field-input"
                                            type="text"
                                            name="codice"
                                            value={productToAdd.codice}
                                            onChange={(e) =>
                                                setProductToAdd({
                                                    ...productToAdd,
                                                    codice: e.target.value,
                                                })
                                            }
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setProductToAdd({ ...productToAdd, codice: "" })
                                            }
                                            className="delete-input-icon right-22px"
                                            aria-label="Pulisci Codice"
                                            title="Pulisci"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </div>

                                {/* CODICE EAN */}
                                <div className="input-container">
                                    <label className="field-label">Codice EAN</label>
                                    <div className="input-icon-container">
                                        <input
                                            className="field-input"
                                            type="text"
                                            name="codice_ean"
                                            value={productToAdd.codice_ean}
                                            onChange={(e) =>
                                                setProductToAdd({
                                                    ...productToAdd,
                                                    codice_ean: e.target.value,
                                                })
                                            }
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setProductToAdd({ ...productToAdd, codice_ean: "" })
                                            }
                                            className="delete-input-icon right-22px"
                                            aria-label="Pulisci EAN"
                                            title="Pulisci"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* CODICE PRODUTTORE */}
                            <div className="input-container">
                                <label className="field-label">Codice Produttore</label>
                                <div className="input-icon-container">
                                    <input
                                        className="field-input width-100"
                                        type="text"
                                        name="codice_produttore"
                                        value={productToAdd.codice_produttore}
                                        onChange={(e) =>
                                            setProductToAdd({
                                                ...productToAdd,
                                                codice_produttore: e.target.value,
                                            })
                                        }
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setProductToAdd({
                                                ...productToAdd,
                                                codice_produttore: "",
                                            })
                                        }
                                        className="delete-input-icon right-22px"
                                        aria-label="Pulisci Codice Produttore"
                                        title="Pulisci"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>

                            {/* CONFEZIONE */}
                            <div className="input-container">
                                <label className="field-label">Confezione</label>
                                <div className="input-icon-container">
                                    <input
                                        className="field-input width-100"
                                        type="text"
                                        name="confezione"
                                        value={productToAdd.confezione}
                                        onChange={(e) =>
                                            setProductToAdd({
                                                ...productToAdd,
                                                confezione: e.target.value,
                                            })
                                        }
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setProductToAdd({ ...productToAdd, confezione: "" })
                                        }
                                        className="delete-input-icon right-22px"
                                        aria-label="Pulisci Confezione"
                                        title="Pulisci"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>

                            {/* GARANZIA */}
                            <div className="input-container">
                                <label className="field-label">Garanzia</label>
                                <div className="input-icon-container">
                                    <input
                                        className="field-input width-100"
                                        type="text"
                                        name="garanzia"
                                        value={productToAdd.garanzia}
                                        onChange={(e) =>
                                            setProductToAdd({
                                                ...productToAdd,
                                                garanzia: e.target.value,
                                            })
                                        }
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setProductToAdd({ ...productToAdd, garanzia: "" })
                                        }
                                        className="delete-input-icon right-22px"
                                        aria-label="Pulisci Garanzia"
                                        title="Pulisci"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <h2 className="section-title">Attributi generali</h2>

                <div className="ap-section">
                    <div className="row-container3 right-border">
                        <InputProductDetail
                            productToAdd={productToAdd}
                            setProductToAdd={setProductToAdd}
                            isOpen={isOpen("genere")}
                            handleOpen={() => handleOpen("genere", "genere")}
                            table={table}
                            filteredDataTable={filteredDataTable}
                            inputName={"genere"}
                            handleToggle={() => handleToggle("genere", "genere")}
                            setOpenMenu={setOpenMenu}
                            nameField={"Genere"}
                            changeInput={(e) =>
                                setProductToAdd({ ...productToAdd, genere: e.target.value })
                            }
                            inputValue={productToAdd.genere}
                            handleClick={(item) =>
                                setProductToAdd({ ...productToAdd, genere: item.name })
                            }
                            deleteInput={() =>
                                setProductToAdd({ ...productToAdd, genere: "" })
                            }
                        />

                        <InputProductDetail
                            productToAdd={productToAdd}
                            setProductToAdd={setProductToAdd}
                            isOpen={isOpen("tipologia")}
                            handleOpen={() => handleOpen("tipologia", "tipologia")}
                            table={table}
                            filteredDataTable={filteredDataTable}
                            inputName={"tipologia"}
                            handleToggle={() => handleToggle("tipologia", "tipologia")}
                            setOpenMenu={setOpenMenu}
                            nameField={"Tipologia"}
                            changeInput={(e) =>
                                setProductToAdd({ ...productToAdd, tipologia: e.target.value })
                            }
                            inputValue={productToAdd.tipologia}
                            handleClick={(item) =>
                                setProductToAdd({ ...productToAdd, tipologia: item.name })
                            }
                            deleteInput={() =>
                                setProductToAdd({ ...productToAdd, tipologia: "" })
                            }
                        />

                        <InputProductDetail
                            productToAdd={productToAdd}
                            setProductToAdd={setProductToAdd}
                            isOpen={isOpen("collezione")}
                            handleOpen={() => handleOpen("collezione", "collezione")}
                            table={table}
                            filteredDataTable={filteredDataTable}
                            inputName={"collezione"}
                            handleToggle={() => handleToggle("collezione", "collezione")}
                            setOpenMenu={setOpenMenu}
                            nameField={"Collezione"}
                            changeInput={(e) =>
                                setProductToAdd({ ...productToAdd, collezione: e.target.value })
                            }
                            inputValue={productToAdd.collezione}
                            handleClick={(item) =>
                                setProductToAdd({ ...productToAdd, collezione: item.name })
                            }
                            deleteInput={() =>
                                setProductToAdd({ ...productToAdd, collezione: "" })
                            }
                        />
                    </div>

                    <div className="row-container3 right-border">
                        {/* materiale con dropdown */}
                        <InputProductDetail
                            productToAdd={productToAdd}
                            setProductToAdd={setProductToAdd}
                            isOpen={isOpen("materiale")}
                            handleOpen={() => handleOpen("materiale", "materiale")}
                            table={table}
                            filteredDataTable={filteredDataTable}
                            inputName={"materiale"}
                            handleToggle={() => handleToggle("materiale", "materiale")}
                            setOpenMenu={setOpenMenu}
                            nameField={"Materiale"}
                            changeInput={(e) =>
                                setProductToAdd({ ...productToAdd, materiale: e.target.value })
                            }
                            inputValue={productToAdd.materiale}
                            handleClick={(item) =>
                                setProductToAdd({ ...productToAdd, materiale: item.name })
                            }
                            deleteInput={() =>
                                setProductToAdd({ ...productToAdd, materiale: "" })
                            }
                        />

                        <InputProductDetail
                            productToAdd={productToAdd}
                            setProductToAdd={setProductToAdd}
                            isOpen={isOpen("colore")}
                            handleOpen={() => handleOpen("colore", "colore")}
                            table={table}
                            filteredDataTable={filteredDataTable}
                            inputName={"colore"}
                            handleToggle={() => handleToggle("colore", "colore")}
                            setOpenMenu={setOpenMenu}
                            nameField={"Colore"}
                            changeInput={(e) =>
                                setProductToAdd({ ...productToAdd, colore: e.target.value })
                            }
                            inputValue={productToAdd.colore}
                            handleClick={(item) =>
                                setProductToAdd({ ...productToAdd, colore: item.name })
                            }
                            deleteInput={() =>
                                setProductToAdd({ ...productToAdd, colore: "" })
                            }
                        />

                        <InputProductDetail
                            productToAdd={productToAdd}
                            setProductToAdd={setProductToAdd}
                            isOpen={isOpen("finitura")}
                            handleOpen={() => handleOpen("finitura", "finitura")}
                            table={table}
                            filteredDataTable={filteredDataTable}
                            inputName={"finitura"}
                            handleToggle={() => handleToggle("finitura", "finitura")}
                            setOpenMenu={setOpenMenu}
                            nameField={"Finitura"}
                            changeInput={(e) =>
                                setProductToAdd({ ...productToAdd, finitura: e.target.value })
                            }
                            inputValue={productToAdd.finitura}
                            handleClick={(item) =>
                                setProductToAdd({ ...productToAdd, finitura: item.name })
                            }
                            deleteInput={() =>
                                setProductToAdd({ ...productToAdd, finitura: "" })
                            }
                        />
                    </div>

                    {/* Immagine */}
                    <div className="input-container m-bottom">
                        <label className="field-label">Immagine</label>
                        <div className="input-icon-container">
                            <input
                                className="field-input width-100"
                                type="file"
                                name="image"
                                accept=".jpg,.jpeg,.png,.webp,.avif"
                                onChange={handleImageChange}
                                disabled={!productToAdd.title.trim()}
                            />
                            <button
                                type="button"
                                onClick={() => setProductToAdd({ ...productToAdd, image: "" })}
                                className="delete-input-icon right-22px"
                                aria-label="Pulisci immagine"
                                title="Pulisci"
                            >
                                ✕
                            </button>
                        </div>
                        {!productToAdd.title.trim() && (
                            <small className="ap-hint">
                                Inserisci il Nome prodotto per abilitare il caricamento immagine.
                            </small>
                        )}
                    </div>
                </div>

                {productToAdd.categoria && (
                    <h2 className="section-title m-bottom">
                        Attributi specifici per categoria
                    </h2>
                )}

                {/* Attributi specifici per gli occhiali */}
                {(productToAdd.categoria === "Occhiali da sole" ||
                    productToAdd.categoria === "Montature da vista" ||
                    productToAdd.categoria === "Outlet") && (
                        <InputProductDetail
                            productToAdd={productToAdd}
                            setProductToAdd={setProductToAdd}
                            isOpen={isOpen("tipo_lenti")}
                            handleOpen={() => handleOpen("tipo_lenti", "tipo_lenti")}
                            table={table}
                            filteredDataTable={filteredDataTable}
                            inputName={"tipo_lenti"}
                            handleToggle={() => handleToggle("tipo_lenti", "tipo_lenti")}
                            setOpenMenu={setOpenMenu}
                            nameField={"Tipo Lenti"}
                            changeInput={(e) =>
                                setProductToAdd({ ...productToAdd, tipo_lenti: e.target.value })
                            }
                            inputValue={productToAdd.tipo_lenti}
                            handleClick={(item) =>
                                setProductToAdd({ ...productToAdd, tipo_lenti: item.name })
                            }
                            deleteInput={() =>
                                setProductToAdd({ ...productToAdd, tipo_lenti: "" })
                            }
                        />
                    )}

                {/* Attributi specifici per CINTURINI e OROLOGI */}
                {(productToAdd.categoria === "Cinturini" ||
                    productToAdd.categoria === "Orologi" ||
                    productToAdd.categoria === "Outlet") && (
                        <div className="ap-section">
                            <InputProductDetail
                                productToAdd={productToAdd}
                                setProductToAdd={setProductToAdd}
                                isOpen={isOpen("tipologia_cinturino")}
                                handleOpen={() =>
                                    handleOpen("tipologia_cinturino", "tipologia_cinturino")
                                }
                                table={table}
                                filteredDataTable={filteredDataTable}
                                inputName={"tipologia_cinturino"}
                                handleToggle={() =>
                                    handleToggle("tipologia_cinturino", "tipologia_cinturino")
                                }
                                setOpenMenu={setOpenMenu}
                                nameField={"Tipologia Cinturino"}
                                changeInput={(e) =>
                                    setProductToAdd({
                                        ...productToAdd,
                                        tipologia_cinturino: e.target.value,
                                    })
                                }
                                inputValue={productToAdd.tipologia_cinturino}
                                handleClick={(item) =>
                                    setProductToAdd({
                                        ...productToAdd,
                                        tipologia_cinturino: item.name,
                                    })
                                }
                                deleteInput={() =>
                                    setProductToAdd({ ...productToAdd, tipologia_cinturino: "" })
                                }
                            />

                            <InputProductDetail
                                productToAdd={productToAdd}
                                setProductToAdd={setProductToAdd}
                                isOpen={isOpen("materiale_cinturino")}
                                handleOpen={() =>
                                    handleOpen("materiale_cinturino", "materiale_cinturino")
                                }
                                table={table}
                                filteredDataTable={filteredDataTable}
                                inputName={"materiale_cinturino"}
                                handleToggle={() =>
                                    handleToggle("materiale_cinturino", "materiale_cinturino")
                                }
                                setOpenMenu={setOpenMenu}
                                nameField={"Materiale Cinturino"}
                                changeInput={(e) =>
                                    setProductToAdd({
                                        ...productToAdd,
                                        materiale_cinturino: e.target.value,
                                    })
                                }
                                inputValue={productToAdd.materiale_cinturino}
                                handleClick={(item) =>
                                    setProductToAdd({
                                        ...productToAdd,
                                        materiale_cinturino: item.name,
                                    })
                                }
                                deleteInput={() =>
                                    setProductToAdd({ ...productToAdd, materiale_cinturino: "" })
                                }
                            />
                        </div>
                    )}

                {/* ATTRIBUTI SPECIFICI SOLO PER CINTURINI */}
                {(productToAdd.categoria === "Cinturini" ||
                    productToAdd.categoria === "Outlet") && (
                        <InputProductDetail
                            productToAdd={productToAdd}
                            setProductToAdd={setProductToAdd}
                            isOpen={isOpen("misura_ansa")}
                            handleOpen={() => handleOpen("misura_ansa", "misura_ansa")}
                            table={table}
                            filteredDataTable={filteredDataTable}
                            inputName={"misura_ansa"}
                            handleToggle={() => handleToggle("misura_ansa", "misura_ansa")}
                            setOpenMenu={setOpenMenu}
                            nameField={"Misura Ansa"}
                            changeInput={(e) =>
                                setProductToAdd({ ...productToAdd, misura_ansa: e.target.value })
                            }
                            inputValue={productToAdd.misura_ansa}
                            handleClick={(item) =>
                                setProductToAdd({ ...productToAdd, misura_ansa: item.name })
                            }
                            deleteInput={() =>
                                setProductToAdd({ ...productToAdd, misura_ansa: "" })
                            }
                        />
                    )}

                {/* ATTRIBUTI SPECIFICI SOLO PER OROLOGI */}
                {(productToAdd.categoria === "Orologi" ||
                    productToAdd.categoria === "Outlet") && (
                        <div className="ap-section">
                            <InputProductDetail
                                productToAdd={productToAdd}
                                setProductToAdd={setProductToAdd}
                                isOpen={isOpen("materiale_cassa")}
                                handleOpen={() =>
                                    handleOpen("materiale_cassa", "materiale_cassa")
                                }
                                table={table}
                                filteredDataTable={filteredDataTable}
                                inputName={"materiale_cassa"}
                                handleToggle={() =>
                                    handleToggle("materiale_cassa", "materiale_cassa")
                                }
                                setOpenMenu={setOpenMenu}
                                nameField={"Materiale Cassa"}
                                changeInput={(e) =>
                                    setProductToAdd({
                                        ...productToAdd,
                                        materiale_cassa: e.target.value,
                                    })
                                }
                                inputValue={productToAdd.materiale_cassa}
                                handleClick={(item) =>
                                    setProductToAdd({
                                        ...productToAdd,
                                        materiale_cassa: item.name,
                                    })
                                }
                                deleteInput={() =>
                                    setProductToAdd({ ...productToAdd, materiale_cassa: "" })
                                }
                            />

                            <InputProductDetail
                                productToAdd={productToAdd}
                                setProductToAdd={setProductToAdd}
                                isOpen={isOpen("tipologia_movimento")}
                                handleOpen={() =>
                                    handleOpen("tipologia_movimento", "tipologia_movimento")
                                }
                                table={table}
                                filteredDataTable={filteredDataTable}
                                inputName={"tipologia_movimento"}
                                handleToggle={() =>
                                    handleToggle("tipologia_movimento", "tipologia_movimento")
                                }
                                setOpenMenu={setOpenMenu}
                                nameField={"Tipologia Movimento"}
                                changeInput={(e) =>
                                    setProductToAdd({
                                        ...productToAdd,
                                        tipologia_movimento: e.target.value,
                                    })
                                }
                                inputValue={productToAdd.tipologia_movimento}
                                handleClick={(item) =>
                                    setProductToAdd({
                                        ...productToAdd,
                                        tipologia_movimento: item.name,
                                    })
                                }
                                deleteInput={() =>
                                    setProductToAdd({ ...productToAdd, tipologia_movimento: "" })
                                }
                            />
                        </div>
                    )}

                {/* ATTRIBUTI SPECIFICI ORECCHINI, ANELLI, CIONDOLI, PORTACHIAVI, COLLANE, BRACCIALI, CAVIGLIERE, PREZIOSI */}
                {(productToAdd.categoria === "Orecchini" ||
                    productToAdd.categoria === "Ciondoli" ||
                    productToAdd.categoria === "Portachiavi" ||
                    productToAdd.categoria === "Collane" ||
                    productToAdd.categoria === "Bracciali" ||
                    productToAdd.categoria === "Preziosi" ||
                    productToAdd.categoria === "Cavigliere" ||
                    productToAdd.categoria === "Anelli" ||
                    productToAdd.categoria === "Outlet") && (
                        <InputProductDetail
                            productToAdd={productToAdd}
                            setProductToAdd={setProductToAdd}
                            isOpen={isOpen("pietre")}
                            handleOpen={() => handleOpen("pietre", "pietre")}
                            table={table}
                            filteredDataTable={filteredDataTable}
                            inputName={"pietre"}
                            handleToggle={() => handleToggle("pietre", "pietre")}
                            setOpenMenu={setOpenMenu}
                            nameField={"Pietre"}
                            changeInput={(e) =>
                                setProductToAdd({ ...productToAdd, pietre: e.target.value })
                            }
                            inputValue={productToAdd.pietre}
                            handleClick={(item) =>
                                setProductToAdd({ ...productToAdd, pietre: item.name })
                            }
                            deleteInput={() =>
                                setProductToAdd({ ...productToAdd, pietre: "" })
                            }
                        />
                    )}

                {/* ATTRIBUTI SPECIFICI SOLO PER PREZIOSI */}
                {(productToAdd.categoria === "Preziosi" ||
                    productToAdd.categoria === "Outlet") && (
                        <InputProductDetail
                            productToAdd={productToAdd}
                            setProductToAdd={setProductToAdd}
                            isOpen={isOpen("modello_gioielleria")}
                            handleOpen={() =>
                                handleOpen("modello_gioielleria", "modello_gioielleria")
                            }
                            table={table}
                            filteredDataTable={filteredDataTable}
                            inputName={"modello_gioielleria"}
                            handleToggle={() =>
                                handleToggle("modello_gioielleria", "modello_gioielleria")
                            }
                            setOpenMenu={setOpenMenu}
                            nameField={"Modello Gioielleria"}
                            changeInput={(e) =>
                                setProductToAdd({
                                    ...productToAdd,
                                    modello_gioielleria: e.target.value,
                                })
                            }
                            inputValue={productToAdd.modello_gioielleria}
                            handleClick={(item) =>
                                setProductToAdd({
                                    ...productToAdd,
                                    modello_gioielleria: item.name,
                                })
                            }
                            deleteInput={() =>
                                setProductToAdd({ ...productToAdd, modello_gioielleria: "" })
                            }
                        />
                    )}

                {/* ATTRIBUTI SPECIFICI SOLO PER ANELLI */}
                {(productToAdd.categoria === "Anelli" ||
                    productToAdd.categoria === "Outlet") && (
                        <InputProductDetail
                            productToAdd={productToAdd}
                            setProductToAdd={setProductToAdd}
                            isOpen={isOpen("misura_anello")}
                            handleOpen={() => handleOpen("misura_anello", "misura_anello")}
                            table={table}
                            filteredDataTable={filteredDataTable}
                            inputName={"misura_anello"}
                            handleToggle={() => handleToggle("misura_anello", "misura_anello")}
                            setOpenMenu={setOpenMenu}
                            nameField={"Misura Anello"}
                            changeInput={(e) =>
                                setProductToAdd({ ...productToAdd, misura_anello: e.target.value })
                            }
                            inputValue={productToAdd.misura_anello}
                            handleClick={(item) =>
                                setProductToAdd({ ...productToAdd, misura_anello: item.name })
                            }
                            deleteInput={() =>
                                setProductToAdd({ ...productToAdd, misura_anello: "" })
                            }
                        />
                    )}

                {/* azioni */}
                <div className="actions ap-section">
                    <button
                        type="submit"
                        disabled={!productToAdd.categoria}
                        className="btn btn-primary"
                        title={!productToAdd.categoria ? "Seleziona una categoria" : ""}
                    >
                        Aggiungi prodotto
                    </button>
                </div>
            </form>
        </>
    );
}
