import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import AuthPage from "../pages/AuthPage";
import RegisterSecondPage from "../pages/RegisterSecondPage";
import Stepper from "../components/Stepper";
import ConfirmEmailPage from "../pages/ConfirmEmailPage";

export default () => {
    const { isAuth, type, confirmed } = useSelector(
        (state) => state.userReducer
    );
    const navigate = useNavigate();
    if (!isAuth) {
        return (
            <>
                <Stepper step={1} />
                <AuthPage />
            </>
        );
    }
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
    return navigate("/");
};
