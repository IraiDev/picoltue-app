import { useContext, useEffect, useState } from 'react'
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
import TFooter from '../table/TFooter'
import { UiContext } from '../../context/UiContext'

const limite = [
  { value: 10, label: '10' },
  { value: 25, label: '25' },
  { value: 50, label: '50' },
  { value: 100, label: '100' }
]

const Harvest = () => {

  const { toggleLoading } = useContext(UiContext)
  const { cosechas, filtros, getHarvest } = useContext(AppContext)
  const [offSet, setOffSet] = useState(0)
  const [page, setPage] = useState(1)
  const [{
    filterRut,
    filterName,
    filterUser,
    filterKg,
    filterLimit,
    filterFound,
    filterCuartel,
    filterSpecies
  }, onChangeValues, reset] = useForm({
    filterRut: '',
    filterName: '',
    filterUser: '',
    filterKg: '',
    filterLimit: 10,
    filterFound: '',
    filterCuartel: '',
    filterSpecies: ''
  })

  // destructuring
  const { especies, cuarteles, fundos } = filtros
  const { lecturas, kilos_filtro, kilos_totales, total_lecturas_filtro } = cosechas
  // destructuring

  const handleOnChangePage = (e, value) => {
    toggleLoading(true)
    let offset = ((value - 1) * filterLimit) % total_lecturas_filtro
    setOffSet(offset)
    setPage(value)
    getHarvest({
      especie: Number(filterSpecies),
      fundo: Number(filterFound),
      cuartel: Number(filterCuartel),
      rut_cosechero: filterRut,
      cantidad: Number(filterKg),
      fecha_desde: '',
      fecha_hasta: '',
      usuario: filterUser,
      nombre_cosechero: filterName,
      offset,
      limite: Number(filterLimit)
    })
  }

  const onSearch = (e) => {
    e.preventDefault()
    toggleLoading(true)
    getHarvest({
      especie: Number(filterSpecies),
      fundo: Number(filterFound),
      cuartel: Number(filterCuartel),
      rut_cosechero: filterRut,
      cantidad: Number(filterKg),
      fecha_desde: '',
      fecha_hasta: '',
      usuario: filterUser,
      nombre_cosechero: filterName,
      offset: offSet,
      limite: Number(filterLimit)
    })
  }

  const handleReset = () => {
    reset()
    toggleLoading(true)
    getHarvest({
      especie: Number(filterSpecies),
      fundo: Number(filterFound),
      cuartel: Number(filterCuartel),
      rut_cosechero: filterRut,
      cantidad: Number(filterKg),
      fecha_desde: '',
      fecha_hasta: '',
      usuario: filterUser,
      nombre_cosechero: filterName,
      offset: 0,
      limite: Number(filterLimit)
    })
  }

  useEffect(() => {
    toggleLoading(true)
    setPage(1)
    getHarvest({
      especie: Number(filterSpecies),
      fundo: Number(filterFound),
      cuartel: Number(filterCuartel),
      rut_cosechero: filterRut,
      cantidad: Number(filterKg),
      fecha_desde: '',
      fecha_hasta: '',
      usuario: filterUser,
      nombre_cosechero: filterName,
      offset: 0,
      limite: Number(filterLimit)
    })

    // eslint-disable-next-line
  }, [filterFound, filterCuartel, filterSpecies, filterLimit])

  return (
    <Container
      title="Lecturas de dispositivos de Cosechas"
      showMenu >
      <Table width="w-table">
        <THead>
          <tr className="text-xs font-semibold tracking-wide text-center text-gray-900 bg-gray-200">
            <Th><button
              className='capitalize rounded-full px-2 py-1.5 font-semibold text-white bg-blue-400 hover:bg-blue-500 transition duration-500 focus:outline-none'
              onClick={handleReset}
            >
              reestablecer
            </button></Th>
            <Th><Select options={fundos} value={filterFound} name='filterFound' onChange={onChangeValues} /></Th>
            <Th><Select options={cuarteles} value={filterCuartel} name='filterCuartel' onChange={onChangeValues} /></Th>
            <Th><Select options={especies} value={filterSpecies} name='filterSpecies' onChange={onChangeValues} /></Th>
            <Th>
              <form onSubmit={onSearch}>
                <input
                  className="p-1 rounded-md w-24 focus:outline-none focus:shadow-md focus:ring transition duration-200"
                  type="text"
                  name="filterRut"
                  value={filterRut}
                  placeholder='Escriba el rut'
                  onChange={onChangeValues} />
                <button type='submit' className='hidden' />
              </form>
            </Th>
            <Th>
              <form onSubmit={onSearch}>
                <input
                  className="p-1 rounded-md w-full focus:outline-none focus:shadow-md focus:ring transition duration-200"
                  type="text"
                  name="filterName"
                  value={filterName}
                  placeholder='Escriba el nombre'
                  onChange={onChangeValues} />
                <button type='submit' className='hidden' />
              </form>
            </Th>
            <Th>
              <form onSubmit={onSearch}>
                <input
                  className="p-1 w-16 rounded-md focus:outline-none focus:shadow-md focus:ring transition duration-200"
                  type="text"
                  name="filterKg"
                  value={filterKg}
                  onChange={onChangeValues}
                  placeholder='Escriba la cantidad'
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }} />
                <button type='submit' className='hidden' />
              </form>
            </Th>
            <Th></Th>
            <Th></Th>
            <Th></Th>
            <Th>
              <form onSubmit={onSearch}>
                <input
                  className="p-1 rounded-md w-full focus:outline-none focus:shadow-md focus:ring transition duration-200"
                  type="text"
                  name="filterUser"
                  value={filterUser}
                  placeholder='Escriba el rut'
                  onChange={onChangeValues} />
                <button type='submit' className='hidden' />
              </form>
            </Th>
            <th colSpan={2}>
              <div className='flex items-center gap-2 rounded-md bg-gray-300 p-1 mr-1'>
                <label >Limite</label>
                <Select options={limite} value={filterLimit} name='filterLimit' onChange={onChangeValues} />
              </div>
            </th>
          </tr>
          <tr className="text-xs font-semibold tracking-wide text-center text-gray-900 bg-gray-200 uppercase">
            <Th>#</Th>
            <Th>fundo</Th>
            <Th>cuartel</Th>
            <Th>especie</Th>
            <Th>rut cosechero</Th>
            <Th>nombre cosechero</Th>
            <Th>cantidad</Th>
            <Th>U. medida</Th>
            <Th>fecha lectura</Th>
            <Th>equipo</Th>
            <Th>usuario</Th>
            <Th>id serv</Th>
            <Th>id local</Th>
          </tr>
        </THead>
        <TBody>
          {
            Object.keys(cosechas).length > 0 &&
            lecturas.map((l, i) => (
              <tr key={i} className="text-gray-700 text-sm border-b w-max">
                <Td borderLeft={false}>
                  <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-md">
                    {i + 1}
                  </span>
                </Td>
                <Td children={l.desc_item_negocio} />
                <Td children={l.desc_cuartel} />
                <Td children={l.desc_especie} />
                <Td children={l.rut_trabajador} />
                <Td children={l.nombre_cosechero} />
                <Td align='text-right' children={l.peso} />
                <Td align='text-left' children={l.desc_tipo_med} />
                <Td children={moment(l.fecha_hora_lect).format('DD-MM-YYYY, HH:MM:ss')} />
                <Td children={l.id_dispo} />
                <Td children={l.rut_supervisor} />
                <Td children={l.id} />
                <Td children={l.id_local} />
              </tr>
            ))
          }
        </TBody>
        <TFooter>
          <tr className='text-xs font-semibold tracking-wide text-center text-gray-900 bg-gray-200 capitalize'>
            <td colSpan={14} className='p-2 w-full'>
              <div className='flex justify-around items-center px-4'>
                <label>Total Kilos: {kilos_totales} KG</label>
                <Pager
                  page={page}
                  onPageChange={handleOnChangePage}
                  pageRangeDisplayed={5}
                  limit={filterLimit}
                  totals={total_lecturas_filtro}
                />
                <label>Total según filtro : {kilos_filtro} KG</label>
              </div>
            </td>
          </tr>
        </TFooter>
      </Table>
    </Container>
  )
}

export default Harvest
