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

    const compact = (obj) => {
        const out = {};
        for (const [k, v] of Object.entries(obj)) {
            if (v === "" || v === null || v === undefined) continue; // 0/false restano
            out[k] = typeof v === "string" ? v.trim() : v;
        }
        return out;
    };

    const deslugyfyCategory = (slug) => {
        if (!slug) return '';

        return slug
            .replace(/[-_]/g, ' ') // sostituisce trattini o underscore con spazi
            .split(' ')            // divide in parole
            .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // mette la maiuscola
            .join(' ');
    };

    // Funzione per trasformare un titolo in uno slug leggibile
    function slugify(title) {
        return title
            .toLowerCase()                  // tutto minuscolo
            .replace(/[^a-z0-9\s-]/g, '')   // rimuove caratteri speciali
            .replace(/\s+/g, '-')           // sostituisce spazi con trattini
            .replace(/-+/g, '-');           // rimuove trattini ripetuti
    }

    function capitalizeFirst(str) {
        if (!str) return "";
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function smartCapitalizeWords(str) {
        if (!str || typeof str !== "string") return "";

        return str
            .split(" ")
            .map(word => {
                // se la parola è tutta maiuscola, la lascio invariata
                if (word === word.toUpperCase()) return word;
                // altrimenti capitalizzo solo la prima lettera
                return word.charAt(0).toUpperCase() + word.slice(1);
            })
            .join(" ");
    }

    return { slugifyUnderscore, getFileExtension, buildImageFileNameWithExt, compact, deslugyfyCategory, slugify, capitalizeFirst, smartCapitalizeWords }
}