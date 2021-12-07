import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { UiContext } from '../../context/Ui'
import Button from './Button'

const SideBar = () => {
  const { sidebar, toggleSidebar } = useContext(UiContext)

  return (
    <aside
      className={`bg-transparent p-3 h-full w-64 fixed z-50 top-0 left-0
        animate__animated animate__faster text-white
        ${sidebar ? 'animate__slideInLeft' : 'animate__slideOutLeft'}`} >

      <div className="bg-gradient-to-b from-gray-700 via-gray-800 to-gray-700 rounded-lg shadow-2xl h-full p-4">
        <header className="flex items-center justify-between mb-20">
          <h1 className="text-lg font-semibold">Zionit</h1>
          <Button
            className=""
            type="icon"
            icon="fas fa-times"
            onClick={toggleSidebar} />
        </header>
        <ul className="capitalize grid gap-2">
          <li className="hover:bg-gray-900 transition duration-300 rounded-full"
            onClick={toggleSidebar}
          >
            <NavLink
              className={({ isActive }) => `block px-4 py-1 ${isActive && 'text-purple-500 font-semibold'}`}
              to="/personal">
              ficha de inscripcion
            </NavLink>
          </li>
          <li className="hover:bg-gray-900 transition duration-300 rounded-full"
            onClick={toggleSidebar}
          >
            <NavLink
              className={({ isActive }) => `block px-4 py-1 ${isActive && 'text-purple-500 font-semibold'}`}
              to="/cosechas">
              lectura de cosechas
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  )
}

export default SideBar
