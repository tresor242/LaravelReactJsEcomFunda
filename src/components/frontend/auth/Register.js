import Navbar from "../../../layouts/frontend/Navbar";

function register() {
    return(
        <div>
            <Navbar/>
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Register</h4>
                                <div className="card-body">
                                    <form>
                                        <div className="form-group mb-3">
                                            <label>Full Name</label>
                                            <input type="" name="name" className="form-control" value=""/>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Email ID</label>
                                            <input type="" name="email" className="form-control" value=""/>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Password</label>
                                            <input type="" name="password" className="form-control" value=""/>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Confirm Password</label>
                                            <input type="" name="confirm_password" className="form-control" value=""/>
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
        </div>
    )
}

export default register;