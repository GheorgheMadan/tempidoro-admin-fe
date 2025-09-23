
import { useState } from "react";

export default function useProducts() {
    // Lista prodotti caricati
    const [products, setProducts] = useState([]);

    // Stato prodotto corrente (per esempio, per il dettaglio prodotto)
    const [product, setProduct] = useState(null);

    // Totale prodotti nella categoria (lo fornisce il backend)
    const [total, setTotal] = useState(0);

    // Limite di prodotti per pagina
    const [limit, setLimit] = useState(40);

    // Offset (dove cominciare nella lista prodotti, per es. 0, 20, 40, ...)
    const [offset, setOffset] = useState(0);

    // Stato di caricamento
    const [loading, setLoading] = useState(false);

    const [loadingMore, setLoadingMore] = useState(false);
    const [searching, setSearching] = useState(false);

    // stato filtri 
    const [filters, setFilters] = useState({
        order: '',
        brand: '',
        isPromo: '',
        isNew: '',
        genre: '',
        material: '',
        finish: '',
        collection: '',
        color: '',
        type: '',
        // specifici orologi e cinturini
        materiale_cassa: '',
        materiale_cinturino: '',
        tipologia_movimento: '',
        tipologia_cinturino: '',
        misura_ansa: '',
        // specifici occhiali
        tipo_lenti: '',
        // specifici gioielleria
        pietre: '',
        misura_anello: '',
        modello_gioielleria: '',
        isEvidence: ''
    });

    // Funzione per caricare i prodotti in base alla categoria
    async function fetchProducts({
        category, search = '', limit = 40, offset = 0, append = false, filters
    }) {

        // mi assicuro che filters sia sempre un oggetto, anche se arriva null
        filters = filters || {};

        console.log("✅ FETCH ESEGUITA CON: dal backend")
        let url = "";
        const backendCategory = category?.replace(/-/g, "_");


        // in tutti gli altri casi faccio la fetch per categoria
        if (category) {
            // 3. Caso con categoria
            url = `http://localhost:3000/api/products?categoria=${backendCategory}&limit=${limit}&offset=${offset}`;
        }
        if (search && search.trim()) url += `&search=${search.trim()}`;
        // filtri di ricerca

        if (filters.order) url += `&order=${filters.order}`;
        if (filters.brand) url += `&brand=${encodeURIComponent(filters.brand)}`;
        if (filters.isPromo) url += `&isPromo=${filters.isPromo}`;
        if (filters.isNew) url += `&isNew=${filters.isNew}`;
        if (filters.isEvidence) url += `&isEvidence=${filters.isEvidence}`;
        if (filters.genre) url += `&genre=${filters.genre}`;
        if (filters.material) url += `&material=${filters.material}`;
        if (filters.finish) url += `&finish=${filters.finish}`;
        if (filters.collection) url += `&collection=${filters.collection}`;
        if (filters.color) url += `&color=${filters.color}`;
        if (filters.type) url += `&type=${filters.type}`;

        // categoria orologi cinturini
        if (category === 'Orologi' || category === 'Outlet') {
            if (filters.materiale_cassa) url += `&materiale_cassa=${filters.materiale_cassa}`
            if (filters.tipologia_movimento) url += `&tipologia_movimento=${filters.tipologia_movimento}`
        }
        if (category === 'Orologi' || category === 'Cinturini' || category === 'Outlet') {
            if (filters.materiale_cinturino) url += `&materiale_cinturino=${filters.materiale_cinturino}`
            if (filters.tipologia_cinturino) url += `&tipologia_cinturino=${filters.tipologia_cinturino}`
        }
        if (category === 'Cinturini' || category === 'Outlet') {
            if (filters.misura_ansa) url += `&misura_ansa=${filters.misura_ansa}`
        }
        // categoria anelli, bracciali, cavigliere, ciondoli, collane, orecchini, portachiavi, preziosi, outlet
        if (
            category === 'Anelli' ||
            category === 'Bracciali' ||
            category === 'Cavigliere' ||
            category === 'Ciondoli' ||
            category === 'Collane' ||
            category === 'Orecchini' ||
            category === 'Portachiavi' ||
            category === 'Preziosi' ||
            category === 'Outlet'
        ) {
            if (filters.pietre) url += `&pietre=${filters.pietre}`
        }

        // categoria anelli e outlet
        if (category === 'Anelli' || category === 'Outlet') {
            if (filters.misura_anello) url += `&misura_anello=${filters.misura_anello}`
        }

        // categoria preziosi e outlet
        if (category === 'Preziosi' || category === 'Outlet') {
            if (filters.modello_gioielleria) url += `&modello_gioielleria=${filters.modello_gioielleria}`
        }

        if (filters.tipo_lenti) url += `&tipo_lenti=${filters.tipo_lenti}`

        try {
            if (append) {
                setLoadingMore(true);
            } else {
                setLoading(true);
                setProducts([]);
                setTotal(0);
            }

            const res = await fetch(url);
            if (!res.ok) throw new Error("Failed to fetch products");

            const data = await res.json();
            const results = data.results || [];

            setProducts(prev => append ? [...prev, ...results] : results);
            setTotal(data.total);
            if (data.limit) setLimit(data.limit);
            setOffset(offset);
        } catch (error) {
            console.error("Error loading products:", error);
        } finally {
            setLoading(false);
            setLoadingMore(false);
            setSearching(false);
        }
    }

    // fetch del prodotto in base al id 
    async function fetchProductById(id) {
        try {
            setLoading(true); // Inizia caricamento

            const res = await fetch(`http://localhost:3000/api/products/${id}`);
            if (!res.ok) {
                throw new Error("Failed to fetch product");
            }
            const data = await res.json();
            setProduct(data);
        } catch (error) {
            console.error("Error fetching product by ID:", error);
        } finally {
            setLoading(false); // Fine caricamento
            setSearching(false); // Fine ricerca
        }
    }

    const deslugyfyCategory = (slug) => {
        if (!slug) return '';

        return slug
            .replace(/[-_]/g, ' ') // sostituisce trattini o underscore con spazi
            .split(' ')            // divide in parole
            .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // mette la maiuscola
            .join(' ');
    };

    const resetAll = () => {
        setFilters({
            order: '',
            brand: '',
            isPromo: '',
            isNew: '',
            genre: '',
            material: '',
            finish: '',
            collection: '',
            color: '',
            type: '',
            // specifici orologi e cinturini
            materiale_cassa: '',
            materiale_cinturino: '',
            tipologia_movimento: '',
            tipologia_cinturino: '',
            misura_ansa: '',
            // specifici occhiali
            tipo_lenti: '',
            // specifici gioielleria
            pietre: '',
            misura_anello: '',
            modello_gioielleria: '',
            isEvidence: ''
        })
    };

    const handleFilter = (e) => {
        const { value, name } = e.target
        setFilters(prev => ({ ...prev, [name]: value }));
    }

    async function addProduct(productToAdd) {


    }

    return {
        products,
        setProducts,
        product,
        loading,
        loadingMore,
        searching,
        total,
        limit,
        offset,
        setOffset,
        setLimit,
        fetchProducts,
        fetchProductById,
        deslugyfyCategory,
        filters,
        setFilters,
        resetAll,
        handleFilter,
    };
}
