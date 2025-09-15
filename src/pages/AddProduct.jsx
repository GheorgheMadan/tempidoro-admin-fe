import { useEffect, useMemo, useState } from "react";
import { useGlobalProducts } from "../context/GlobalProducts"

export default function AddProduct() {

    const { categoriesList, categoryFilterList, getCategoryFilterList, table, setTable, getTableData } = useGlobalProducts()
    const [openBrandList, setOpenBrandList] = useState(false)
    const [tableName, setTableName] = useState('')

    const [productToAdd, setProductToAdd] = useState({
        categoria: '',
        brand: '',
        title: '',
        codice: '',
        price: 0,
        discount: 0,
        description: '',
        available: true,
        stock: 0,
        in_promozione: false,
        in_evidenza: true,
        novita: true,
        codice_ean: '',
        image: '',
        materiale: '',
        colore: '',
        finitura: '',
        tipologia: '',
        collezione: '',
        genere: '',
        confezione: '',
        garanzia: '',
        codice_produttore: '',
    })

    useEffect(() => {
        getTableData("brands")
    }, [tableName])

    useEffect(() => {
        productToAdd.categoria && getCategoryFilterList(productToAdd.categoria)
    }, [productToAdd.categoria])

    const filteredDataTable = useMemo(() => {
        return table.filter(item => item.name.toLocaleLowerCase().includes(productToAdd.brand.toLocaleLowerCase()))
    }, [table, productToAdd.brand])

    return (
        <>
            <form>
                <h1>Aggiungi un nuovo prodotto</h1>
                <label>Scegli la categoria</label>
                <select onChange={(e) => setProductToAdd({ ...productToAdd, categoria: e.target.value })} value={productToAdd.categoria}>
                    <option value="">-- seleziona una categoria --</option>
                    {categoriesList.map((category, i) => (
                        <option key={i} value={category.category_name}>{category.category_name}</option>
                    ))}
                </select>
                <div>
                    <h4>Dettagli prodotto</h4>
                    <div>
                        <label>Nome prodotto</label>
                        <input type="text" />
                    </div>
                    <div>
                        <label>Brand</label>
                        <input type="text" name="brand" onChange={e => setProductToAdd({ ...productToAdd, brand: e.target.value })} value={productToAdd.brand} />
                        <div>
                            <ul>
                                {filteredDataTable.map((item, i) => <li key={i}>{item.name}</li>)}
                            </ul>
                        </div>
                    </div>

                    <label></label>
                </div>

                <button type="submit">Aggiungi prodotto</button>
            </form>
        </>
    )
}