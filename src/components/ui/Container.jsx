import { useContext } from 'react'
import { UiContext } from '../../context/Ui'
import { useWindowSize } from '../../hooks/useSize'
import Button from './Button'
import Menu from './Menu'

const Container = ({ children, title = 'Titulo', user = 'user', showMenu = false, toggleModal = () => { } }) => {
   const { toggleSidebar } = useContext(UiContext)
   const { width } = useWindowSize()

   return (
      <div className="h-screen w-full bg-white p-6">
         <header className="bg-gray-100 py-2 px-5 rounded-md flex items-center justify-between border border-gray-200 shadow-md">
            <Button
               className="rounded-lg hover:bg-gray-300"
               type="icon"
               onClick={toggleSidebar} />
            <div className="flex items-center gap-4">
               <h1 className="text-xl font-semibold text-center">{title}</h1>
               {showMenu && <Menu />}
               {!showMenu &&
                  <Button
                     className={`${width < 768 ? 'rounded-md' : 'rounded-full'} bg-green-400 hover:bg-green-500 text-white`}
                     type={width < 768 ? 'icon' : 'iconText'}
                     icon="fas fa-user-plus"
                     iconFirst
                     name="Nuevo"
                     tooltip="crear nuevo usuario"
                     onClick={toggleModal} />
               }
            </div>
            <h1 className="text-base font-semibold text-center capitalize hidden md:inline">{user}</h1>
         </header>
         {children}
      </div >
   )
}

export default Container
