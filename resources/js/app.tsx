import type { AppPage } from '@inertiajs/react';
import { createInertiaApp as ReactApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { route as routeFn } from 'ziggy-js';
import { initializeTheme } from './hooks/use-appearance';

declare global {
    const route: typeof routeFn;
}

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

ReactApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        // Get the page component (which is the currently rendered component)
        const PageComponent = props.initialPage.component as unknown as AppPage;
        const getLayout = PageComponent.layout || ((page: React.ReactNode) => page);

        root.render(getLayout(<App {...props} />));
    },
    progress: {
        color: '#ffc603',
    },
});

// This will set light / dark mode on load...
initializeTheme();
