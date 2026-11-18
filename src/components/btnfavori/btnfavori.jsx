import { useFavoris } from "../../context/favorisContext.jsx";
import styles from "./btnfavori.module.css";

export default function BoutonFavori({ film }) {

    let { favoris, ajouterFavori } = useFavoris();

    let estFavori = favoris.some((f) => f.id === film.id);

    return (
        <button
            className={styles.bouton}
            onClick={() => ajouterFavori(film)}
        >
            {estFavori ? "❤️" : "🤍"}
        </button>
    );
}