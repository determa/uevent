import React from "react";
import Reg_navigate from "../router/Registration_navigate";
import Stepper from "../components/Stepper";
import { Link } from "react-router-dom";

const RegisterSteps = () => {
    return (
        <div className="bg-auth-back min-h-screen flex justify-center items-center flex-col gap-3">
            <Link className="logo text-4xl font-serif font-semibold" to="/">
                uevent
            </Link>
            {Reg_navigate()}
        </div>
    );
};

export default RegisterSteps;
