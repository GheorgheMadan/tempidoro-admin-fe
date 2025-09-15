import { GrPowerReset } from "react-icons/gr";
import { memo, useMemo } from 'react';

export default memo(function Filters({
    filtersName,
    show,
    onClose,
    reset,
    filterDropDownRef,
    handleFilter,
    filters
}) {
    // ✅ Fallback sicuro: evito errori se filtersName è null/undefined
    const safe = useMemo(() => ({
        brand: filtersName?.brand ?? [],
        collection: filtersName?.collection ?? [],
        color: filtersName?.color ?? [],
        material: filtersName?.material ?? [],      // ← useremo QUESTO, non brand
        finish: filtersName?.finish ?? [],
        genre: filtersName?.genre ?? [],
        type: filtersName?.type ?? [],
        materiale_cassa: filtersName?.materiale_cassa ?? [],
        materiale_cinturino: filtersName?.materiale_cinturino ?? [],
        tipologia_movimento: filtersName?.tipologia_movimento ?? [],
        tipologia_cinturino: filtersName?.tipologia_cinturino ?? [],
        misura_ansa: filtersName?.misura_ansa ?? [],
        tipo_lenti: filtersName?.tipo_lenti ?? [],
        misura_anello: filtersName?.misura_anello ?? [],
        pietre: filtersName?.pietre ?? [],
        modello_gioielleria: filtersName?.modello_gioielleria ?? [],
    }), [filtersName]);

    // 🔧 Utility: normalizza stringhe (trim) ma senza rompere numeri/null
    const norm = (v) => (typeof v === 'string' ? v.trim() : v);

    // 🔧 Utility: renderizza <option> evitando spazi sporchi nei valori
    const renderOptions = (arr) => (
        Array.isArray(arr)
            ? arr.map((v, i) => {
                const val = norm(v);
                return <option key={i} value={val}>{val}</option>;
            })
            : null
    );

    return (
        <>
            {show && (
                <div className='container-dropdown' ref={filterDropDownRef}>
                    <div className='container-filters'>
                        <div className='container-close-reset-btn'>
                            <button type="button" onClick={reset} title="Reset filtri">
                                <GrPowerReset />
                            </button>
                            <span onClick={onClose} role="button" aria-label="Chiudi">✕</span>
                        </div>

                        {/* ----------------- ORDINAMENTO ----------------- */}
                        <div className='container-slect-input'>
                            <label>Ordina per:</label>
                            <select onChange={handleFilter} value={filters?.order} name="order">
                                <option value="">--scegli--</option>
                                <option value="price-asc">Prezzo: dal più basso</option>
                                <option value="price-desc">Prezzo: dal più alto</option>
                                <option value="name-asc">Nome: A-Z</option>
                                <option value="name-desc">Nome: Z-A</option>
                            </select>
                        </div>

                        {/* ----------------- BRAND ----------------- */}
                        {safe.brand.length > 0 && (
                            <div className='container-slect-input'>
                                <label>Marca:</label>
                                <select onChange={handleFilter} value={filters?.brand} name='brand'>
                                    <option value="">Tutte</option>
                                    {renderOptions(safe.brand)}
                                </select>
                            </div>
                        )}

                        {/* ----------------- PROMO / NOVITÀ ----------------- */}
                        <div className='container-slect-input'>
                            <label>In sconto:</label>
                            <select onChange={handleFilter} value={filters?.isPromo} name='isPromo'>
                                <option value="">Tutto</option>
                                <option value="true">Si</option>
                                <option value="false">No</option>
                            </select>
                        </div>

                        <div className='container-slect-input'>
                            <label>Novità:</label>
                            <select onChange={handleFilter} value={filters?.isNew} name='isNew'>
                                <option value="">Tutto</option>
                                <option value="true">Si</option>
                                <option value="false">No</option>
                            </select>
                        </div>

                        {/* ----------------- COLLEZIONE ----------------- */}
                        {safe.collection.length > 0 && (
                            <div className='container-slect-input'>
                                <label>Collezione:</label>
                                <select onChange={handleFilter} value={filters?.collection} name='collection'>
                                    <option value="">Tutte</option>
                                    {renderOptions(safe.collection)}
                                </select>
                            </div>
                        )}

                        {/* ----------------- COLORE ----------------- */}
                        {safe.color.length > 0 && (
                            <div className='container-slect-input'>
                                <label>Colore:</label>
                                <select onChange={handleFilter} value={filters?.color} name='color'>
                                    <option value="">Tutte</option>
                                    {renderOptions(safe.color)}
                                </select>
                            </div>
                        )}

                        {/* ----------------- MATERIALE ----------------- */}
                        {safe.material.length > 0 && (
                            <div className='container-slect-input'>
                                <label>Materiale:</label>
                                <select onChange={handleFilter} value={filters?.material} name='material'>
                                    <option value="">Tutte</option>
                                    {renderOptions(safe.material)}
                                </select>
                            </div>
                        )}

                        {/* ----------------- FINITURA ----------------- */}
                        {safe.finish.length > 0 && (
                            <div className='container-slect-input'>
                                <label>Finitura:</label>
                                <select onChange={handleFilter} value={filters?.finish} name='finish'>
                                    <option value="">Tutte</option>
                                    {renderOptions(safe.finish)}
                                </select>
                            </div>
                        )}

                        {/* ----------------- GENERE ----------------- */}
                        {safe.genre.length > 0 && (
                            <div className='container-slect-input'>
                                <label>Genere:</label>
                                <select onChange={handleFilter} value={filters?.genre} name='genre'>
                                    <option value="">Tutte</option>
                                    {renderOptions(safe.genre)}
                                </select>
                            </div>
                        )}

                        {/* ----------------- TIPOLOGIA ----------------- */}
                        {safe.type.length > 0 && (
                            <div className='container-slect-input'>
                                <label>Tipologia:</label>
                                <select onChange={handleFilter} value={filters?.type} name='type'>
                                    <option value="">Tutte</option>
                                    {renderOptions(safe.type)}
                                </select>
                            </div>
                        )}

                        {/* ------------- OROLOGI / CINTURINI ------------- */}
                        {safe.materiale_cassa.length > 0 && (
                            <div className='container-slect-input'>
                                <label>Materiale Cassa:</label>
                                <select onChange={handleFilter} value={filters?.materiale_cassa} name='materiale_cassa'>
                                    <option value="">Tutte</option>
                                    {renderOptions(safe.materiale_cassa)}
                                </select>
                            </div>
                        )}

                        {safe.materiale_cinturino.length > 0 && (
                            <div className='container-slect-input'>
                                <label>Materiale Cinturino:</label>
                                <select onChange={handleFilter} value={filters?.materiale_cinturino} name='materiale_cinturino'>
                                    <option value="">Tutte</option>
                                    {renderOptions(safe.materiale_cinturino)}
                                </select>
                            </div>
                        )}

                        {safe.tipologia_movimento.length > 0 && (
                            <div className='container-slect-input'>
                                <label>Tipologia Movimento:</label>
                                <select onChange={handleFilter} value={filters?.tipologia_movimento} name='tipologia_movimento'>
                                    <option value="">Tutte</option>
                                    {renderOptions(safe.tipologia_movimento)}
                                </select>
                            </div>
                        )}

                        {safe.tipologia_cinturino.length > 0 && (
                            <div className='container-slect-input'>
                                <label>Tipologia Cinturino:</label>
                                <select onChange={handleFilter} value={filters?.tipologia_cinturino} name='tipologia_cinturino'>
                                    <option value="">Tutte</option>
                                    {renderOptions(safe.tipologia_cinturino)}
                                </select>
                            </div>
                        )}

                        {safe.misura_ansa.length > 0 && (
                            <div className='container-slect-input'>
                                <label>Misura Ansa:</label>
                                <select onChange={handleFilter} value={filters?.misura_ansa} name='misura_ansa'>
                                    <option value="">Tutte</option>
                                    {renderOptions(safe.misura_ansa)}
                                </select>
                            </div>
                        )}

                        {/* ----------------- OCCHIALI ----------------- */}
                        {safe.tipo_lenti.length > 0 && (
                            <div className='container-slect-input'>
                                <label>Tipo Lenti:</label>
                                <select onChange={handleFilter} value={filters?.tipo_lenti} name='tipo_lenti'>
                                    <option value="">Tutte</option>
                                    {renderOptions(safe.tipo_lenti)}
                                </select>
                            </div>
                        )}

                        {/* ----------------- GIOIELLI ----------------- */}
                        {safe.misura_anello.length > 0 && (
                            <div className='container-slect-input'>
                                <label>Misura Anello:</label>
                                <select onChange={handleFilter} value={filters?.misura_anello} name='misura_anello'>
                                    <option value="">Tutte</option>
                                    {renderOptions(safe.misura_anello)}
                                </select>
                            </div>
                        )}

                        {safe.pietre.length > 0 && (
                            <div className='container-slect-input'>
                                <label>Pietre:</label>
                                <select onChange={handleFilter} value={filters?.pietre} name='pietre'>
                                    <option value="">Tutte</option>
                                    {renderOptions(safe.pietre)}
                                </select>
                            </div>
                        )}

                        {safe.modello_gioielleria.length > 0 && (
                            <div className='container-slect-input'>
                                <label>Modello Gioielleria:</label>
                                <select onChange={handleFilter} value={filters?.modello_gioielleria} name='modello_gioielleria'>
                                    <option value="">Tutte</option>
                                    {renderOptions(safe.modello_gioielleria)}
                                </select>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
});
