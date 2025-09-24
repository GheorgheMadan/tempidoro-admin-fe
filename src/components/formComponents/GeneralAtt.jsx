import { CiWarning } from "react-icons/ci";
import "../../css/addProductStyle.css";
import InputProductDetail from "../InputProductDetail";

export default function GeneralAtt({ productToAdd, setProductToAdd, markTouched, errors, showError, isOpen, handleOpen, handleToggle, table, filteredDataTable, setOpenMenu, handleImageChange }) {
    return (
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
                        onBlur={() => markTouched("image")} // segno che è stato toccato
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
                {showError("image") && (<p className="form-error"><CiWarning className="err-icon" /> {errors.image}</p>)}
            </div>
        </div>
    )
}