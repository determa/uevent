import React from "react";
import Page_by_step from "../router/Registration_navigate";
import Stepper from "../components/Stepper";
import { Link } from "react-router-dom";

const RegisterSteps = ({ step_init }) => {
    console.log(step_init)

    return (
        <div className="bg-auth-back min-h-screen flex justify-center items-center flex-col gap-3">
            <Link className="logo text-4xl font-serif font-semibold" to="/">
                uevent
            </Link>
            <Stepper step={step_init} />
            {Page_by_step(step_init)}
        </div>
    );
};

export default RegisterSteps;
