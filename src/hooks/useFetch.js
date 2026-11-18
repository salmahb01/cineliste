import { useEffect, useState } from "react";

export default function useFetch(url) {

    let [data, setData] = useState(null);
    let [chargement, setChargement] = useState(true);
    let [erreur, setErreur] = useState(null);

    useEffect(() => {

        let controller = new AbortController();

        async function charger() {
            try {
                setChargement(true);
                setErreur(null);

                let res = await fetch(url, {
                    signal: controller.signal
                });

                if (!res.ok) {
                    throw new Error("Erreur lors du chargement");
                }

                let resultat = await res.json();
                setData(resultat);

            } catch (err) {
                if (err.name !== "AbortError") {
                    setErreur(err.message);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setChargement(false);
                }
            }
        }

        charger();

        return () => controller.abort();

    }, [url]);

    return { data, chargement, erreur };
}