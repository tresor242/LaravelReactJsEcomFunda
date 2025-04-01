import Profile from "../components/admin/Profile";
import Dashboard from "../components/admin/Dashboard";

const routes = [
    {path: '/', name: 'Admin'},
    {path: '/dashboard', name: 'Dashboard', Component: Dashboard},
    {path: '/profile', name: 'Profile', Component: Profile}
];

export default routes;