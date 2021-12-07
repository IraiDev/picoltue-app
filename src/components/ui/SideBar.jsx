import { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { UiContext } from '../../context/Ui'
import Button from './Button'

const SideBar = () => {
  const { sidebar, toggleSidebar } = useContext(UiContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/login', { replace: true })
  }

  return (
    <aside
      className={`
        bg-transparent p-3 h-full fixed w-64 z-50 top-0 left-0
        animate__animated animate__faster 
        ${sidebar ? 'animate__slideInLeft' : 'animate__slideOutLeft'
        }`} >
      <div className="bg-gray-100 relative border rounded-md shadow-2xl h-full">
        <header className="flex items-center justify-between mb-20 p-3 bg-gray-200">
          <h1 className="text-lg font-semibold">Zionit</h1>
          <Button
            className=""
            type="icon"
            icon="fas fa-times"
            onClick={toggleSidebar} />
        </header>
        <ul className="capitalize p-3 grid gap-1">
          <li className="hover:bg-gray-300 bg-gray-200 hover:text-blue-500 transition duration-300 rounded-md"
            onClick={toggleSidebar}
          >
            <NavLink
              className={({ isActive }) => `block px-4 py-2 ${isActive && 'text-purple-500 font-semibold'}`}
              to="/personal">
              ficha de inscripcion
            </NavLink>
          </li>
          <li className="hover:bg-gray-300 bg-gray-200 hover:text-blue-500 transition duration-300 rounded-md"
            onClick={toggleSidebar}
          >
            <NavLink
              className={({ isActive }) => `block px-4 py-2 ${isActive && 'text-purple-500 font-semibold'}`}
              to="/cosechas">
              lectura de cosechas
            </NavLink>
          </li>
        </ul>
        <Button
          className="place-items-end absolute bottom-4 left-5 rounded-md hover:bg-red-500 hover:text-white w-48"
          type="iconText"
          icon="fas fa-sign-out-alt"
          name="Cerrar sesion"
          onClick={handleLogout} />
      </div>
    </aside>
  )
}

export default SideBar
