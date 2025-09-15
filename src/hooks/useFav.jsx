import { useState, useEffect } from "react";

export default function useFav() {

    const [fav, setFav] = useState(() => {
        const storedFav = localStorage.getItem('favorites');
        return storedFav ? JSON.parse(storedFav) : [];
    });

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(fav));
    }, [fav]);

    const isFav = (product) => {
        return fav.some(item => item.id === product.id);
    }

    const addToFav = (product) => {
        setFav(prev => prev.some(p => p.id === product.id) ? prev.filter(item => item.id !== product.id) : [...prev, product])
    }

    return { fav, setFav, addToFav, isFav };
}