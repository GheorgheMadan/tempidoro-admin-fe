export default function useUtility() {

    // --- UTILITY: "pulisce" una stringa per usarla in un nome file ---
    // Trasforma il titolo in un nome sicuro:
    // - tutto minuscolo
    // - rimuove accenti (es. "targhettà" -> "targhetta")
    // - elimina simboli strani
    // - spazi -> "_"
    const slugifyUnderscore = (s) =>
        String(s || "")
            .toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // rimuove accenti/diacritici
            .trim()
            .replace(/[^\w\s]/g, "") // elimina caratteri non alfanumerici
            .replace(/\s+/g, "_")
            .replace(/_+/g, "_");    // compatta multipli

    // --- UTILITY: estrae l'estensione del file scelto ---
    const getFileExtension = (file) => {
        const name = file?.name || "";
        const dotIdx = name.lastIndexOf(".");
        if (dotIdx === -1 || dotIdx === name.length - 1) return "jpg"; // fallback
        return name.slice(dotIdx + 1).toLowerCase();
    };

    // --- UTILITY: costruisce il nome finale ---
    // Formato: titolo_slug.estensione
    const buildImageFileNameWithExt = (file, product) => {
        const titleSlug = slugifyUnderscore(product?.title);
        const base = titleSlug || "immagine";
        const ext = getFileExtension(file);
        return `${base}.${ext}`;
    };

    return { slugifyUnderscore, getFileExtension, buildImageFileNameWithExt }
}