import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import AuthPage from "../pages/AuthPage";
import RegisterSecondPage from "../pages/RegisterSecondPage";
import ConfirmEmailPage from "../pages/ConfirmEmailPage";

export default function Page_by_step(step_init) {
    const { isAuth, type, confirmed } = useSelector(
        (state) => state.userReducer
    );

    switch (step_init) {
        case 1:
            if (!isAuth) {
                return <AuthPage />;
            } else {
                return RegNavigate(isAuth, type, confirmed);
            }
        case 2:
            if (type === 'NONE') {
                return <RegisterSecondPage />;
            } else {
                return RegNavigate(isAuth, type, confirmed);
            }
        case 3:
            if (!confirmed && isAuth) {
                return <ConfirmEmailPage />;
            } else {
                return RegNavigate(isAuth, type, confirmed);
            }

        default:
            break;
    }
}

const RegNavigate = (isAuth, type, confirmed) => {
    if (!isAuth) {
        return (
            <Navigate to={'/auth'} />
        );
    }
    if (type === "NONE") {
        return (
            <Navigate to={'/account-modification'} />
        );
    }
    if (!confirmed) {
        return (
            <Navigate to={'/email-confirmation'} />
        );
    }
    return <Navigate to={'/'} replace />;
};

