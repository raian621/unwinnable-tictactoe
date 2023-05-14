import { Link, Outlet } from "react-router-dom";
import './Layout.css'

export default function Layout() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link className='title' to='/'>Unwinnable Tic-Tac-Toe</Link>
          </li>
          <li>
            <Link to='/about'>About</Link>
          </li>
        </ul>
      </nav>
      <Outlet/>
    </>
  )
}