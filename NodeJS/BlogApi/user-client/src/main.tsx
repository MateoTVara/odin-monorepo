// user-client/src/main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import routes from './router/routes.tsx'
import './index.css'
import { applyTheme, listenToSystemThemeChanges } from './utils/theme.ts';
import { AppProviders } from './context/AppProviders.tsx'

applyTheme();
listenToSystemThemeChanges();
const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <RouterProvider router={router}/>
    </AppProviders>
  </StrictMode>,
)
