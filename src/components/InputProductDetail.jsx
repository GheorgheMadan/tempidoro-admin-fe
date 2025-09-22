import { MdKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";

export default function InputProductDetail({
    isOpen,
    handleOpen,
    handleToggle,
    filteredDataTable,
    inputName,
    setOpenMenu,
    nameField,
    changeInput,
    inputValue,
    handleClick,
    deleteInput
}) {
    return (
        // aggiungo la classe "has-above-toggle" e "is-open" se aperto
        <div className={`input-container has-above-toggle ${isOpen ? "is-open" : ""}`}>
            <label>{nameField}</label>

            <div className="input-icon-container">
                <input
                    type="text"
                    name={inputName}
                    value={inputValue}
                    onChange={changeInput}
                    onFocus={handleOpen}
                    autoComplete="off"
                />
                <div className="input-btn-container">
                    <span onClick={deleteInput} className="delete-input-icon1">✕</span>
                    {/* FRECCIA SOPRA*/}
                    {isOpen ? (
                        <MdOutlineKeyboardArrowUp
                            onClick={() => setOpenMenu(null)}
                            className="arrow-icon "
                            title="Chiudi"
                            aria-label="Chiudi menu"
                        />
                    ) : (
                        <MdKeyboardArrowDown
                            onClick={handleToggle}
                            className="arrow-icon arrow--above"
                            title="Apri"
                            aria-label="Apri menu"
                        />
                    )}
                </div>

            </div>

            {isOpen && (
                <div className="dropdown-container">
                    <ul>
                        {filteredDataTable.map((item, i) => (
                            <li
                                key={i}
                                onClick={() => {
                                    handleClick(item);
                                    setOpenMenu(null);
                                }}
                            >
                                {item.name}
                            </li>
                        ))}
                        {filteredDataTable.length === 0 && <span>Nessun risultato</span>}
                    </ul>
                </div>
            )}
        </div>
    );
}
