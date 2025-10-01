import { useEffect, useState, useCallback, useRef } from 'react';
import ProductCard from '../components/ProductCard';
import { useGlobalProducts } from '../context/GlobalProducts';
import Spinner from '../components/Spinner';
import { debounce } from 'lodash';
import { MdFilterList } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import Filters from '../components/Filters';
import ActiveFilters from '../components/ActiveFilters';

export default function HomePage() {

    const { products, total, offset, limit, fetchProducts, loading,
        loadingMore, searching, setOffset, filters, setFilters, resetAll, handleFilter,
        getCategoryFilterList, categoryFilterList, categoriesList } = useGlobalProducts();

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


    return (
        <main className="category-page">
            <div className='container-title'>
                <h1 className="text-center">{category}</h1>
                {/* Sezione ricerca */}
                <div>
                    <label>Seleziona la categoria: </label>
                    <select onChange={e => setCategory(e.target.value)} className='input' value={category}>
                        <option value="">-- seleziona --</option>
                        {categoriesList.map((c) => <option key={c.id} value={c.category_name}>{c.category_name}</option>)}
                    </select>
                </div>
            </div>
            <div className='container-search'>
                <MdFilterList className='filter-icon' onClick={() => setShowFilter(true)} />
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
                    {searchInput.length > 0 && < span
                        className='cancel-input'
                        onClick={() => {
                            setSearchInput("")
                            setSearchQuery("")
                        }}>
                        ✕
                    </span>}
                </div>
                <IoIosSearch className='search-icon' />
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

            <h4>{total} articoli</h4>
            <div className={`container-active-filters ${isActive ? "activ" : ""}`}>
                <ActiveFilters filters={filters} setFilters={setFilters} />
            </div>
            {loading && searching && <Spinner />}
            {
                noResults && (
                    <h2 className='text-center'>Nessun prodotto trovato</h2>
                )
            }
            <div className="container-products">
                {
                    products.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
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