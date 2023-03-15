import { useState } from "react";
import AuthForm from "../components/AuthForm";
import SignUpForm from "../components/SignUpForm";
import Saly from "../images/Saly-1.svg";

const AuthPage = () => {

    let [page, setPage] = useState(false);

    return (
        <div className="bg-auth-back min-h-screen flex justify-center items-center">
            <div className="flex flex-col items-center bg-white rounded-lg shadow-sm p-5 gap-4">
                <h1>{page ? "SignUp" : "Login"}</h1>
                <div className="flex w-full">
                    <button className="flex-1" onClick={() => { setPage(false) }}>Login</button>
                    <button className="flex-1" onClick={() => { setPage(true) }}>SignUp</button>
                </div>
                <div className="flex">
                    {/* <SignUpForm /> */}
                    <AuthForm />
                </div>
            </div>
        </div >
    );
};

export default AuthPage;
