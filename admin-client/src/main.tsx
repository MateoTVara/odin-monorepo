import { StrictMode } from 'react'
import { createBrowserRouter } from 'react-router'
import { createRoot } from 'react-dom/client'
import AppProviders from './context/AppProviders.tsx'
import { RouterProvider } from 'react-router/dom'
import routes from './routes/routes.tsx'
import './index.css'

const router = createBrowserRouter(routes)

const root = document.getElementById('root')

createRoot(root!).render(
  <StrictMode>
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  </StrictMode>,
)
