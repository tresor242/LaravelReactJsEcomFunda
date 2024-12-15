import Profile from '../components/admin/Profile';
import Dashboard from '../components/admin/Dashboard';

const routes = [
   { path: '/', exact: true, name: 'Admin'}, // Route par défaut
   { path: '/dashboard', exact: true, name: 'Dashboard', Component: Dashboard },
   { path: '/profile', exact: true, name: 'Profile', Component: Profile },
];

export default routes;
