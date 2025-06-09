// Importation des modules React, des hooks et bibliothèques nécessaires
import React, { useState } from 'react';
import Navbar from '../../../layouts/frontend/Navbar'; // Composant de navigation principal
import axios from 'axios'; // Librairie pour les appels HTTP
import swal from 'sweetalert'; // Librairie pour les alertes visuelles
import { useNavigate } from 'react-router-dom'; // Hook pour la redirection
import Cookies from 'js-cookie'; // Permet de lire le cookie contenant le token CSRF

// Composant fonctionnel de connexion utilisateur
function Login() {
    const navigate = useNavigate(); // Hook pour naviguer vers d'autres pages

    // État local pour gérer les champs du formulaire et les erreurs
    const [loginInput, setLogin] = useState({
        email: '',
        password: '',
        error_list: {}, // Contiendra les erreurs de validation (si existantes)
    });

    // Fonction déclenchée à chaque changement dans les champs du formulaire
    const handleInput = (e) => {
        setLogin({ ...loginInput, [e.target.name]: e.target.value });
    };

    // Fonction exécutée lors de la soumission du formulaire
    const loginSubmit = (e) => {
        e.preventDefault(); // Empêche le rechargement de la page

        // Données à envoyer à l'API
        const data = {
            email: loginInput.email,
            password: loginInput.password,
        };

        // Appel initial pour obtenir le cookie CSRF via Laravel Sanctum
        axios.get('/sanctum/csrf-cookie').then(() => {
            // Récupération du token CSRF depuis le cookie
            const csrfToken = Cookies.get('XSRF-TOKEN');

            // Envoi de la requête POST pour la connexion
            axios.post('/api/login', data, {
                headers: {
                    'X-XSRF-TOKEN': decodeURIComponent(csrfToken), // Ajout du token dans les headers
                },
                withCredentials: true, // Inclut les cookies dans la requête (important avec Sanctum)
            })
            .then(res => {
                // Si l'utilisateur est authentifié avec succès
                if (res.data.status === 200) {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    swal("Success", res.data.message, "success");
                    navigate('/'); // Redirection vers la page d'accueil
                }
                // Si les identifiants sont incorrects
                else if (res.data.status === 401) {
                    swal("Warning", res.data.message, "warning");
                }
                // Si des erreurs de validation sont retournées
                else {
                    setLogin({ ...loginInput, error_list: res.data.validation_errors });
                }
            })
            .catch(err => {
                // Gestion des erreurs réseau ou inattendues
                swal("Erreur", "Une erreur est survenue lors de la connexion.", "error");
                console.error(err);
            });
        });
    };

    // Rendu du formulaire de connexion
    return (
        <div>
            <Navbar />
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Login</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={loginSubmit}>
                                    {/* Champ email */}
                                    <div className="form-group mb-3">
                                        <label>Email ID</label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            value={loginInput.email}
                                            onChange={handleInput}
                                        />
                                        {loginInput.error_list.email && (
                                            <span className="text-danger">{loginInput.error_list.email[0]}</span>
                                        )}
                                    </div>

                                    {/* Champ mot de passe */}
                                    <div className="form-group mb-3">
                                        <label>Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            className="form-control"
                                            value={loginInput.password}
                                            onChange={handleInput}
                                        />
                                        {loginInput.error_list.password && (
                                            <span className="text-danger">{loginInput.error_list.password[0]}</span>
                                        )}
                                    </div>

                                    {/* Bouton de connexion */}
                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-primary">Login</button>
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

export default Login;
