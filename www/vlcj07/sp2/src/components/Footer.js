import logo from '../assets/images/logo.png'

import { Link } from 'react-scroll';

export default function Footer() {
    return(
        <footer className="border-t-2 border-solid border-black mt-auto bg-orange-400">
            <div className="flex justify-between py-5 px-12 items-center my-0 mx-auto max-w-5xl">
            <p className="text-white">
                All Rights Reserved
            </p>
            <Link
                to="app"
                spy={true}
                smooth={true}
                duration={500}
                className="flex text-white items-center no-underline hover:text-slate-100 hover:scale-105 active:opacity-80 active:scale-90 gap-2"
                >                <img src={logo} alt="logo" className="w-12" />
                <span className="text-3xl hidden md:inline">Your Library</span>
            </Link>
            <p className="text-white text-end">
                <span className="hidden md:inline">Copyright</span> ©2023 Jan Vlček
            </p>
        </div>
        </footer>
    )
} 