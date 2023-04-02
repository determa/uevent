import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="bg-gradient-to-r from-[#ED4690]/70 to-[#5522CC]/70 h-full w-full border-gray-200 px-4 lg:px-6 py-3 dark:bg-gray-800">
            <nav>
                <ul className="flex text-white flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <li>
                        <Link className="logo" to="/">
                            uevent
                        </Link>
                    </li>
                    <li>
                        <Link to="/">Schedule</Link>
                    </li>
                    <li>
                        <Link to="/">Speakers</Link>
                    </li>
                    <li>
                        <Link to={`/`}>Ticket</Link>
                    </li>
                    <li>
                        <Link to={`/`}>Contact</Link>
                    </li>
                    <li>
                        <Link to="/login">Create account</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
