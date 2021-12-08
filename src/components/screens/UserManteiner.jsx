import React, { useEffect, useState } from 'react'
import Table from '../table/Table'
import TBody from '../table/TBody'
import Td from '../table/Td'
import Th from '../table/Th'
import THead from '../table/THead'
import Button from '../ui/Button'
import Container from '../ui/Container'
import HrLabel from '../ui/HrLabel'
import Input from '../ui/Input'
import Modal from '../ui/Modal'
import Select from '../ui/Select'

const options = [{ id: 10, name: 'option 1' }, { id: 2, name: 'option 2' }, { id: 3, name: 'option 3' }]

const arr = [
   1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27
]

let initForm = {
   rut: '',
   name: '',
   email: '',
   login: ''
}

const UserManteiner = () => {
   const [state, setstate] = useState(2)
   const [showModal, setShowModal] = useState(false)
   const [isUpdate, setIsUpdate] = useState(false)
   const [values, setValues] = useState(initForm)
   const { rut, name, email, login } = values

   const handleCloseModal = () => {
      setShowModal(false)
      setValues(initForm)
   }

   useEffect(() => {
      if (isUpdate) {
         initForm = {
            rut: '1111-2',
            name: 'juan',
            email: 'a@a.cl',
            login: 'juanito'
         }
      }
      else {
         initForm = {
            rut: '',
            name: '',
            email: '',
            login: ''
         }
      }
      setValues(initForm)
   }, [isUpdate])

   return (
      <>
         <Container
            title="Usuarios del sistema"
            user="Ignacio arriagada"
            toggleModal={() => {
               setIsUpdate(false)
               setShowModal(true)
            }}
         >
            <Table>
               <THead>
                  <tr className="text-xs font-semibold tracking-wide text-center text-gray-900 bg-gray-200 capitalize">
                     <Th><Select options={options} value={state} onChange={e => setstate(e.target.value)} /></Th>
                     <Th><Select options={options} value={state} onChange={e => setstate(e.target.value)} /></Th>
                     <Th><Select options={options} value={state} onChange={e => setstate(e.target.value)} /></Th>
                     <Th></Th>
                  </tr>
                  <tr className="text-xs font-semibold tracking-wide text-center text-gray-900 bg-gray-200 uppercase">
                     <Th>RUT</Th>
                     <Th>Nombre</Th>
                     <Th>login</Th>
                     <Th>acciones</Th>
                  </tr>
               </THead>
               <TBody>
                  {
                     arr.map((option, index) => (
                        <tr key={index} className="text-gray-700 text-sm border-b">
                           <Td borderLeft={false}>RUT</Td>
                           <Td>Nombre</Td>
                           <Td>Login</Td>
                           <Td>
                              <div className="flex items-center justify-center">
                                 <Button
                                    className="text-blue-400 hover:bg-gray-200 rounded-md"
                                    type="icon"
                                    icon="fas fa-pen"
                                    onClick={() => {
                                       setIsUpdate(true)
                                       setShowModal(true)
                                    }} />
                                 <Button
                                    className="text-green-400 hover:bg-gray-200 rounded-md"
                                    type="icon"
                                    icon="fas fa-undo" />
                              </div>
                           </Td>
                        </tr>
                     ))
                  }
               </TBody>
            </Table>
         </Container>

         <Modal showModal={showModal} onClose={handleCloseModal}
            className="max-w-lg" padding="p-7" >
            <section className="grid gap-4">
               <h1 className="uppercase font-semibold text-lg">
                  {
                     isUpdate ? 'modificar usuario' : 'Nuevo usuario'
                  }
               </h1>
               <HrLabel name="datos usuario" />
               <Input
                  field="RUT"
                  name="rut"
                  value={rut}
                  onChange={e => setValues({
                     ...values,
                     rut: e.target.value
                  })} />
               <Input
                  field="Nombre completo"
                  name="name"
                  value={name}
                  onChange={e => setValues({
                     ...values,
                     name: e.target.value
                  })} />
               <Input
                  field="correo"
                  name="email"
                  value={email}
                  onChange={e => setValues({
                     ...values,
                     email: e.target.value
                  })} />
               <Input
                  field="login"
                  name="login"
                  value={login}
                  onChange={e => setValues({
                     ...values,
                     login: e.target.value
                  })} />

            </section>
            <footer className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
               <Button
                  className="rounded-full w-max border-2 border-red-400 hover:bg-red-400 text-red-500 hover:text-white"
                  name="cancelar"
                  shadow
                  onClick={handleCloseModal}
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

export default UserManteiner
