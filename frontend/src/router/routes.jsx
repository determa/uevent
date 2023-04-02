import AuthPage from '../pages/AuthPage';
import RegisterPage from '../pages/RegisterSecondPage';


export const publicRoutes = [
    {path: "/auth", component: <AuthPage />},
    {path: "/register", component: <RegisterPage />},
    // {path: "/password-reset", component: passwordResetPage, exact: true},
    // {path: "/password-reset/:token", component: passwordResetStep2Page, exact: true},
    // {path: "/", component: mainPage, exact: true},
    // {path: "/events", component: EventsPage, exact: true},
    // {path: "/events/:id", component: EventPage, exact: true},
    // {path: "/organizations", component: Organizations, exact: true},
    // {path: "/organizations/:id", component: OrgPage, exact: true},
    // {path: "/error", component: registrationPage, exact: true}
];

// export const privateRoutes = [
//     {path: "/", component: mainPage, exact: true},
//     {path: "/events", component: EventsPage, exact: true},
//     {path: "/events/:id", component: EventPage, exact: true},
//     {path: "/organizations", component: Organizations, exact: true},
//     {path: "/organizations/:id", component: OrgPage, exact: true},
//     {path: "/myaccount", component: registrationPage, exact: true},
//     {path: "/error", component: registrationPage, exact: true},
//     {path: '/create_event', component: CreateEventPage, exact: true}
// ];

// export const adminRoutes = [
//     {path: "/admin", component: registrationPage, exact: true},
// ];