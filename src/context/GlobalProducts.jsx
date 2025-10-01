import { createContext, useContext } from "react";
import useProducts from "../hooks/useProducts";
import useFilterCategoryList from "../hooks/useFilterCategoryList";
import useFav from "../hooks/useFav"
import useCopy from "../hooks/useCopy";

const GlobalProductsContext = createContext();

export default function GlobalProductsProvider({ children }) {

    const items = useProducts();
    const favItems = useFav()
    const list = useFilterCategoryList()
    const copyUtils = useCopy()

    return (
        <GlobalProductsContext.Provider value={{ ...items, ...favItems, ...list, ...copyUtils }}>
            {children}
        </GlobalProductsContext.Provider>
    )
}

export const useGlobalProducts = () => {
    const context = useContext(GlobalProductsContext);
    if (!context) {
        throw new Error("useGlobalProducts must be used within a GlobalProductsProvider");
    }
    return context;
}