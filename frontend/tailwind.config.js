/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,jsx}"],
    theme: {
        extend: {
            backgroundImage: {
                header: `url('${process.env.REACT_APP_SERVER_DOMEN}/header.jpg')`,
            },
            backgroundColor: {
                purp: "#242565",
            },
        },
    },
    plugins: [],
};
