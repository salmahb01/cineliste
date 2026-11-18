import { useFavoris } from "../../context/FavorisContext.jsx";
import styles from "./Btnfavori.module.css";

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