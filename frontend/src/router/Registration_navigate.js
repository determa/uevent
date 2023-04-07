import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import AuthPage from "../pages/AuthPage";
import RegisterSecondPage from "../pages/RegisterSecondPage";
import Stepper from "../components/Stepper";
import ConfirmEmailPage from "../pages/ConfirmEmailPage";

export default function RegNavigate() {
    const { isAuth, type, confirmed } = useSelector(
        (state) => state.userReducer
    );
    if (!isAuth) {
        return (
            <>
                <Stepper step={1} />
                <AuthPage />
            </>
        );
    }
    console.log(type)
    if (type == "NONE") {
        return (
            <>
                <Stepper step={2} />
                <RegisterSecondPage />
            </>
        );
    }
    if (!confirmed) {
        return (
            <>
                <Stepper step={3} />
                <ConfirmEmailPage />
            </>
        );
    }
    return <Navigate to={'/'} replace />;
};
