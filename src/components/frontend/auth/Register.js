// Importation des hooks React et des modules nécessaires
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../layouts/frontend/Navbar"; // Barre de navigation du layout principal
import axios from "axios"; // Client HTTP pour les requêtes API
import swal from "sweetalert"; // Librairie d'alertes pour des messages visuels
import Cookies from 'js-cookie'; // Utilisé pour lire les cookies (notamment le token CSRF)

// Composant fonctionnel d'enregistrement utilisateur
function Register() {
    const navigate = useNavigate(); // Hook de navigation pour redirection

    // État local pour gérer les champs du formulaire et les erreurs de validation
    const [registerInput, setRegister] = useState({
        name: '',
        email: '',
        password: '',
        error_list: {}, // Contiendra les erreurs renvoyées par l’API
    });

    // Gère les changements dans les champs du formulaire
    const handleInput = (e) => {
        setRegister({ ...registerInput, [e.target.name]: e.target.value });
    };

    // Soumission du formulaire d'enregistrement
    const registerSubmit = (e) => {
        e.preventDefault(); // Empêche le rechargement de la page

        // Données envoyées à l'API pour l'enregistrement
        const data = {
            name: registerInput.name,
            email: registerInput.email,
            password: registerInput.password,
        };

        // Obtention du cookie CSRF de Laravel Sanctum
        axios.get('/sanctum/csrf-cookie').then(() => {
            const csrfToken = Cookies.get('XSRF-TOKEN'); // Lecture du token CSRF

            // Envoi des données d'enregistrement à l'API
            axios.post('/api/register', data, {
                headers: {
                    'X-XSRF-TOKEN': decodeURIComponent(csrfToken), // Inclusion du token CSRF dans l'en-tête
                },
            })
            .then(res => {
                // Si l'inscription est réussie
                if (res.data.status === 200) {
                    // Stockage des informations d'authentification en local
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    // Affichage d'une alerte de succès
                    swal("Success", res.data.message, "success");
                    // Redirection vers la page d'accueil
                    navigate('/');
                } else {
                    // Mise à jour de l'état avec les erreurs de validation
                    setRegister({ ...registerInput, error_list: res.data.validation_errors });
                }
            })
            .catch(error => {
                // Gestion des erreurs de validation côté serveur
                if (error.response && error.response.status === 422) {
                    setRegister({ ...registerInput, error_list: error.response.data.errors });
                }
            });
        });
    };

    // Rendu JSX du formulaire d'enregistrement
    return (
        <div>
            <Navbar />
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header"><h4>Register</h4></div>
                            <div className="card-body">
                                <form onSubmit={registerSubmit}>
                                    {/* Champ nom complet */}
                                    <div className="form-group mb-3">
                                        <label>Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            value={registerInput.name}
                                            onChange={handleInput}
                                        />
                                        {/* Affichage d'une erreur si présente */}
                                        {registerInput.error_list.name && (
                                            <span className="text-danger">{registerInput.error_list.name[0]}</span>
                                        )}
                                    </div>

                                    {/* Champ email */}
                                    <div className="form-group mb-3">
                                        <label>Email ID</label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            value={registerInput.email}
                                            onChange={handleInput}
                                        />
                                        {registerInput.error_list.email && (
                                            <span className="text-danger">{registerInput.error_list.email[0]}</span>
                                        )}
                                    </div>

                                    {/* Champ mot de passe */}
                                    <div className="form-group mb-3">
                                        <label>Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            className="form-control"
                                            value={registerInput.password}
                                            onChange={handleInput}
                                        />
                                        {registerInput.error_list.password && (
                                            <span className="text-danger">{registerInput.error_list.password[0]}</span>
                                        )}
                                    </div>

                                    {/* Bouton de soumission */}
                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-primary">Register</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
