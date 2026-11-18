import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/layout/layout.jsx";
import Accueil from "./page/accueil.jsx";
import Favoris from "./page/favoris.jsx";
import Profil from "./page/profil.jsx";
import Details from "./page/details";

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Accueil />} />

                    <Route path="/favoris" element={<Favoris />} />

                    <Route path="/compte">
                       <Route path="profil" element={<Profil />} />
                    </Route>

                    <Route path="/films/:id" element={<Details />} />

                    <Route
                        path="*"
                        element={<h1>404 - Page introuvable</h1>}
                    />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;