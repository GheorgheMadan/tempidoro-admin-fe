import "../../css/addProductStyle.css";
import InputProductDetail from "../InputProductDetail";

export default function SpecificAtt({ productToAdd, setProductToAdd, isOpen, handleOpen, handleToggle, table, filteredDataTable, setOpenMenu }) {
    return (
        <>
            {/* Attributi specifici per gli occhiali */}
            {(productToAdd?.categoria === "Occhiali da sole" ||
                productToAdd?.categoria === "Montature da vista" ||
                productToAdd?.categoria === "Outlet") && (
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
                        inputValue={productToAdd?.tipo_lenti}
                        handleClick={(item) =>
                            setProductToAdd({ ...productToAdd, tipo_lenti: item.name })
                        }
                        deleteInput={() =>
                            setProductToAdd({ ...productToAdd, tipo_lenti: "" })
                        }
                    />
                )}

            {/* Attributi specifici per CINTURINI e OROLOGI */}
            {(productToAdd?.categoria === "Cinturini" ||
                productToAdd?.categoria === "Orologi" ||
                productToAdd?.categoria === "Outlet") && (
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
                            inputValue={productToAdd?.tipologia_cinturino}
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
                            inputValue={productToAdd?.materiale_cinturino}
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
            {(productToAdd?.categoria === "Cinturini" ||
                productToAdd?.categoria === "Outlet") && (
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
                        inputValue={productToAdd?.misura_ansa}
                        handleClick={(item) =>
                            setProductToAdd({ ...productToAdd, misura_ansa: item.name })
                        }
                        deleteInput={() =>
                            setProductToAdd({ ...productToAdd, misura_ansa: "" })
                        }
                    />
                )}

            {/* ATTRIBUTI SPECIFICI SOLO PER OROLOGI */}
            {(productToAdd?.categoria === "Orologi" ||
                productToAdd?.categoria === "Outlet") && (
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
                            inputValue={productToAdd?.materiale_cassa}
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
                            inputValue={productToAdd?.tipologia_movimento}
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
            {(productToAdd?.categoria === "Orecchini" ||
                productToAdd?.categoria === "Ciondoli" ||
                productToAdd?.categoria === "Portachiavi" ||
                productToAdd?.categoria === "Collane" ||
                productToAdd?.categoria === "Bracciali" ||
                productToAdd?.categoria === "Preziosi" ||
                productToAdd?.categoria === "Cavigliere" ||
                productToAdd?.categoria === "Anelli" ||
                productToAdd?.categoria === "Outlet") && (
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
                        inputValue={productToAdd?.pietre}
                        handleClick={(item) =>
                            setProductToAdd({ ...productToAdd, pietre: item.name })
                        }
                        deleteInput={() =>
                            setProductToAdd({ ...productToAdd, pietre: "" })
                        }
                    />
                )}

            {/* ATTRIBUTI SPECIFICI SOLO PER PREZIOSI */}
            {(productToAdd?.categoria === "Preziosi" ||
                productToAdd?.categoria === "Outlet") && (
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
                        inputValue={productToAdd?.modello_gioielleria}
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
            {(productToAdd?.categoria === "Anelli" ||
                productToAdd?.categoria === "Outlet") && (
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
                        inputValue={productToAdd?.misura_anello}
                        handleClick={(item) =>
                            setProductToAdd({ ...productToAdd, misura_anello: item.name })
                        }
                        deleteInput={() =>
                            setProductToAdd({ ...productToAdd, misura_anello: "" })
                        }
                    />
                )}
        </>
    )
}