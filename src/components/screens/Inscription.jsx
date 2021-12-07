import { useState } from 'react'
import Td from '../table/Td'
import Th from '../table/Th'
import Button from '../ui/Button'
import Container from '../ui/Container'
import Select from '../ui/Select'

const options = [{ id: 10, name: 'option 1' }, { id: 2, name: 'option 2' }, { id: 3, name: 'option 3' }]

const arr = [
   1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27
]

const Inscription = () => {
   const [state, setstate] = useState(2)

   return (
      <Container title="Fichas de Inscripciones" user="Ignacio arriagada">
         <section className="mt-6 w-full overflow-custom">
            <div className="w-max mx-auto mb-8 overflow-hidden rounded-lg shadow-lg">
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
                                       <Button className="text-red-400 hover:bg-gray-200 rounded-md" type="icon" icon="fas fa-trash-alt" />
                                       <Button className="text-blue-400 hover:bg-gray-200 rounded-md" type="icon" icon="fas fa-pen" />
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
      </Container>
   )
}

export default Inscription
