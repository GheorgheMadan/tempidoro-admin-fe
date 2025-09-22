import { useEffect, useState } from "react";

export default function useFilterCategoryList() {

    const [categoryFilterList, setCategoryFilterList] = useState([])
    const [categoriesList, setCategoriesList] = useState([])
    const [table, setTable] = useState({})


    async function getCategoryFilterList(category) {
        try {
            const res = await fetch(`http://localhost:3000/api/category-filters/${category}`)
            if (!res.ok) throw new Error("Nessuna lista trovata")
            const data = await res.json()
            setCategoryFilterList(data)
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch('http://localhost:3000/api/category-filters/categories')
                if (!res.ok) throw new Error("Nessuna lista trovata")
                const data = await res.json()
                setCategoriesList(data.results)
            } catch (err) {
                console.error(err);
            }
        })()
    }, [])

    async function getTableData(table) {
        if (table === '') return
        try {
            const res = await fetch(`http://localhost:3000/api/category-filters/table/${table.toLowerCase()}`)
            if (!res.ok) throw new Error("Nessuna lista trovata")
            const data = await res.json()
            setTable(data)
        } catch (err) {
            console.error(err);
        }
    }

    return { categoryFilterList, getCategoryFilterList, categoriesList, table, setTable, getTableData }
}