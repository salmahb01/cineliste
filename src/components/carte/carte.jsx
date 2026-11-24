import style from "./carte.module.css";
import BoutonFavori from "../btnfavori/btnfavori";
import { Link } from "react-router-dom";
import { useFavoris } from "../../context/favorisContext";
export default function Carte(props) {

    let { favoris } = useFavoris();

    let estFavori = favoris.some(
        (f) => f.id === props.film.id
    );

    return (
        <div className={style.carte}>

            {estFavori && (
                <span className={style.badge}>
                    ❤️ Favori
                </span>
            )}

            <Link to={`/films/${props.film.id}`}>
                <h3>{props.titre}</h3>
            </Link>

            <p>⭐ {props.note} / 10</p>

            <img
                src={
                    props.image ||
                    "https://placehold.co/300x450?text=No+Image"
                }
                alt={props.titre}
                loading="lazy"
                onError={(e) => {
                    e.target.src =
                        "https://placehold.co/300x450?text=No+Image";
                }}
            />

            <BoutonFavori film={props.film} />

        </div>
    );
}