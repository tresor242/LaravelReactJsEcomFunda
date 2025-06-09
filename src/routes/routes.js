// Importation des composants de la section Admin
import Profile from "../components/admin/Profile";
import Dashboard from "../components/admin/Dashboard";

// Définition des routes accessibles dans l'interface d'administration
const routes = [
    {
        path: '/',                 // Chemin racine (peut servir de redirection ou page d'accueil admin)
        name: 'Admin'             // Nom symbolique de la route (utilisable pour les menus, logs, etc.)
    },
    {
        path: '/dashboard',       // Chemin vers le tableau de bord administrateur
        name: 'Dashboard',        // Nom affiché ou référencé dans les menus
        Component: Dashboard      // Composant React à afficher pour cette route
    },
    {
        path: '/profile',         // Chemin vers la page de profil de l'administrateur
        name: 'Profile',
        Component: Profile
    }
];

// Exportation des routes pour les consommer dans un composant de gestion de routes (e.g. React Router)
export default routes;
