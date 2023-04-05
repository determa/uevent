import { useSelector } from "react-redux"
import { useNavigate } from "react-router";
import AuthPage from "../pages/AuthPage";
import RegisterSecondPage from "../pages/RegisterSecondPage";

export default () => {
    const { isAuth, type, confirmed } = useSelector(state => state.userReducer);
    const navigate = useNavigate();
    if (!isAuth) {
        return <AuthPage />;
    }
    if (type == 'NONE') {
        return <RegisterSecondPage />;
    }
    if (!confirmed) {
        return;
        // navigate
    }
    return navigate('/');
}