import Home from '../components/Home';
import HrAnalytics from '../components/HrAnalytics';
import Image from '../components/Image';

export const router = [
    { path: "/home", name: "Home", component: Home },
    { path: "/form-hr-analytics", name: "Formulaire", component: HrAnalytics },
    { path: "/image", name: "Image", component: Image},
    { redirect: true, path:"/", to:"/home", name: "Home"}
];