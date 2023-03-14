import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AuthForm from "./components/AuthForm.jsx";
import Counter from "./Counter";
import App from "./App";
import AuthPage from "./pages/AuthPage";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        {/* <App /> */}
        <AuthPage />
    </React.StrictMode>
);
