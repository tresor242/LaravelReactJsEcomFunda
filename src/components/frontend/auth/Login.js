import React, { useState } from 'react'
import Navbar from '../../../layouts/frontend/Navbar'

function Login() {

    const [loginIput, setLogin] = useState({
        email: 'vv',
        password: 'vv',
    });

    const handleInput = (e) => {
        setLogin({...loginIput, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log("Donnee a envoyer :", loginIput);
        
    }

  return (
    <div>
        <Navbar/>
        <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Login</h4>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group mb-3">
                                            <label>Email ID</label>
                                            <input type="email" name="email" className="form-control" value={loginIput.email} onChange={handleInput}/>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Password</label>
                                            <input type="password" name="password" className="form-control" value={loginIput.password} onChange={handleInput}/>
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
    </div>
  )
}

export default Login
