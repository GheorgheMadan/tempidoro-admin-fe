import { CiWarning } from "react-icons/ci";
import "../../css/addProductStyle.css";
import InputProductDetail from "../InputProductDetail";

export default function BaseForm({ productToAdd, setProductToAdd, markTouched, categoriesList, errors, showError, isOpen, handleOpen, handleToggle, table, filteredDataTable, setOpenMenu }) {
    return (
        <>
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
                            onBlur={() => markTouched("categoria")} // segno che è stato toccato
                        >
                            <option value="">-- seleziona una categoria --</option>
                            {categoriesList.map((category, i) => (
                                <option key={i} value={category.category_name}>
                                    {category.category_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {showError("categoria") && (<p className="form-error"><CiWarning className="err-icon" /> {errors.categoria}</p>)}
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
                            onBlur={() => markTouched("title")} // segno che è stato toccato
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
                    {showError("title") && (<p className="form-error"><CiWarning className="err-icon" /> {errors.title}</p>)}
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
                    markInput={() => markTouched("brand")}
                    err={showError("brand") && (<p className="form-error"><CiWarning className="err-icon" /> {errors.brand}</p>)}
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
        </>
    )
}