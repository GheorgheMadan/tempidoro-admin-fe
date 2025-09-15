export default function ActiveFilters({ filters, setFilters }) {

    const sortText = filters.order === 'price-asc' ? 'Prezzo: dal più basso' : filters.order === 'price-desc' ? 'Prezzo: dal più alto' : filters.order === 'name-asc' ? 'Nome: A-Z' : 'Nome: Z-A'


    return (
        <>
            {filters.order && <span onClick={() => setFilters(prev => ({ ...prev, order: null }))}>Ordina: {sortText} ✕</span>}
            {filters.brand && <span onClick={() => setFilters(prev => ({ ...prev, brand: null }))}>Marca: {filters.brand} ✕</span>}
            {filters.isPromo && (
                <span onClick={() => setFilters(prev => ({ ...prev, isPromo: null }))}>
                    In sconto: {filters.isPromo === "true" || filters.isPromo === true ? "Sì" : "No"} ✕
                </span>
            )}
            {filters.isNew && (
                <span onClick={() => setFilters(prev => ({ ...prev, isNew: null }))}>
                    Novità: {filters.isNew === "true" || filters.isNew === true ? "Sì" : "No"} ✕
                </span>
            )}
            {filters.material && <span onClick={() => setFilters(prev => ({ ...prev, material: null }))}>Materiale: {filters.material} ✕</span>}
            {filters.genre && <span onClick={() => setFilters(prev => ({ ...prev, genre: null }))}>Genere: {filters.genre} ✕</span>}
            {filters.finish && <span onClick={() => setFilters(prev => ({ ...prev, finish: null }))}>Finitura: {filters.finish} ✕</span>}
            {filters.color && <span onClick={() => setFilters(prev => ({ ...prev, color: null }))}>Colore: {filters.color} ✕</span>}
            {filters.collection && <span onClick={() => setFilters(prev => ({ ...prev, collection: null }))}>Collezione: {filters.collection} ✕</span>}
            {filters.type && <span onClick={() => setFilters(prev => ({ ...prev, type: null }))}>Tipologia: {filters.type} ✕</span>}

            {/* Orologi */}
            {filters.materiale_cassa && <span onClick={() => setFilters(prev => ({ ...prev, materiale_cassa: null }))}>Materiale Cassa: {filters.materiale_cassa} ✕</span>}
            {filters.materiale_cinturino && <span onClick={() => setFilters(prev => ({ ...prev, materiale_cinturino: null }))}>Materiale Cinturino: {filters.materiale_cinturino} ✕</span>}
            {filters.tipologia_movimento && <span onClick={() => setFilters(prev => ({ ...prev, tipologia_movimento: null }))}>Movimento: {filters.tipologia_movimento} ✕</span>}
            {filters.tipologia_cinturino && <span onClick={() => setFilters(prev => ({ ...prev, tipologia_cinturino: null }))}>Tipo Cinturino: {filters.tipologia_cinturino} ✕</span>}
            {filters.misura_ansa && <span onClick={() => setFilters(prev => ({ ...prev, misura_ansa: null }))}>Misura Ansa: {filters.misura_ansa} ✕</span>}

            {/* Occhiali */}
            {filters.tipo_lenti && <span onClick={() => setFilters(prev => ({ ...prev, tipo_lenti: null }))}>Tipo Lenti: {filters.tipo_lenti} ✕</span>}

            {/* Gioielleria */}
            {filters.pietre && <span onClick={() => setFilters(prev => ({ ...prev, pietre: null }))}>Pietre: {filters.pietre} ✕</span>}
            {filters.misura_anello && <span onClick={() => setFilters(prev => ({ ...prev, misura_anello: null }))}>Misura Anello: {filters.misura_anello} ✕</span>}
            {filters.modello_gioielleria && <span onClick={() => setFilters(prev => ({ ...prev, modello_gioielleria: null }))}>Modello Gioielleria: {filters.modello_gioielleria} ✕</span>}
        </>
    )
}