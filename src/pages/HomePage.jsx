import { useEffect, useState, useCallback, useRef } from 'react';
import ProductCard from '../components/ProductCard';
import { useGlobalProducts } from '../context/GlobalProducts';
import Spinner from '../components/Spinner';
import { debounce } from 'lodash';
import { MdFilterList } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import Filters from '../components/Filters';
import ActiveFilters from '../components/ActiveFilters';
import ConfirmModal from '../components/ConfirmModal';

export default function HomePage() {

    const { products, total, offset, limit, fetchProducts, loading,
        loadingMore, searching, setOffset, filters, setFilters, resetAll, handleFilter,
        getCategoryFilterList, categoryFilterList, categoriesList, response, deleteMultipleProducts } = useGlobalProducts();

    const [showFilter, setShowFilter] = useState(false)
    const filterDropDownRef = useRef()
    // stato input di ricerca
    const [searchQuery, setSearchQuery] = useState("");
    // stato value del input utilizzato per svuotare il valore
    const [searchInput, setSearchInput] = useState("")

    const [category, setCategory] = useState(() => {
        const storedCategory = sessionStorage.getItem('categoria');
        return storedCategory ? storedCategory : '';
    })

    // Stato per i prodotti selezionati per l'eliminazione multipla
    const [selectedProducts, setSelectedProducts] = useState([])
    const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);

    useEffect(() => {
        sessionStorage.setItem('categoria', category);
    }, [category]);

    // debounce per evitare chiamate API troppo frequenti
    const debouncedSearch = useCallback(
        debounce((name) => {
            setSearchQuery(name);
        }, 500
        ), [])


    // 2) fetch iniziale (categoria cambiata)
    useEffect(() => {
        if (!category) return;
        setSearchInput("");
        setSearchQuery("");
        resetAll();
        setOffset(0);

        (async () => {
            await fetchProducts({
                category,
                search: "",
                limit,
                offset: 0,
                append: false,
                filters: null, // mai filters nel primo load
            });

            await getCategoryFilterList(category);
        })();

    }, [category]);



    useEffect(() => {
        if (!category) return;

        fetchProducts({
            category,
            search: searchQuery,
            limit,
            offset: 0,
            append: false,
            filters
        });
    }, [searchQuery, filters, category]);

    useEffect(() => {
        if (!category) return;
        if (!response?.success) return;

        (async () => {
            // ricarico i filtri dal backend
            await getCategoryFilterList(category);
        })();

        // opzionale: resetti la response dopo aver gestito i filtri
        // setResponse(null);

    }, [response?.success, category]);

    // Funzione per caricare altri prodotti
    const handleLoadMore = () => {
        const newOffset = offset + limit;
        fetchProducts({
            category,
            search: searchQuery,
            limit,
            offset: newOffset,
            append: true,
            filters: filters
        });
    };

    const noResults = !loading && !loadingMore && !searching && products.length === 0;

    // funzione per chiudere il dropdown quando si clicca all'esterno
    useEffect(() => {
        // Questa funzione verrà eseguita ogni volta che clicchi nel documento
        const handleClickOutside = (event) => {
            // Controlla se dropdownRef è assegnato e se l'elemento cliccato NON è dentro il menu
            if (filterDropDownRef.current && !filterDropDownRef.current.contains(event.target)) {
                // Se hai cliccato fuori, chiudi il menu a tendina
                setShowFilter(false)
            }
        }
        // Quando il componente è montato, aggiungi l'ascoltatore per i click nel documento
        document.addEventListener("mousedown", handleClickOutside)

        // Quando il componente viene smontato o rimosso dal DOM, rimuovi l'ascoltatore per evitare memory leak
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    // verifico se si è ce qualche filtro attivo
    const isActive = Object.values(filters).some(value => value !== "");

    // handler per l'eliminazione multipla
    const toggleSelectProduct = (productId) => {
        setSelectedProducts(prevSelected => prevSelected.includes(productId) ? prevSelected.filter(id => id !== productId) : [...prevSelected, productId]);
    }

    const handleDeleteSelected = async () => {
        if (selectedProducts.length === 0) return;
        await deleteMultipleProducts(selectedProducts);
        setSelectedProducts([]);
    }

    console.log("id dei prodotti selezionati", selectedProducts);


    return (
        <main className="category-page">
            <div className='container-title'>
                {/* CATEGORIA DELLA PAGINA */}
                <h1 className="text-center">{category}</h1>
                {/* SEZIONE RICERCA */}
                <div>
                    {/* SELEZIONE CATEGORIA PER IL FETCH DEI PRODOTTI */}
                    <label>Seleziona la categoria: </label>
                    <select onChange={e => setCategory(e.target.value)} className='input' value={category}>
                        <option value="">-- seleziona --</option>
                        {categoriesList.map((c) => <option key={c.id} value={c.category_name}>{c.category_name}</option>)}
                    </select>
                </div>
            </div>
            {/* SEZIONE SEARCH BAR E FILTERS */}
            <div className='container-search'>
                {/* ICONA DEI FILTRI */}
                <MdFilterList className='filter-icon' onClick={() => setShowFilter(true)} />
                {/* SEARCH BAR */}
                <div className='search-input'>
                    <input
                        className='input'
                        type="text"
                        onChange={e => {
                            debouncedSearch(e.target.value)
                            setSearchInput(e.target.value)
                        }}
                        value={searchInput}
                        placeholder='Cerca...'
                    />
                    {/* SVUOTA INPUT */}
                    {searchInput.length > 0 && < span
                        className='cancel-input'
                        onClick={() => {
                            setSearchInput("")
                            setSearchQuery("")
                        }}>
                        ✕
                    </span>}
                </div>
                {/* SEARCH ICON */}
                <IoIosSearch className='search-icon' />
                {/* FILTRI */}
                <Filters
                    filtersName={categoryFilterList.filters}
                    category={category}
                    show={showFilter}
                    onClose={() => setShowFilter(false)}
                    reset={() => resetAll()} filterDropDownRef={filterDropDownRef}
                    handleFilter={handleFilter}
                    filters={filters}
                // onApply={() => {
                //     fetchProducts({
                //         category,
                //         search: "",               // ← esclude la search
                //         offset: 0,
                //         filters
                //     });
                //     setShowFilter(false);        // chiude il dropdown se vuoi
                // }}
                // fetchProducts={fetchProducts}
                // searchQuery={searchQuery}
                />
            </div>
            {/* TOTALE ARTICOLI */}
            <h4>{total} articoli</h4>
            {/* BUTTON ELIMINAZIONE MULTIPLA */}
            <div>
                <button
                    className={`btn-skin-1-btn-xs btn`}
                    onClick={() => setConfirmDeleteModal(true)} disabled={selectedProducts.length === 0}
                >
                    Elimina selezionati ({selectedProducts.length})
                </button>
                <button
                    onClick={() => setSelectedProducts([])}
                    className={`btn-skin-1-btn-xs btn`}
                    disabled={selectedProducts.length === 0}
                >
                    Deseleziona tutto
                </button>
                <button
                    className={`btn-skin-1-btn-xs btn`}
                    onClick={() => {
                        const allIds = products.map(p => p.id);
                        setSelectedProducts(allIds);
                    }}
                >
                    Seleziona tutto
                </button>
                <ConfirmModal
                    show={confirmDeleteModal}
                    onClose={() => setConfirmDeleteModal(false)}
                    onConfirm={async () => {
                        await handleDeleteSelected();
                        setConfirmDeleteModal(false);
                    }}
                    modalTitle="Confermi l'eliminazione?"
                    message={`Sei sicuro di voler eliminare i ${selectedProducts.length} prodotti selezionati? Non potrai più tornare indietro.`}
                />
            </div>
            {/* FILTRI ATTIVI */}
            <div className={`container-active-filters ${isActive ? "activ" : ""}`}>
                <ActiveFilters filters={filters} setFilters={setFilters} />
            </div>
            {/* LOADING */}
            {loading && searching && <Spinner />}
            {
                noResults && (
                    <h2 className='text-center'>Nessun prodotto trovato</h2>
                )
            }
            {/* LISTA PRODOTTI */}
            <div className="container-products">
                {
                    products.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            containerButton={true}
                            checked={selectedProducts.includes(product.id)}
                            onToggleSelect={toggleSelectProduct}
                        />
                    ))}
            </div>

            {
                products.length < total && !loadingMore && (
                    <button onClick={handleLoadMore} className="btn-skin-1 btn-large">
                        Carica altri prodotti
                    </button>
                )
            }
            {loadingMore && <Spinner />}
        </main >
    );
}