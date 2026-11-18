import Navbar from "../navbar/navbar";
import styles from "./Layout.module.css";

export default function Layout({ children }) {

    return (
        <div className={styles.layout}>
            <Navbar />

            <main className={styles.contenu}>
                {children}
            </main>
        </div>
    );
}