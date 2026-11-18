import { useState } from "react";
import { useFavoris } from "../../context/FavorisContext.jsx";

export default function Profil() {

    let { favoris } = useFavoris();

    let [nom, setNom] = useState(() => {
        let profil = JSON.parse(localStorage.getItem("profil"));
        return profil ? profil.nom : "Utilisateur";
    });

    let [email, setEmail] = useState(() => {
        let profil = JSON.parse(localStorage.getItem("profil"));
        return profil ? profil.email : "utilisateur@gmail.com";
    });

    function modifierProfil(e) {
        e.preventDefault();

        localStorage.setItem("profil", JSON.stringify({
            nom: nom,
            email: email
        }));

        alert("Profil modifié avec succès !");
    }

    return (
        <div>
            <h1>Mon Profil</h1>

            <div>
                <h2>Bienvenue sur CinéListe 🎬</h2>

                <form onSubmit={modifierProfil}>

                    <label>Nom :</label>
                    <input
                        type="text"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                    />

                    <label>Email :</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <button type="submit">
                        Modifier
                    </button>

                </form>
            </div>

            <div>
                <h3>Mes statistiques</h3>
                <p>Films favoris : {favoris.length} ❤️</p>
            </div>
        </div>
    );
}
