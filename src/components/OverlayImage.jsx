import { createPortal } from "react-dom";
import { useEffect } from "react";
export default function OverlayImage({ image, altText, onClose }) {

    useEffect(() => {
        // Disabilita lo scroll del body quando l'overlay è attivo
        document.body.style.overflow = 'hidden';

        // Ripristina lo scroll del body quando l'overlay viene chiuso
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []); // Esegui solo al montaggio e smontaggio

    return createPortal(
        <div className="overlay-image-container" onClick={onClose}>
            <div onClick={(e) => e.stopPropagation()} className="content-overlay">
                <div className="container-img">
                    <img src={image} alt={altText} />
                </div>
            </div>
            <div className="container-button-overlay">
                <button onClick={onClose} className="btn-skin-1 btn-large">Chiudi</button>
            </div>
        </div>, document.body
    );
}