import AuthForm from "../components/AuthForm";
import Saly from "../images/Saly-1.svg";

const AuthPage = () => {
    return (
        <div className="bg-auth-back min-h-screen flex justify-center">
            <div className="flex items-center">
                <div className="bg-auth-form">
                    <img src={Saly} alt="img" />
                </div>
                <AuthForm />
            </div>
        </div>
    );
};

export default AuthPage;
