import Nav from '../Nav'
import Footer from '../Footer'
import { Outlet } from 'react-router-dom'
export default function Root() {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  )
}