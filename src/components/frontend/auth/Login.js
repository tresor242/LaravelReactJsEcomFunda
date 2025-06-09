import React, { useState } from 'react';
import Navbar from '../../../layouts/frontend/Navbar';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // <-- Ajouté pour récupérer XSRF-TOKEN

function Login() {
    const navigate = useNavigate();

    const [loginInput, setLogin] = useState({
        email: '',
        password: '',
        error_list: {},
    });

    const handleInput = (e) => {
        setLogin({ ...loginInput, [e.target.name]: e.target.value });
    };

    const loginSubmit = (e) => {
        e.preventDefault();

        const data = {
            email: loginInput.email,
            password: loginInput.password,
        };

        // Appel au cookie CSRF, puis POST avec le token transmis
        axios.get('/sanctum/csrf-cookie').then(() => {
            const csrfToken = Cookies.get('XSRF-TOKEN');

            axios.post('/api/login', data, {
                headers: {
                    'X-XSRF-TOKEN': decodeURIComponent(csrfToken),
                },
                withCredentials: true,
            }).then(res => {
                if (res.data.status === 200) {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    swal("Success", res.data.message, "success");
                    navigate('/');
                } else if (res.data.status === 401) {
                    swal("Warning", res.data.message, "warning");
                } else {
                    setLogin({ ...loginInput, error_list: res.data.validation_errors });
                }
            }).catch(err => {
                swal("Erreur", "Une erreur est survenue lors de la connexion.", "error");
                console.error(err);
            });
        });
    };

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
