import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import MintPage from './MintPage'
import Top from './Top'
import About from './About'
import Combine from './Combine'
import { CombineClock } from './CombineClock'
import Colors from './Colors'
import Root from './routes/root'
import ErrorPage from './error-page'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AboutCombining from './AboutCombining'

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
        path: "/about/combining",
        element: <AboutCombining />
      },
      {
        path: "/free",
        element: <MintPage />
      },
      {
        path: "/combine",
        element: <Combine />
      },
      {
        path: "/colors",
        element: <Colors />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
