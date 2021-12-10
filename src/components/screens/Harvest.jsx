import { useContext, useState } from 'react'
import Table from '../table/Table'
import TBody from '../table/TBody'
import Td from '../table/Td'
import Th from '../table/Th'
import THead from '../table/THead'
import Container from '../ui/Container'
import Pager from '../ui/Pager'
import Select from '../ui/Select'
import { useForm } from '../../hooks/useForm'
import { AppContext } from '../../context/AppContext'
import moment from 'moment'

const options = [{ id: 10, name: 'option 1' }, { id: 2, name: 'option 2' }, { id: 3, name: 'option 3' }]

const Harvest = () => {
  const { cosechas } = useContext(AppContext)
  const [state, setstate] = useState(2)
  const [{ filterRut, filterName, filterUser, filterKg }, onChangeValues] = useForm({
    filterRut: '',
    filterName: '',
    filterUser: '',
    filterKg: ''
  })

  return (
    <Container title="Lecturas de dispositivos de Cosechas" showMenu >
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
                className="p-1 rounded-md w-24 focus:outline-none focus:shadow-md focus:ring transition duration-200"
                type="text"
                name="filterRut"
                value={filterRut}
                onChange={onChangeValues} />
            </Th>
            <Th>
              <input
                className="p-1 rounded-md w-full focus:outline-none focus:shadow-md focus:ring transition duration-200"
                type="text"
                name="filterName"
                value={filterName}
                onChange={onChangeValues} />
            </Th>
            <Th>
              <input
                className="p-1 w-16 rounded-md focus:outline-none focus:shadow-md focus:ring transition duration-200"
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
            <Th>
              <input
                className="p-1 rounded-md w-full focus:outline-none focus:shadow-md focus:ring transition duration-200"
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
            <Th>U. medida</Th>
            <Th>hora. lectura</Th>
            <Th>equipo</Th>
            <Th>usuario</Th>
            <Th>id serv</Th>
            <Th>id local</Th>
          </tr>
        </THead>
        <TBody>
          {
            Object.keys(cosechas).length > 0 &&
            cosechas.lecturas.map((l, i) => (
              <tr key={i} className="text-gray-700 text-sm border-b w-max">
                <Td borderLeft={false}>
                  <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-md">
                    {i + 1}
                  </span>
                </Td>
                <Td children={l.lectura_relacion_ig.item_negocio.desc_item_negocio} />
                <Td children={l.lectura_relacion_ig.cuartel.nombre} />
                <Td children="especie" />
                <Td children={l.rh_faena.desc_faena} />
                <Td children={l.lectura_cosechero.rut_trabajador} />
                <Td children={l.lectura_cosechero.nombre_cosechero} />
                <Td align='text-right' children={l.peso} />
                <Td align='text-left' children={l.rh_faena.tipo_medida.desc_tipo_med} />
                <Td children={moment(l.fecha_hora_lect).format('DD-MM-YYYY, HH:MM:ss')} />
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
