import Link from 'next/link';

const Header = () => {
    return (
        <header className="select-none bg-gradient-to-r from-[#ED4690]/70 to-[#5522CC]/70 w-full h-full border-gray-200">
            <nav>
                <ul className="flex font-semibold text-white flex-wrap items-center justify-between px-4 lg:px-6 py-3 mx-auto max-w-2xl md:max-w-4xl lg:max-w-7xl">
                    <li>
                        <Link className="logo text-2xl font-serif" href="/">
                            uevent
                        </Link>
                    </li>
                    <li>
                        <Link
                            className="px-3 py-2.5 font-serif border-gray-300 border rounded-lg hover:bg-white/10"
                            href="/accounts/login"
                        >
                            Войти
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
