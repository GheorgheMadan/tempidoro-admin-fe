import { CiWarning } from "react-icons/ci";
import "../../css/addProductStyle.css";

export default function LogisticForm({ productToAdd, setProductToAdd, markTouched, errors, showError }) {
    return (
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
                            type="text"
                            value={productToAdd.price}
                            onChange={(e) =>
                                setProductToAdd({
                                    ...productToAdd,
                                    price: e.target.value,
                                })
                            }
                            onBlur={() => markTouched("price")} // segno che è stato toccato
                        />
                        <button
                            type="button"
                            onClick={() =>
                                setProductToAdd({ ...productToAdd, price: "" })
                            }
                            className="delete-input-icon right-22px"
                            aria-label="Azzera prezzo"
                            title="Azzera"
                        >
                            ✕
                        </button>
                    </div>
                    {showError("price") && (<p className="form-error"><CiWarning className="err-icon" /> {errors.price}</p>)}
                </div>

                {/* Discount */}
                <div className="input-container">
                    <label className="field-label">Sconto (%)</label>
                    <div className="input-icon-container">
                        <input
                            className="field-input"
                            type="text"
                            value={productToAdd.discount}
                            onChange={(e) =>
                                setProductToAdd({
                                    ...productToAdd,
                                    discount: e.target.value,
                                })
                            }
                            onBlur={() => markTouched("discount")} // segno che è stato toccato
                        />
                        <button
                            type="button"
                            onClick={() =>
                                setProductToAdd({ ...productToAdd, discount: "" })
                            }
                            className="delete-input-icon right-22px"
                            aria-label="Azzera sconto"
                            title="Azzera"
                        >
                            ✕
                        </button>
                    </div>
                    {showError("discount") && (<p className="form-error"><CiWarning className="err-icon" /> {errors.discount}</p>)}
                </div>

                {/* Stock */}
                <div className="input-container">
                    <label className="field-label">Stock</label>
                    <div className="input-icon-container">
                        <input
                            className="field-input"
                            type="text"
                            value={productToAdd.stock}
                            onChange={(e) =>
                                setProductToAdd({
                                    ...productToAdd,
                                    stock: e.target.value,
                                })
                            }
                            onBlur={() => markTouched("stock")} // segno che è stato toccato
                        />
                        <button
                            type="button"
                            onClick={() =>
                                setProductToAdd({ ...productToAdd, stock: "" })
                            }
                            className="delete-input-icon right-22px"
                            aria-label="Azzera stock"
                            title="Azzera"
                        >
                            ✕
                        </button>
                    </div>
                    {showError("stock") && (<p className="form-error"><CiWarning className="err-icon" /> {errors.stock}</p>)}
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
                                onBlur={() => markTouched("codice_ean")} // segno che è stato toccato
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
                        {showError("codice_ean") && (<p className="form-error"><CiWarning className="err-icon" /> {errors.codice_ean}</p>)}
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
    )
}