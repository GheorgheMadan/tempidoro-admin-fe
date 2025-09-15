import { useGlobalProducts } from "../context/GlobalProducts";
// cuore pieno
import { IoIosHeart } from "react-icons/io";
// cuore vuoto
import { IoIosHeartEmpty } from "react-icons/io";

export default function AddToFavButton({ product, content }) {

    const { addToFav, isFav } = useGlobalProducts();

    const isFavorite = isFav(product);

    return (
        <button onClick={() => addToFav(product)} className="btn-fav">
            {content}  {isFavorite ? <IoIosHeart className="orange-fav" /> : <IoIosHeartEmpty className="orange-fav" />}
        </button>
    )
}
