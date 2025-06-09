import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Cookies from "js-cookie"; // Ajout pour CSRF token

function Navbar() {
  const navigate = useNavigate();

  const logoutSubmit = (e) => {
    e.preventDefault();

    const csrfToken = Cookies.get('XSRF-TOKEN');

    axios.post(`/api/logout`, {}, {
      headers: {
        'X-XSRF-TOKEN': decodeURIComponent(csrfToken),
      },
      withCredentials: true,
    })
    .then(res => {
      if (res.data.status === 200) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_name');
        swal("Success", res.data.message, "success");
        navigate('/');
      }
    })
    .catch(err => {
      swal("Erreur", "Échec de la déconnexion", "error");
      console.error(err);
    });
  };

  const AuthButtons = localStorage.getItem('auth_token') ? (
    <li className="nav-item">
      <button type="button" onClick={logoutSubmit} className="nav-link btn btn-danger btn-sm text-white">Logout</button>
    </li>
  ) : (
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link className="nav-link" to="/login">Login</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/register">Register</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="#">Navbar</Link>
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

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="">Collection</Link>
            </li>
            {AuthButtons}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
