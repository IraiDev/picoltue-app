import { useContext, useEffect, useRef, useState } from 'react'
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
import { useToggle } from '../../hooks/useToggle'
import Modal from '../ui/Modal'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { Alert } from '../../helpers/alerts'
import NumberFormat from 'react-number-format'
import { prettifyRut } from 'react-rut-formatter'

const limite = [
  { value: 10, label: '10' },
  { value: 25, label: '25' },
  { value: 50, label: '50' },
  { value: 100, label: '100' }
]

const today = moment(new Date()).format('YYYY-MM-DD')

const Harvest = () => {

  const { toggleLoading } = useContext(UiContext)
  const { cosechas, filtros, getHarvest } = useContext(AppContext)
  const [showDateModal, toggleDateModal] = useToggle(false)
  const [page, setPage] = useState(1)
  const [resetFilter, onReset] = useToggle(false)
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
  const [{
    dateTo,
    dateFrom
  }, onChangeDate, resetDate] = useForm({
    dateTo: today,
    dateFrom: ''
  })

  const rutRef = useRef(), userRef = useRef(), kgRef = useRef(), nameRef = useRef()

  // destructuring
  const { especies, cuarteles, fundos } = filtros
  const { lecturas, kilos_filtro, kilos_totales, total_lecturas_filtro } = cosechas
  // destructuring

  const getHarvestData = (offset = 0, page = 1) => {
    toggleLoading(true)
    setPage(page)
    getHarvest({
      especie: Number(filterSpecies),
      fundo: Number(filterFound),
      cuartel: Number(filterCuartel),
      rut_cosechero: prettifyRut(filterRut),
      cantidad: Number(filterKg.trim()),
      fecha_desde: dateFrom === '' ? '' : moment(dateFrom).format('YYYY-MM-DD'),
      fecha_hasta: moment(dateTo).format('YYYY-MM-DD'),
      usuario: prettifyRut(filterUser),
      nombre_cosechero: filterName.trim(),
      offset,
      limite: Number(filterLimit)
    })
  }

  const handleOnChangePage = (e, value) => {
    let offset = ((value - 1) * filterLimit) % total_lecturas_filtro
    setPage(value)
    getHarvestData(offset, value)
  }

  const onSearch = (e) => {
    rutRef.current.blur()
    userRef.current.blur()
    kgRef.current.blur()
    nameRef.current.blur()
    e.preventDefault()
    getHarvestData()
  }

  const OnSearchForDate = () => {

    if (moment(dateFrom).isAfter(dateTo)) {
      Alert({
        icon: 'warn',
        title: 'Atencion',
        content: 'Fecha desde no puede ser mayor a fecha hasta, por favor seleccione otro rango de fechas',
        showCancelButton: false
      })
      resetDate()
      return
    }
    getHarvestData()
    toggleDateModal()
  }

  const handleReset = () => {
    reset()
    resetDate()
    onReset()
  }

  const onCloseModalDate = () => {
    resetDate()
    toggleDateModal()
  }

  useEffect(() => {
    getHarvestData()
    // eslint-disable-next-line
  }, [filterFound, filterCuartel, filterSpecies, filterLimit, resetFilter])

  return (
    <>
      <Container
        title="Lecturas de dispositivos de Cosechas"
        showMenu >
        <Table width="w-table">
          <THead>
            <tr className="text-xs font-semibold tracking-wide text-center text-gray-900 bg-gray-200">
              <Th>
                <button
                  className='capitalize rounded-full px-2 py-1.5 font-semibold text-white bg-blue-400 hover:bg-blue-500 transition duration-500 focus:outline-none hover:shadow-lg'
                  onClick={handleReset}
                >
                  reestablecer
                </button>
              </Th>
              <Th><Select options={fundos} value={filterFound} name='filterFound' onChange={onChangeValues} /></Th>
              <Th><Select options={cuarteles} value={filterCuartel} name='filterCuartel' onChange={onChangeValues} /></Th>
              <Th><Select options={especies} value={filterSpecies} name='filterSpecies' onChange={onChangeValues} /></Th>
              <Th>
                <form onSubmit={onSearch}>
                  <input
                    ref={rutRef}
                    className="p-1 rounded-md w-24 focus:outline-none focus:shadow-md focus:ring transition duration-200"
                    placeholder='Rut...'
                    type="text"
                    name="filterRut"
                    value={prettifyRut(filterRut)}
                    onChange={onChangeValues}
                    onFocus={e => {
                      e.target.select()
                    }} />
                  <button type='submit' className='hidden' />
                </form>
              </Th>
              <Th>
                <form onSubmit={onSearch}>
                  <input
                    ref={nameRef}
                    className="p-1 rounded-md w-full focus:outline-none focus:shadow-md focus:ring transition duration-200"
                    type="text"
                    name="filterName"
                    value={filterName}
                    placeholder='Nombre...'
                    onChange={onChangeValues}
                    onFocus={e => {
                      e.target.select()
                    }} />
                  <button type='submit' className='hidden' />
                </form>
              </Th>
              <Th>
                <form onSubmit={onSearch}>
                  <input
                    ref={kgRef}
                    className="p-1 w-16 rounded-md focus:outline-none focus:shadow-md focus:ring transition duration-200"
                    placeholder='Cantidad...'
                    type="text"
                    name="filterKg"
                    value={filterKg}
                    onChange={onChangeValues}
                    onFocus={e => {
                      e.target.select()
                    }}
                    onKeyPress={e => {
                      if (!/[0-9 /n]/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />
                  <button type='submit' className='hidden' />
                </form>
              </Th>
              <Th></Th>
              <Th>
                <button
                  className='capitalize rounded-full px-2 py-1.5 font-semibold text-white bg-blue-400 hover:bg-blue-500 transition duration-500 focus:outline-none hover:shadow-lg'
                  onClick={toggleDateModal}
                >
                  seleccione fechas
                </button>
              </Th>
              <Th></Th>
              <Th>
                <form onSubmit={onSearch}>
                  <input
                    ref={userRef}
                    className="p-1 rounded-md w-full focus:outline-none focus:shadow-md focus:ring transition duration-200"
                    type="text"
                    name="filterUser"
                    value={prettifyRut(filterUser)}
                    placeholder='Rut...'
                    onChange={onChangeValues}
                    onFocus={e => {
                      e.target.select()
                    }} />
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
                  <Td align='text-right'>
                    <NumberFormat
                      className='text-blue-400 ml-1 font-semibold'
                      value={l.peso}
                      displayType={'text'}
                      decimalSeparator=','
                      thousandSeparator='.'
                    />
                  </Td>
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
                  <section className='text-left'>
                    <label className='block mb-1'>
                      Total según filtro:
                      <NumberFormat
                        className='text-blue-400 ml-1'
                        value={kilos_filtro}
                        displayType={'text'}
                        suffix='KG'
                        decimalSeparator=','
                        thousandSeparator='.'
                      />
                    </label>
                    <label className='block'>
                      Total Kilos:
                      <NumberFormat
                        className='text-blue-400 ml-1'
                        value={kilos_totales}
                        displayType={'text'}
                        suffix='KG'
                        decimalSeparator=','
                        thousandSeparator='.'
                      />
                    </label>
                  </section>
                  <Pager
                    page={page}
                    onPageChange={handleOnChangePage}
                    pageRangeDisplayed={5}
                    limit={filterLimit}
                    totals={total_lecturas_filtro}
                  />
                  <label>lecturas según filtro:
                    <NumberFormat
                      className='ml-1'
                      value={total_lecturas_filtro}
                      displayType={'text'}
                      decimalSeparator=','
                      thousandSeparator='.'
                    />
                  </label>
                </div>
              </td>
            </tr>
          </TFooter>
        </Table>
      </Container>

      {/* modal select  date */}
      <Modal showModal={showDateModal} isBlur={false} onClose={onCloseModalDate}
        className='max-w-sm' padding='p-7'
      >
        <h1 className='font-semibold text-lg mb-5'>Selecione rango de fechas</h1>
        <Input
          field='Desde'
          type='date'
          name='dateFrom'
          value={dateFrom}
          onChange={onChangeDate} />
        <Input
          field='hasta'
          type='date'
          name='dateTo'
          value={dateTo}
          onChange={onChangeDate} />
        <footer className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
          <Button
            className="rounded-full md:w-max w-full border-2 border-red-400 hover:bg-red-400 text-red-500 hover:text-white"
            name="cancelar"
            shadow
            onClick={onCloseModalDate}
          />
          <Button
            className="rounded-full md:w-max w-full order-first md:order-last place-self-end bg-green-400 hover:bg-green-500 text-white"
            name='aceptar'
            shadow
            onClick={OnSearchForDate}
          />
        </footer>
      </Modal>
    </>
  )
}

export default Harvest
