import { PDFDownloadLink } from '@react-pdf/renderer'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import { UiContext } from '../../context/UiContext'
import { useWindowSize } from '../../hooks/useSize'
import Menu from '../menu/Menu'
import MenuContent from '../menu/MenuContent'
import PDFResume from '../pdf/PDFResume'
import Button from './Button'
import ExportExcel from './ExportExcel'

const Container = ({ children, title = 'Titulo', showMenu = false, toggleModal = () => { } }) => {
   const { user } = useContext(AppContext)
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
               {
                  showMenu &&
                  <Menu
                     className='py-1.5 px-3 text-white bg-blue-400 hover:bg-blue-500 rounded-full flex gap-2 items-center'
                     menuButton='Exportar'
                     icon={<i className="fas fa-file-export"></i>}
                  >
                     <MenuContent>
                        <ExportExcel />
                        <hr />
                        <PDFDownloadLink
                           className='font-semibold block text-center py-1.5 px-4 hover:bg-gray-200'
                           document={<PDFResume />}
                           fileName="somename.pdf"
                        >
                           {({ loading }) =>
                              loading ? <div>Cargando... <i className="fas fa-file-pdf text-red-400"></i></div> :
                                 <div>Resumen <i className="fas fa-file-pdf text-red-400"></i></div>
                           }

                        </PDFDownloadLink>
                        <hr />
                        <PDFDownloadLink
                           className='font-semibold block text-center py-1.5 px-4 hover:bg-gray-200'
                           document={<PDFResume />}
                           fileName="somename.pdf"
                        >
                           {({ loading }) =>
                              loading ? <div>Cargando... <i className="fas fa-file-pdf text-red-400"></i></div> :
                                 <div>Especifico <i className="fas fa-file-pdf text-red-400"></i></div>
                           }

                        </PDFDownloadLink>
                        <Link className='py-1.5 px-4 text-center block' to='/pdf' target="_blank">
                           ver pdf
                        </Link>
                     </MenuContent>
                  </Menu>
               }
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

            <h1 className="text-base font-semibold text-center capitalize hidden md:inline">{user.usuario.nom_user}</h1>
         </header>
         {children}
      </div >
   )
}

export default Container
