import logo from '../assets/images/logo.png'

import { Link } from 'react-scroll';

export default function Header() {

    return (
        <header className="border-b-2 border-black border-solid sticky shadow-md top-0 bg-orange-400">
            <div className="flex justify-between items-center my-0 mx-auto max-w-5xl py-5 px-12">
                <Link
                to="app"
                spy={true}
                smooth={true}
                duration={500}
                className="flex text-white items-center no-underline hover:text-slate-100 hover:scale-105 active:opacity-80 active:scale-90 gap-2"
                >
                    <img src={logo} alt="logo" className="w-12" />
                    <span className="text-3xl">Your Library</span>
                </Link>
                <button className="md:hidden" id="hamburger-menu">🍔</button>
                <nav className="gap-5 hidden md:flex">
                    <Link
                        to="finder"
                        spy={true}
                        smooth={true}
                        duration={500}
                        offset={-80}
                        className="text-white no-underline hover:text-slate-100 hover:scale-105 active:opacity-80 active:scale-90"
                    >
                        Search
                    </Link>
                    <Link
                        to="collection"
                        spy={true}
                        smooth={true}
                        duration={500}
                        offset={-80}
                        className="text-white no-underline hover:text-slate-100 hover:scale-105 active:opacity-80 active:scale-90"
                    >
                        Collection
                    </Link>
                </nav>
            </div>
            <div className="gap-5 flex flex-col md:hidden bg-orange-300 animate-open-menu origin-top text-center p-5 " id="mobile-menu">
            <Link
                        to="finder"
                        spy={true}
                        smooth={true}
                        duration={500}
                        offset={-80}
                        className="text-white no-underline hover:text-slate-100 hover:scale-105 active:opacity-80 active:scale-90 text-2xl"
                    >
                        Search
                    </Link>
                    <Link
                        to="collection"
                        spy={true}
                        smooth={true}
                        duration={500}
                        offset={-80}
                        className="text-white no-underline hover:text-slate-100 hover:scale-105 active:opacity-80 active:scale-90 text-2xl"
                    >
                        Collection
                    </Link>
            </div>
        </header>
    )
} 