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

const Harvest = () => {
  const [state, setstate] = useState(2)

  return (
    <Container title="Lecturas de dispositivos de Cosechas" user="Ignacio arriagada">
      <section className="mt-6 w-full overflow-custom">
        <div className="w-table mx-auto overflow-hidden rounded-md shadow-lg">
          <div className="w-full max-h-75vh overflow-custom">
            <table className="w-full relative">
              <thead className="sticky top-0">
                <tr className="text-xs font-semibold tracking-wide text-center text-gray-900 bg-gray-200 ">
                  <Th></Th>
                  <Th><Select options={options} value={state} onChange={e => setstate(e.target.value)} /></Th>
                  <Th><Select options={options} value={state} onChange={e => setstate(e.target.value)} /></Th>
                  <Th><Select options={options} value={state} onChange={e => setstate(e.target.value)} /></Th>
                  <Th><Select options={options} value={state} onChange={e => setstate(e.target.value)} /></Th>
                  <Th><Select options={options} value={state} onChange={e => setstate(e.target.value)} /></Th>
                  <Th><Select options={options} value={state} onChange={e => setstate(e.target.value)} /></Th>
                  <Th><Select options={options} value={state} onChange={e => setstate(e.target.value)} /></Th>
                  <Th></Th>
                  <Th></Th>
                  <Th></Th>
                  <Th></Th>
                  <Th><Select options={options} value={state} onChange={e => setstate(e.target.value)} /></Th>
                  <Th></Th>
                  <Th></Th>
                  <Th></Th>
                </tr>
                <tr className="text-xs font-semibold tracking-wide text-center text-gray-900 bg-gray-200 uppercase">
                  <Th>#</Th>
                  <Th>fundo</Th>
                  <Th>cuartel</Th>
                  <Th>especie</Th>
                  <Th highlight={true}>variedad</Th>
                  <Th highlight={true}>faena</Th>
                  <Th>rut cosechero</Th>
                  <Th>nombre cosechero</Th>
                  <Th>kgs</Th>
                  <Th>hora. lectura</Th>
                  <Th>diferencia tipo</Th>
                  <Th>equipo</Th>
                  <Th>usuario</Th>
                  <Th>id serv</Th>
                  <Th>id local</Th>
                  <Th>acciones</Th>
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
                      <Td children="fundo" />
                      <Td children="cuartel" />
                      <Td children="especie" />
                      <Td children="variedad" />
                      <Td children="faena" />
                      <Td children="rut cosechero" />
                      <Td children="nombre cosechero" />
                      <Td children="11233213KG" />
                      <Td children="16:23:21" />
                      <Td children="dif.tipo" />
                      <Td children="equipo" />
                      <Td children="usuario" />
                      <Td children="idserv" />
                      <Td children="idlocal" />
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

export default Harvest
