import { MdKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import { useEffect, useRef } from "react";

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
    deleteInput,
    markInput,
    err
}) {
    // ref sul contenitore del componente (per capire se clicco dentro o fuori)
    const wrapperRef = useRef(null);

    // useEffect che aggiunge un listener per chiudere il menu quando clicchi fuori
    useEffect(() => {
        // se il menu non è aperto, non serve nessun listener
        if (!isOpen) return;

        const handleClickOutside = (e) => {
            // se clicco fuori dal wrapper → chiudi il menu
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setOpenMenu(null);
            }
        };

        // aggiungo il listener
        document.addEventListener("mousedown", handleClickOutside);

        // pulizia → rimuovo il listener quando il menu si chiude o il componente si smonta
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, setOpenMenu]);

    return (
        <div
            ref={wrapperRef}
            className={`input-container has-above-toggle ${isOpen ? "is-open" : ""}`}
        >
            {/* label sopra l’input */}
            <label>{nameField}</label>

            <div className="input-icon-container">
                {/* input controllato */}
                <input
                    type="text"
                    name={inputName}
                    value={inputValue ?? ""} // evito errori controlled/uncontrolled
                    onChange={changeInput}
                    onFocus={handleOpen} // quando l’input prende focus → apri il menu
                    autoComplete="off"
                    onBlur={markInput} // segno il campo come “toccato”
                />

                {/* container per pulsante X e freccia */}
                <div className="input-btn-container">
                    {/* pulsante X per cancellare il contenuto */}
                    <span
                        onMouseDown={(e) => e.preventDefault()} // evita che l’input perda focus
                        onClick={(e) => {
                            e.stopPropagation(); // non propagare il click
                            deleteInput(); // cancella il valore
                            if (typeof markInput === "function") markInput(); // segna come toccato
                        }}
                        className="delete-input-icon1"
                    >
                        ✕
                    </span>

                    {/* icona freccia (su/giù) per aprire o chiudere il menu */}
                    {isOpen ? (
                        <MdOutlineKeyboardArrowUp
                            onClick={() => setOpenMenu(null)} // chiudi menu
                            className="arrow-icon"
                            title="Chiudi"
                            aria-label="Chiudi menu"
                        />
                    ) : (
                        <MdKeyboardArrowDown
                            onClick={handleToggle} // apri menu
                            className="arrow-icon arrow--above"
                            title="Apri"
                            aria-label="Apri menu"
                        />
                    )}
                </div>
            </div>

            {/* dropdown con i risultati */}
            {isOpen && (
                <div className="dropdown-container">
                    <ul>
                        {filteredDataTable.map((item, i) => (
                            <li
                                key={i}
                                onClick={() => {
                                    handleClick(item); // seleziona l’item
                                    setOpenMenu(null); // chiudi menu
                                }}
                            >
                                {item.name}
                            </li>
                        ))}
                        {filteredDataTable.length === 0 && <span>Nessun risultato</span>}
                    </ul>
                </div>
            )}

            {/* eventuale messaggio di errore */}
            {err}
        </div>
    );
}
