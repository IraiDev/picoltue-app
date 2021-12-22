import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UiContext } from '../../context/UiContext'
import Button from './Button'
import LiNav from './LiNav'
import logo from '../../assets/img/logo25x25.png'
import { AppContext } from '../../context/AppContext'
import { routes } from '../../types/types'

const { harvest, inscription, userManteiner, login } = routes

const SideBar = () => {
  const { showSidebar, toggleSidebar } = useContext(UiContext)
  const { logout } = useContext(AppContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate(login, { replace: true })
  }

  return (
    <aside
      className={`
        bg-gray-100 shadow-2xl h-screen fixed w-64 z-20 top-0 left-0
        animate__animated animate__faster text-gray-800 border
        ${showSidebar ? 'animate__slideInLeft' : 'animate__slideOutLeft'
        }`} >
      <header className="flex items-center justify-between bg-white py-4 px-3 border-b">
        <h1 className="text-base text-gray-800">Agricola Picoltue Limitada</h1>
        <Button
          className="hover:bg-gray-200 rounded-lg"
          type="icon"
          icon="fas fa-times"
          onClick={toggleSidebar} />
      </header>
      <section className="absolute top-12 bg-white left-1/2 transform -translate-x-1/2 w-max rounded-full border-4 border-white shadow-md">
        <img src={logo} alt="logo" />
      </section>
      <ul className="capitalize mt-20">
        <h5 className="font-light text-gray-500 px-3">Menu</h5>
        <LiNav
          to={harvest}
          name="lectura de cosechas"
          icon="fas fa-warehouse"
          onClick={toggleSidebar}
        />
        <LiNav
          to={inscription}
          name="ficha de inscripcion"
          icon="far fa-address-book"
          onClick={toggleSidebar}
        />
        <LiNav
          to={userManteiner}
          name="Mant. Usuarios"
          icon="fas fa-user-cog"
          onClick={toggleSidebar}
        />
      </ul>
      <Button
        className="absolute bottom-0 py-3 border-t w-full bg-white hover:bg-red-400 hover:text-white"
        type="iconText"
        icon="fas fa-sign-out-alt"
        iconFirst
        name="Cerrar sesion"
        onClick={handleLogout} />
    </aside>
  )
}

export default SideBar
