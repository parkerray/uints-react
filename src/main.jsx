import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Mint from './Mint'
import About from './About'
import Root from './routes/root'
import ErrorPage from './error-page'
import './index.css'
import { createHashRouter, RouterProvider } from 'react-router-dom';

const router = createHashRouter([
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
        element: <Mint />
      },
      {
        path: "/about",
        element: <About />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
