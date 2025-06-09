import Home from "./components/frontend/Home";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import MasterLayout from "./layouts/admin/MasterLayout";
import Login from "./components/frontend/auth/Login";
import Register from "./components/frontend/auth/Register";
import axios from "axios";
import { Navigate } from 'react-router-dom';

axios.defaults.baseURL = 'http://127.0.0.1:8000';
// axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> */}
        <Route path="/login" element={localStorage.getItem('auth_token') ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/register" element={localStorage.getItem('auth_token') ? <Navigate to="/" replace /> : <Register />} />
        <Route path="admin/*" element={<MasterLayout/>}/>
      </Routes>
    </Router>
  );
}

export default App;
