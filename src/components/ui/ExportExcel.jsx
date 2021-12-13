import React from 'react'
import ReactExport from "react-export-excel"
import Button from './Button'

const ExcelFile = ReactExport.ExcelFile
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn

const ExportExcel = ({ data = [], onClick }) => {
   return (
      <ExcelFile
         filename="export fichas"
         element={
            <Button
               type="iconText"
               className="hover:bg-gray-200 "
               icon="fas fa-file-excel text-green-500"
               name="Excel"
               onClick={onClick}
               block />
         } >
         <ExcelSheet data={data} name="fichas">
            <ExcelColumn label="Fundo" value="Fundo" />
            <ExcelColumn label="Cuartel" value="Cuartel" />
            <ExcelColumn label="Especie" value="Especie" />
            <ExcelColumn label="Rut_Cosechero" value="Rut_Cosechero" />
            <ExcelColumn label="Nombre_Cosechero" value="Nombre_Cosechero" />
            <ExcelColumn label="Cantidad" value="Cantidad" />
            <ExcelColumn label="Unidad_de_medida" value="Unidad_de_medida" />
            <ExcelColumn label="Hora_lectura" value="Hora_lectura" />
            <ExcelColumn label="Equipo" value="Equipo" />
            <ExcelColumn label="usuario" value="usuario" />
            <ExcelColumn label="idServ" value="idServ" />
            <ExcelColumn label="idLocal" value="idLocal" />
         </ExcelSheet>
      </ExcelFile>
   )
}

export default ExportExcel
