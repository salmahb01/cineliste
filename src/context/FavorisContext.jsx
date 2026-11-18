import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage.js";

let FavorisContext = createContext();

export function FavorisProvider({ children }) {

    let [favoris, setFavoris] = useLocalStorage("favoris", []);

    function ajouterFavori(film) {
        let existe = favoris.find((f) => f.id === film.id);

        if (existe) {
            setFavoris(favoris.filter((f) => f.id !== film.id));
        } else {
            setFavoris([...favoris, film]);
        }
    }

    return (
        <FavorisContext.Provider value={{ favoris, ajouterFavori }}>
            {children}
        </FavorisContext.Provider>
    );
}

export function useFavoris() {
    return useContext(FavorisContext);
}