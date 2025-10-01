import { useGlobalProducts } from "../context/GlobalProducts";
import Spinner from "./Spinner";

export default function AllertModal({ show, onConfirm, text, errors = [] }) {
    if (!show) return null;

    const { loading } = useGlobalProducts()

    const hasErrors = Array.isArray(errors) && errors.length > 0;

    return (
        <div className="modal-overlay">

            <div className="modal">
                {loading && <Spinner />}
                {!loading && <div>

                    <h2>{hasErrors ? "Correggi i seguenti errori: " : "Info"}</h2>

                    {hasErrors ? (
                        <ul className="error-list">
                            {errors.map((err, idx) => (
                                <li key={idx}>{err}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>{text}</p>
                    )}</div>
                }
                <div className="modal-actions">
                    <button className="btn btn-primary" onClick={onConfirm}>
                        Chiudi
                    </button>
                </div>
            </div>
        </div>
    );
}
