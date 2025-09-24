import ReactDOM from "react-dom";
import "../css/ModalStyle.css"

export default function AllertModal({ show, onConfirm }) {
    // se show è false → non mostrare nulla
    if (!show) return null;

    return ReactDOM.createPortal(
        <div className="modal-overlay">
            <div className="modal">
                <h2>Operazione andata a buon fine!</h2>
                <div className="modal-actions">
                    <button className="btn btn-primary" onClick={onConfirm}>
                        Ok
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}