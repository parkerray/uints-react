import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import MintPage from './MintPage'
import FreeMintPage from './FreeMintPage'
import About from './About'
import Root from './routes/root'
import ErrorPage from './error-page'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <App />
      },
      {
        path: "/mint",
        element: <MintPage />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/free",
        element: <FreeMintPage />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
