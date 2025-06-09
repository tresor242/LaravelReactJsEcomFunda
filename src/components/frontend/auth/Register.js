import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../layouts/frontend/Navbar";
import axios from "axios";
import swal from "sweetalert";
import Cookies from 'js-cookie';

function Register() {
    const navigate = useNavigate();

    const [registerInput, setRegister] = useState({
        name: '',
        email: '',
        password: '',
        error_list: {},
    });

    const handleInput = (e) => {
        setRegister({ ...registerInput, [e.target.name]: e.target.value });
    };

    const registerSubmit = (e) => {
    e.preventDefault();

    const data = {
        name: registerInput.name,
        email: registerInput.email,
        password: registerInput.password,
    };

    axios.get('/sanctum/csrf-cookie').then(() => {
        const csrfToken = Cookies.get('XSRF-TOKEN'); // Récupère le token dans le cookie

        axios.post('/api/register', data, {
            headers: {
                'X-XSRF-TOKEN': decodeURIComponent(csrfToken), // L’envoie manuellement
            },
        })
        .then(res => {
            if (res.data.status === 200) {
                localStorage.setItem('auth_token', res.data.token);
                localStorage.setItem('auth_name', res.data.username);
                swal("Success", res.data.message, "success");
                navigate('/');
            } else {
                setRegister({ ...registerInput, error_list: res.data.validation_errors });
            }
        })
        .catch(error => {
            if (error.response && error.response.status === 422) {
                setRegister({ ...registerInput, error_list: error.response.data.errors });
            }
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
                            <div className="card-header"><h4>Register</h4></div>
                            <div className="card-body">
                                <form onSubmit={registerSubmit}>
                                    <div className="form-group mb-3">
                                        <label>Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            value={registerInput.name}
                                            onChange={handleInput}
                                        />
                                        {registerInput.error_list.name && (
                                            <span className="text-danger">{registerInput.error_list.name[0]}</span>
                                        )}
                                    </div>

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
