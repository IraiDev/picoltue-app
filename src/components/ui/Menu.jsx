import { useEffect, useState } from 'react'
import Button from './Button'
import OnOutsiceClick from 'react-outclick'
import { useWindowSize } from '../../hooks/useSize'
import ExportExcel from './ExportExcel'
import { PDFDownloadLink } from '@react-pdf/renderer'
import PDFResume from '../pdf/PDFResume'

const Menu = () => {
   const { width } = useWindowSize()
   const [showMenu, setShowMenu] = useState(false)

   useEffect(() => {
      return null // desmontar menu para evitar warning
   }, [showMenu])

   return (
      <OnOutsiceClick onOutsideClick={() => setShowMenu(false)}>
         <div className="relative">
            <Button
               className={`${width < 768 ? 'rounded-md' : 'rounded-full'} bg-blue-400 hover:bg-blue-500 text-white`}
               shadow
               type={width < 768 ? 'icon' : 'iconText'}
               icon="fas fa-file-export"
               iconFirst
               name="exportar"
               onClick={() => setShowMenu(!showMenu)} />
            {showMenu &&
               <section
                  className={`
                  absolute top-12 right-0 z-40 w-60 bg-white shadow-2xl border rounded-md
                  animate__animated animate__fadeIn animate__faster
                  `}
               >
                  <ExportExcel onClick={() => setShowMenu(!showMenu)} />
                  <hr />
                  <PDFDownloadLink
                     className='font-semibold block text-center py-1.5 hover:bg-gray-200'
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
                     className='font-semibold block text-center py-1.5 hover:bg-gray-200'
                     document={<PDFResume />}
                     fileName="somename.pdf"
                  >
                     {({ loading }) =>
                        loading ? <div>Cargando... <i className="fas fa-file-pdf text-red-400"></i></div> :
                           <div>Especifico <i className="fas fa-file-pdf text-red-400"></i></div>
                     }

                  </PDFDownloadLink>
               </section>

            }
         </div>
      </OnOutsiceClick >
   )
}

export default Menu
