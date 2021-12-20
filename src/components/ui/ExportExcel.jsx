import ReactHTMLTableToExcel from 'react-html-table-to-excel'

const ExportExcel = ({ data = [], onClick }) => {

   return (
      <>
         <div disabled onClick={onClick}>
            <ReactHTMLTableToExcel
               id="test-table-xls-button"
               className="w-full relative p-1.5 border-2 border-transparent hover:border-green-400 z-20 transition duration-300"
               table="table1"
               filename="lectutas cosecha"
               sheet="lecturas"
               buttonText="Excel"
            ></ReactHTMLTableToExcel>
            <i className="fas fa-file-excel text-green-500 absolute right-20 top-3 z-10"></i>
         </div>

         <table className='hidden' id="table1" border='1'>
            <thead>
               <tr>
                  <th align='left' colSpan={12}>nombre empresa</th>
               </tr>
               <tr>
                  <th align='left' colSpan={12}>fecha emision</th>
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
                        <td>{d.rut_coseshero}</td>
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
