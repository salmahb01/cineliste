import style from "./navbar.module.css";
import logo from "../../assets/logo.png";

export default function Navbar() {
    return (
        <nav className={style.navbar}>

            <img
                src={logo}
                alt="CinéListe"
                className={style.logo}
            />

            <div className={style.links}>
                <a href="/">Accueil</a>
                <a href="/favoris">Favoris</a>
                <a href="/compte/profil">Mon compte</a>
            </div>

        </nav>
    );
} 