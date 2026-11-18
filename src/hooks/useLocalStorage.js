import { useState } from "react";

export default function useLocalStorage(cle, valeurInitiale) {

    let [valeur, setValeur] = useState(() => {
        let donnees = localStorage.getItem(cle);

        return donnees ? JSON.parse(donnees) : valeurInitiale;
    });

    function modifierValeur(nouvelleValeur) {
        setValeur(nouvelleValeur);
        localStorage.setItem(cle, JSON.stringify(nouvelleValeur));
    }

    return [valeur, modifierValeur];
} 