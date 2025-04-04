import type { ReactNode } from 'react';

declare module '@inertiajs/react' {
  // Extend the page component type to optionally include a layout function
  export type AppPage = React.FC & {
    layout?: (page: ReactNode) => JSX.Element;
  };
}
