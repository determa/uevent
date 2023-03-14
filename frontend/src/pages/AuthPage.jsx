import AuthForm from "../components/AuthForm";
import SignUpForm from "../components/SignUpForm";
import Saly from "../images/Saly-1.svg";

const AuthPage = () => {
    return (
        <div className="bg-auth-back min-h-screen flex justify-center items-center flex-col">
            <SignUpForm />
            <AuthForm />
        </div >
    );
};

export default AuthPage;
