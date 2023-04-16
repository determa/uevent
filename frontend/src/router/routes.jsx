import MainPage from '../pages/MainPage';
import EventPage from '../pages/EventPage';
import Test from '../components/Test';
import Container from '../pages/Container';
import RegisterSteps from '../pages/RegisterSteps';
import ProfilePage from '../pages/ProfilePage';
import PorileCompanyPage from '../pages/ProfileCompanyPage';
import ConfirmEmail from '../services/ConfirmEmail';
import CreateEvent from '../components/CreateEvent';
import TicketsPage from '../pages/TicketsPage';
import FavoritePage from '../pages/FavoritePage';

export const publicRoutes = [
    { path: "/", component: <MainPage /> },
    { path: "/auth", component: <RegisterSteps step_init={1} /> },
    { path: "/account-modification", component: <RegisterSteps step_init={2} /> },
    { path: "/email-confirmation", component: <RegisterSteps step_init={3} /> },
    { path: "/profile/user/:id", component: <Container component={<ProfilePage />} /> },
    { path: "/profile/company/:id", component: <Container component={<PorileCompanyPage />} /> },
    { path: "/events/:id", component: <Container component={<EventPage />} /> },
    { path: "/events/create", component: <CreateEvent /> },
    { path: "/test", component: <Test /> },
    { path: "/validation/:id", component: <ConfirmEmail /> },
];

export const confirmedAccountRoutes = [
    { path: "/tickets", component: <Container component={<TicketsPage />} /> },
]

export const authRoutes = [
    
    { path: "/favorite", component: <Container component={<FavoritePage />} /> },
]

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