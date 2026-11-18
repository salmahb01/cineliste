import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import style from "./details.module.css";
import Modal from "../components/modal/modal.jsx";

export default function Details() {

    let { id } = useParams();
    let navigate = useNavigate();

    let [film, setFilm] = useState(null);
    let [chargement, setChargement] = useState(true);

    let [ouvrirModal, setOuvrirModal] = useState(false);

    let [nom, setNom] = useState("");
    let [note, setNote] = useState("");
    let [commentaire, setCommentaire] = useState("");

    let [avis, setAvis] = useState([]);

    useEffect(() => {

        async function chargerFilm() {
            try {
                let res = await fetch(
                    `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}&language=fr-FR`
                );

                let resultat = await res.json();

                setFilm(resultat);

            } catch (err) {
                console.log(err);
            } finally {
                setChargement(false);
            }
        }

        chargerFilm();

    }, [id]);

    function envoyerAvis(e) {
        e.preventDefault();

        if (nom.trim() === "" || note === "" || commentaire.trim() === "") {
            alert("Veuillez remplir tous les champs !");
            return;
        }

        let nouvelAvis = {
            id: Date.now(),
            nom: nom,
            note: note,
            commentaire: commentaire
        };

        setAvis([...avis, nouvelAvis]);

        setNom("");
        setNote("");
        setCommentaire("");
        setOuvrirModal(false);
    }

    if (chargement) return <p>Chargement...</p>;

    if (!film) return <p>Film introuvable.</p>;

    return (
        <div className={style.details}>

            <img
                className={style.image}
                src={
                    film.poster_path
                        ? `https://image.tmdb.org/t/p/w500${film.poster_path}`
                        : "https://placehold.co/300x450?text=No+Image"
                }
                alt={film.title}
            />

            <div className={style.infos}>

                <h2>{film.title}</h2>

                <p>{film.overview}</p>

                <p>Note : {film.vote_average} / 10</p>

                <p>Date de sortie : {film.release_date}</p>

                <button
                    className={style.bouton}
                    onClick={() => navigate(-1)}
                >
                    ← Retour
                </button>

                <button onClick={() => setOuvrirModal(true)}>
                    Ajouter un avis
                </button>

            </div>

            {ouvrirModal && (
                <Modal fermer={() => setOuvrirModal(false)}>

                    <h2>Ajouter un avis</h2>

                    <form onSubmit={envoyerAvis}>

                        <input
                            type="text"
                            placeholder="Votre nom"
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}
                        />

                        <select
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                        >
                            <option value="">Choisir une note</option>
                            <option value="1">1 / 10</option>
                            <option value="2">2 / 10</option>
                            <option value="5">5 / 10</option>
                            <option value="8">8 / 10</option>
                            <option value="10">10 / 10</option>
                        </select>

                        <textarea
                            placeholder="Votre commentaire..."
                            value={commentaire}
                            onChange={(e) => setCommentaire(e.target.value)}
                        />

                        <button type="submit">
                            Envoyer
                        </button>

                    </form>

                </Modal>
            )}

            <div>
                <h2>Avis des utilisateurs</h2>

                {avis.length > 0 ? (

                    avis.map((item) => (
                        <div key={item.id}>

                            <h3>{item.nom}</h3>

                            <p>Note : {item.note} / 10</p>

                            <p>{item.commentaire}</p>

                        </div>
                    ))

                ) : (
                    <p>Aucun avis pour le moment.</p>
                )}

            </div>

        </div>
    );
}