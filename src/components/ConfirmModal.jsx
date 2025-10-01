import ReactDOM from "react-dom";
import "../css/ModalStyle.css"

export default function ConfirmModal({ show, onClose, onConfirm, modalTitle, message }) {
    // se show è false → non mostrare nulla
    if (!show) return null;

    return ReactDOM.createPortal(
        <div className="modal-overlay">
            <div className="modal">
                <h2>{modalTitle}</h2>
                <p>{message}</p>
                <div className="modal-actions">
                    <button className="btn btn-secondary" onClick={onClose}>
                        Annulla
                    </button>
                    <button className="btn btn-primary" onClick={onConfirm}>
                        Conferma
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}
