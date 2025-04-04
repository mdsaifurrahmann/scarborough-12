import { NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

const navItems: NavItem[] = [
    {
        title: 'SFF2025',
        url: '/sff',
        isActive: true,
    },
    {
        title: 'Home',
        url: '/home',
    },
    {
        title: 'Vision',
        url: '/vision',
    },
    {
        title: 'featured artist',
        url: '',
    },
    {
        title: 'gallery',
        url: '',
    },
    {
        title: 'contact',
        url: '/contact',
    },
    {
        title: 'join us',
        url: '/join-us',
        isActive: true,
    },
];


export default function Nav({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (open: boolean) => void }) {
    const page = usePage();

    return (
        <>
            {navItems.map((item: NavItem) => {
                const isContactLink = item.title === 'contact';

                return (
                    <div className={`nav-item ${menuOpen ? 'open' : ''}`} key={item.title}>
                        <Link
                            href={item.url}
                            className={`nav-link ${item.isActive ? 'text-secondary' : ''}`}
                            prefetch
                            onClick={(e) => {
                                if (!isContactLink) return; // Only handle contact link

                                const isHomePage = page.url === '/contact';

                                if (isHomePage) {
                                    e.preventDefault();
                                    document.getElementById('contact')?.scrollIntoView({
                                        behavior: 'smooth'
                                    });
                                } else {
                                    sessionStorage.setItem('scrollTo', 'contact');
                                }
                                setMenuOpen(false);
                            }}
                        >
                            {item.title}
                        </Link>
                    </div>
                );
            })}
        </>
    );
}
