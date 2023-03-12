import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AuthForm from "./components/AuthForm";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <AuthForm />
    </React.StrictMode>
);
