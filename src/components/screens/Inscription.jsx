import { useState } from 'react'
import Td from '../table/Td'
import Th from '../table/Th'
import Button from '../ui/Button'
import Container from '../ui/Container'
import HrLabel from '../ui/HrLabel'
import Modal from '../ui/Modal'
import Pager from '../ui/Pager'
import Select from '../ui/Select'
import Input from '../ui/Input'

const options = [{ id: 10, name: 'option 1' }, { id: 2, name: 'option 2' }, { id: 3, name: 'option 3' }]

const arr = [
   1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27
]

const Inscription = () => {
   const [state, setstate] = useState(2)
   const [showModal, setShowModal] = useState(false)

   return (
      <>
         <Container
            title="Fichas de Inscripciones"
            user="Ignacio arriagada"
            toggleModal={() => setShowModal(true)} >
            <section className="mt-6 w-full overflow-custom">
               <div className="w-max mx-auto overflow-hidden rounded-lg shadow-lg">
                  <div className="w-full max-h-75vh overflow-custom">
                     <table className="w-full relative">
                        <thead className="sticky top-0">
                           <tr className="text-xs font-semibold tracking-wide text-center text-gray-900 bg-gray-200 capitalize">
                              <Th></Th>
                              <Th><Select options={options} value={state} onChange={e => setstate(e.target.value)} /></Th>
                              <Th><Select options={options} value={state} onChange={e => setstate(e.target.value)} /></Th>
                              <Th><Select options={options} value={state} onChange={e => setstate(e.target.value)} /></Th>
                              <Th></Th>
                              <Th><Select options={options} value={state} onChange={e => setstate(e.target.value)} /></Th>
                              <Th><Select options={options} value={state} onChange={e => setstate(e.target.value)} /></Th>
                              <Th></Th>
                           </tr>
                           <tr className="text-xs font-semibold tracking-wide text-center text-gray-900 bg-gray-200 uppercase">
                              <Th>#</Th>
                              <Th>ID</Th>
                              <Th>RUT</Th>
                              <Th>Nombre</Th>
                              <Th>telefono</Th>
                              <Th>comuna</Th>
                              <Th>ciudad</Th>
                              <Th>Acciones</Th>
                           </tr>
                        </thead>
                        <tbody className="bg-white">
                           {
                              arr.map((option, index) => (
                                 <tr key={index} className="text-gray-700 text-sm border-b">
                                    <Td borderLeft={false}>
                                       <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-md">
                                          {option}
                                       </span>
                                    </Td>
                                    <Td>ID</Td>
                                    <Td>RUT</Td>
                                    <Td>Nombre</Td>
                                    <Td>telefono</Td>
                                    <Td>comuna</Td>
                                    <Td>ciudad</Td>
                                    <Td>
                                       <div className="flex items-center justify-center">
                                          <Button
                                             className="text-red-400 hover:bg-gray-200 rounded-md"
                                             type="icon"
                                             icon="fas fa-trash-alt" />
                                          <Button
                                             className="text-blue-400 hover:bg-gray-200 rounded-md"
                                             type="icon"
                                             icon="fas fa-pen"
                                             onClick={() => setShowModal(true)} />
                                       </div>
                                    </Td>
                                 </tr>
                              ))
                           }
                        </tbody>
                     </table>
                  </div>
               </div>
            </section>
            <Pager />
         </Container>

         <Modal showModal={showModal} onClose={() => setShowModal(false)}>
            <section className="grid gap-4">
               <h1 className="uppercase font-semibold text-lg">NUEVA FICHA DE INSCRIPCION </h1>
               <HrLabel name="datos ficha" />
               <Input field="RUT" width="w-1/2" />
               <div className="grid grid-cols-2 gap-4">
                  <Input field="Primer nombre" />
                  <Input field="segundo nombre" />
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <Input field="apellido paterno" />
                  <Input field="apellido materno" />
               </div>
               <div className="pr-4">
                  <Input type="date" field="Fecha de nacimiento" width="w-1/2" />
               </div>
               <div className="flex items-center gap-4 w-1/2 pr-2">
                  <label className="capitalize text-xs w-24">nacionalidad:</label>
                  <Select className="p-2 bg-gray-100 rounded-md w-full" />
               </div>
               <HrLabel name="datos de postulacion" />
               <div className="grid grid-cols-2 gap-4">
                  <Input field="Dirección" />
                  <Input field="telefono" />
               </div>
               <section className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-4">
                     <label className="capitalize text-xs w-24">Comuna:</label>
                     <Select className="p-2 bg-gray-100 rounded-md w-full" />
                  </div>
                  <div className="flex items-center gap-4">
                     <label className="capitalize text-xs w-24">ciudad:</label>
                     <Select className="p-2 bg-gray-100 rounded-md w-full" />
                  </div>
               </section>
               <section className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-4">
                     <label className="capitalize text-xs w-24">sexo:</label>
                     <Select className="p-2 bg-gray-100 rounded-md w-full" />
                  </div>
                  <div className="flex items-center gap-4">
                     <label className="capitalize text-xs w-24">estado civil:</label>
                     <Select className="p-2 bg-gray-100 rounded-md w-full" />
                  </div>
               </section>
               <section className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-4">
                     <label className="capitalize text-xs w-24">sistema de salud:</label>
                     <Select className="p-2 bg-gray-100 rounded-md w-full" />
                  </div>
                  <div className="flex items-center gap-4">
                     <label className="capitalize text-xs w-24">sistema previsional:</label>
                     <Select className="p-2 bg-gray-100 rounded-md w-full" />
                  </div>
               </section>
               <div className="flex items-center gap-4 w-1/2 pr-2">
                  <label className="capitalize text-xs w-24">Cargo Postulación:</label>
                  <Select className="p-2 bg-gray-100 rounded-md w-full" />
               </div>
            </section>
            <footer className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
               <Button
                  className="rounded-full w-max border-2 border-red-400 hover:bg-red-400 text-red-500 hover:text-white"
                  name="cancelar"
                  shadow
                  onClick={() => setShowModal(false)}
               />
               <Button
                  className="rounded-full w-max place-self-end bg-green-400 hover:bg-green-500 text-white"
                  name="Guardar"
                  shadow
               />
            </footer>
         </Modal>

      </>
   )
}

export default Inscription
