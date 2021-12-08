import { useState } from 'react'
import Table from '../table/Table'
import TBody from '../table/TBody'
import Td from '../table/Td'
import Th from '../table/Th'
import THead from '../table/THead'
import Container from '../ui/Container'
import Pager from '../ui/Pager'
import Select from '../ui/Select'
import { useForm } from '../../hooks/useForm'

const options = [{ id: 10, name: 'option 1' }, { id: 2, name: 'option 2' }, { id: 3, name: 'option 3' }]
const arr = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27
]

const Harvest = () => {
  const [state, setstate] = useState(2)
  const [{ filterRut, filterName, filterUser, filterKg }, onChangeValues] = useForm({
    filterRut: '',
    filterName: '',
    filterUser: '',
    filterKg: ''
  })

  return (
    <Container title="Lecturas de dispositivos de Cosechas" user="Ignacio arriagada" showMenu >
      <Table width="w-table">
        <THead>
          <tr className="text-xs font-semibold tracking-wide text-center text-gray-900 bg-gray-200">
            <Th></Th>
            <Th><Select options={options} value={state} onChange={e => setstate(e.target.value)} /></Th>
            <Th><Select options={options} value={state} onChange={e => setstate(e.target.value)} /></Th>
            <Th><Select options={options} value={state} onChange={e => setstate(e.target.value)} /></Th>
            <Th><Select options={options} value={state} onChange={e => setstate(e.target.value)} /></Th>

            <Th>
              <input
                className="p-1 rounded-md focus:outline-none focus:shadow-md focus:ring transition duration-200"
                type="text"
                name="filterRut"
                value={filterRut}
                onChange={onChangeValues} />
            </Th>
            <Th>
              <input
                className="p-1 rounded-md focus:outline-none focus:shadow-md focus:ring transition duration-200"
                type="text"
                name="filterName"
                value={filterName}
                onChange={onChangeValues} />
            </Th>
            <Th>
              <input
                className="p-1 rounded-md focus:outline-none focus:shadow-md focus:ring transition duration-200"
                type="text"
                name="filterKg"
                value={filterKg}
                onChange={onChangeValues}
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }} />
            </Th>
            <Th></Th>
            <Th></Th>
            <Th></Th>
            <Th></Th>
            <Th>
              <input
                className="p-1 rounded-md focus:outline-none focus:shadow-md focus:ring transition duration-200"
                type="text"
                name="filterUser"
                value={filterUser}
                onChange={onChangeValues} />
            </Th>
            <Th></Th>
            <Th></Th>
          </tr>
          <tr className="text-xs font-semibold tracking-wide text-center text-gray-900 bg-gray-200 uppercase">
            <Th>#</Th>
            <Th>fundo</Th>
            <Th>cuartel</Th>
            <Th>especie</Th>
            <Th highlight>faena</Th>
            <Th>rut cosechero</Th>
            <Th>nombre cosechero</Th>
            <Th>cantidad</Th>
            <Th>U, medida</Th>
            <Th>hora. lectura</Th>
            <Th>diferencia tipo</Th>
            <Th>equipo</Th>
            <Th>usuario</Th>
            <Th>id serv</Th>
            <Th>id local</Th>
          </tr>
        </THead>
        <TBody>
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
                <Td children="faena" />
                <Td children="rut cosechero" />
                <Td children="nombre cosechero" />
                <Td children="11233213" />
                <Td children="kg" />
                <Td children="16:23:21" />
                <Td children="dif.tipo" />
                <Td children="equipo" />
                <Td children="usuario" />
                <Td children="idserv" />
                <Td children="idlocal" />
              </tr>
            ))
          }
        </TBody>
      </Table>
      <Pager />
    </Container>
  )
}

export default Harvest
