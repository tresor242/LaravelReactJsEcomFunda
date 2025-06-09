// Importation des modules nécessaires
import axios from "axios"; // Utilisé pour les appels HTTP
import { Link, useNavigate } from "react-router-dom"; // Navigation et liens internes
import swal from "sweetalert"; // Librairie pour les notifications visuelles
import Cookies from "js-cookie"; // Permet d'accéder au token CSRF stocké dans les cookies

// Composant Navbar pour la navigation principale de l'application
function Navbar() {
  const navigate = useNavigate(); // Hook pour effectuer des redirections

  // Fonction déclenchée lors du clic sur le bouton de déconnexion
  const logoutSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    const csrfToken = Cookies.get('XSRF-TOKEN'); // Récupération du token CSRF depuis les cookies

    // Envoi d'une requête POST à l'API pour déconnecter l'utilisateur
    axios.post(`/api/logout`, {}, {
      headers: {
        'X-XSRF-TOKEN': decodeURIComponent(csrfToken), // Ajout du token dans les en-têtes
      },
      withCredentials: true, // Nécessaire pour l'envoi des cookies avec Laravel Sanctum
    })
    .then(res => {
      // Si la déconnexion est réussie
      if (res.data.status === 200) {
        // Suppression des données d'authentification locales
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_name');
        // Affichage d'une alerte de succès
        swal("Success", res.data.message, "success");
        // Redirection vers la page d'accueil
        navigate('/');
      }
    })
    .catch(err => {
      // Gestion des erreurs de la requête
      swal("Erreur", "Échec de la déconnexion", "error");
      console.error(err);
    });
  };

  // Affichage conditionnel selon l'état de connexion
  const AuthButtons = localStorage.getItem('auth_token') ? (
    // Bouton de déconnexion si l'utilisateur est connecté
    <li className="nav-item">
      <button
        type="button"
        onClick={logoutSubmit}
        className="nav-link btn btn-danger btn-sm text-white"
      >
        Logout
      </button>
    </li>
  ) : (
    // Liens vers Login et Register si l'utilisateur est déconnecté
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link className="nav-link" to="/login">Login</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/register">Register</Link>
      </li>
    </ul>
  );

  // Structure de la barre de navigation (Bootstrap 5)
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
      <div className="container">
        {/* Titre ou logo de la navbar */}
        <Link className="navbar-brand" to="#">Navbar</Link>

        {/* Bouton de toggler pour les petits écrans */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Liens de navigation */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="">Collection</Link>
            </li>

            {/* Insertion des boutons d'authentification selon l'état */}
            {AuthButtons}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
