import { useState } from "react";
import Carte from "../components/carte/carte.jsx";
import emptyImage from "../assets/empty.svg";
import useFetch from "../hooks/useFetch.js";

export default function Accueil() {

    let [recherche, setRecherche] = useState("");
    let [tri, setTri] = useState("croissant");

    let url = `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_KEY}&language=fr-FR`;

    let { data, chargement, erreur } = useFetch(url);

    let films = data ? data.results : [];

    let filmsFiltres = films.filter((film) =>
        film.title.toLowerCase().includes(recherche.toLowerCase())
    );

    let filmsTries = [...filmsFiltres].sort((a, b) => {
        if (tri === "decroissant") {
            return b.vote_average - a.vote_average;
        }

        return a.vote_average - b.vote_average;
    });

    if (chargement) {
        return <p>Chargement...</p>;
    }

    if (erreur) {
        return <p>Erreur : {erreur}</p>;
    }

    return (
        <div>
            <h2>Nos films 🎬</h2>

            <input
                type="text"
                placeholder="Rechercher un film..."
                value={recherche}
                onChange={(e) => setRecherche(e.target.value)}
            />

            <select
                value={tri}
                onChange={(e) => setTri(e.target.value)}
            >
                <option value="croissant">Note croissante</option>
                <option value="decroissant">Note décroissante</option>
            </select>

            <div className="films">

                {filmsTries.length > 0 ? (

                    filmsTries.map((film) => (
                        <Carte
                            key={film.id}
                            film={film}
                            titre={film.title}
                            note={film.vote_average}
                            image={
                                film.poster_path
                                    ? `https://image.tmdb.org/t/p/w500${film.poster_path}`
                                    : ""
                            }
                        />
                    ))

                ) : (

                    <div>
                        <img
                            src={emptyImage}
                            alt="Aucun résultat"
                            width="200"
                        />

                        <p>Aucun film trouvé 😢</p>
                    </div>

                )}

            </div>
        </div>
    );
}