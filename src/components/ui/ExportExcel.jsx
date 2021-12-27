import moment from 'moment'
import { useContext, useRef, useState } from 'react'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import { AppContext } from '../../context/AppContext'
import { UiContext } from '../../context/UiContext'
import Button from './Button'

const ExportExcel = ({ onClick, EnterpriseName = 'sin nombre' }) => {

   const { getHarvestExport } = useContext(AppContext)
   const { toggleLoading } = useContext(UiContext)
   const [data, setData] = useState([])
   const ref = useRef()

   const handleGetData = async () => {
      toggleLoading(true)
      const data = await getHarvestExport()
      setData(data.data)
      toggleLoading(false)
      ref.current.handleDownload()
   }

   return (
      <>
         <Button
            className='hover:bg-gray-200 block w-full'
            type='iconText'
            name='excel'
            icon='fas fa-file-excel text-green-500'
            onClick={handleGetData}
         />

         <div onClick={onClick}>
            <ReactHTMLTableToExcel
               ref={ref}
               id="test-table-xls-button"
               className="hidden"
               table="table1"
               filename="lectutas cosecha"
               sheet="lecturas"
               buttonText="Excel"
            ></ReactHTMLTableToExcel>
         </div>

         <table className='hidden' id="table1" border='1'>
            <thead>
               <tr>
                  <th align='left' colSpan={12}>nombre empresa: {EnterpriseName}</th>
               </tr>
               <tr>
                  <th align='left' colSpan={12}>fecha emision: {moment(new Date()).format('DD/MM/YYYY - HH:mm')}</th>
               </tr>
               <tr>
                  <th colSpan={12}>lecturas titulo</th>
               </tr>
               <tr>
                  <th>FUNDO</th>
                  <th>CUARTEL</th>
                  <th>ESPECIE</th>
                  <th>RUT COSECHERO</th>
                  <th>NOMBRE COSECHERO</th>
                  <th>CANTIDAD</th>
                  <th>UNIDAD</th>
                  <th>HORA LECTURA</th>
                  <th>EQUIPO</th>
                  <th>USUARIO</th>
                  <th>ID SERV</th>
                  <th>ID LOCAL</th>
               </tr>
            </thead>
            <tbody>
               {data.length > 0 &&
                  data.map((d, i) => (
                     <tr key={i}>
                        <td>{d.fundo}</td>
                        <td>{d.cuartel}</td>
                        <td>{d.especie}</td>
                        <td>{d.rut_cosechero}</td>
                        <td>{d.nombre_cosechero}</td>
                        <td align='right'>{d.cantidad}</td>
                        <td align='left'>{d.unidad}</td>
                        <td>{d.hora}</td>
                        <td>{d.equipo}</td>
                        <td>{d.usuario}</td>
                        <td>{d.idServ}</td>
                        <td>{d.idLocal}</td>
                     </tr>
                  ))}
            </tbody>
         </table>
      </>
   )
}

export default ExportExcel
