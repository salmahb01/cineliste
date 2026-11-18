import { useFavoris } from "../context/FavorisContext";
import Carte from "../components/carte/carte";

export default function Favoris() {

    let { favoris } = useFavoris();

    return (
        <div>
            <h1>Mes films favoris ❤️</h1>

            {favoris.length > 0 ? (
                <div className="films">

                    {favoris.map((film) => (
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
                    ))}

                </div>
            ) : (
                <p>Aucun film favori pour le moment</p>
            )}
        </div>
    );
}