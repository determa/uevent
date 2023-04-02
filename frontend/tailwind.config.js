/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,jsx}"],
    theme: {
        extend: {
            backgroundImage: {
                header: "url('https://lifehacker.ru/wp-content/uploads/2016/09/concert_1474028386.jpg')",
            },
            backgroundColor: {
                purp: "#242565",
            },
        },
    },
    plugins: [],
};
