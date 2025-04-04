import Nav from '@/components/client/nav';
import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

const ClientHeader = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const Page = usePage();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className={Page.url === '/sff' ? 'z-10 client-header ' : 'z-50 min-h-28 lg:min-h-64 client-header '}>

            {Page.url !== '/sff' && (
                <div className="relative z-40 h-4 w-full bg-white lg:hidden lg:h-0 lg:w-0"></div>
            )}

            <div className="container">
                <div className="flex flex-col items-center justify-center">
                    <div className="logo z-50">
                        <Link href={route('home')} prefetch>
                            <img src="/images/logo/ssf.svg" alt="Scarborough Folk Fest" className="mt-4 hidden w-64 lg:flex" />
                        </Link>
                    </div>
                    <nav className='z-50'>
                        <div className={'bg-primary relative z-30 flex w-full items-center justify-between rounded-md lg:hidden ' + (Page.url === '/sff' ? 'mt-4' : '')}>
                            <Link href={route('home')} prefetch>
                                <img loading="lazy" src="/images/logo/ssf.svg" alt="Scarborough Folk Fest" className="w-36 pt-1 lg:hidden" />
                            </Link>
                            <div className="hamburger">
                                <button
                                    className={`menu mr-2 ${menuOpen ? 'opened' : ''}`}
                                    aria-label="Main Menu"
                                    onClick={toggleMenu}
                                    aria-expanded={menuOpen}
                                >
                                    <svg width="40" height="40" viewBox="0 0 100 100">
                                        <path
                                            className="line line1"
                                            d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
                                        />
                                        <path className="line line2" d="M 20,50 H 80" />
                                        <path
                                            className="line line3"
                                            d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <Nav menuOpen={menuOpen} />
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default ClientHeader;
