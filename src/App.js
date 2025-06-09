// Importation des composants nécessaires
import Home from "./components/frontend/Home";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MasterLayout from "./layouts/admin/MasterLayout"; // Layout de l'espace admin
import Login from "./components/frontend/auth/Login";
import Register from "./components/frontend/auth/Register";
import axios from "axios";

// Configuration globale d'Axios pour les appels API
axios.defaults.baseURL = 'http://127.0.0.1:8000'; // URL de base de l'API Laravel
axios.defaults.withCredentials = true; // Nécessaire pour inclure les cookies (CSRF notamment)
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

// Intercepteur Axios pour ajouter le token d’authentification (Bearer)
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('auth_token'); // Récupération du token stocké localement
  config.headers.Authorization = token ? `Bearer ${token}` : ''; // Ajout du token dans les en-têtes si présent
  return config;
});

// Composant principal de l'application
function App() {
  return (
    <Router>
      <Routes>
        {/* Route publique : page d’accueil */}
        <Route path="/" element={<Home />} />

        {/* Routes d'authentification :
            - Redirige vers la page d'accueil si l'utilisateur est déjà connecté */}
        <Route
          path="/login"
          element={localStorage.getItem('auth_token') ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/register"
          element={localStorage.getItem('auth_token') ? <Navigate to="/" replace /> : <Register />}
        />

        {/* Toutes les routes commençant par /admin utilisent le layout MasterLayout */}
        <Route path="admin/*" element={<MasterLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
