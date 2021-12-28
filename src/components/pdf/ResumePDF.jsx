import React, { useContext, useRef } from 'react'
import logo from '../../assets/img/logo150x150.png'
import ReactToPrint from 'react-to-print'
import Button from '../ui/Button'
import { AppContext } from '../../context/AppContext'

const ResumePDF = () => {

  const refPDF = useRef()
  const { resume } = useContext(AppContext)

  console.log(resume)

  return (
    <>
      <ReactToPrint
        trigger={() => <Button
          className='hover:bg-gry-200'
          type='iconText'
          name='pdf'
          icon={<i className="fas fa-print"></i>}
        />}
        content={() => refPDF.current}
      />

      {Object.keys(resume).length > 0 &&
        <div className='hidden'>
          <main ref={refPDF} className='p-10'>
            <header>
              <div className='flex gap-10 items-center'>
                <img src={logo} alt="logo" />
                <div className='leading-9'>
                  <h1
                    className='font-bold underline italic'
                    style={{ fontSize: '50px', color: 'gry' }}
                  >
                    ZioniT
                  </h1>
                  <label className='text-center block' style={{ fontSize: '13px' }}>Soluciones tecnologicas</label>
                </div>
              </div>
              <div className='mt-10'>
                <h2
                  className='font-bold uppercase'
                  style={{ fontSize: '30px' }}
                >
                  {resume.general.nombre_empresa}
                </h2>
                <h5 style={{ fontSize: '20px' }}>
                  {resume.general.msg_filtro_fecha}
                </h5>
              </div>
            </header>

            <section style={{ fontSize: '20px' }} className='w-full mt-10'>
              <section className='grid grid-cols-12 border border-black'>
                <div className='col-span-5 p-1.5 border border-black capitalize font-semibold text-left'>cantidad cosecheros</div>
                <div className='col-span-4 p-1.5 border border-black text-right'>{resume.resumen_general[0].cantidad_cosechero}</div>
                <div className='col-span-3 p-1.5 border border-black text-left'>Unidad</div>
              </section>
              <section className='grid grid-cols-12 border border-black'>
                <div className='col-span-5 p-1.5 border border-black capitalize font-semibold text-left'>kilogramos totales</div>
                <div className='col-span-4 p-1.5 border border-black text-right'>{resume.resumen_general[0].pesototal}</div>
                <div className='col-span-3 p-1.5 border border-black text-left'>KGS</div>
              </section>
              <section className='grid grid-cols-12 border border-black'>
                <div className='col-span-5 p-1.5 border border-black capitalize font-semibold text-left'>bandejas totales</div>
                <div className='col-span-4 p-1.5 border border-black text-right'>{resume.resumen_general[0].cantidad_bandeja}</div>
                <div className='col-span-3 p-1.5 border border-black text-left'>Unidades</div>
              </section>
              <section className='grid grid-cols-12 border border-black'>
                <div className='col-span-5 p-1.5 border border-black capitalize font-semibold text-left'>promedio cosecheros</div>
                <div className='col-span-4 p-1.5 border border-black text-right'>{resume.resumen_general[0].promedio_cosechero}</div>
                <div className='col-span-3 p-1.5 border border-black text-left'>KG / Cosechero</div>
              </section>
              <section className='grid grid-cols-12 border border-black'>
                <div className='col-span-5 p-1.5 border border-black capitalize font-semibold text-left'>kilogramos / bandeja</div>
                <div className='col-span-4 p-1.5 border border-black text-right'>{resume.resumen_general[0].promedio_bandeja}</div>
                <div className='col-span-3 p-1.5 border border-black text-left'>KG / Bandejas</div>
              </section>
            </section>

            <footer className='mt-10 text-right'>
              Fecha y hora impresion: 20-12-2021 10:00:00
            </footer>
          </main>
        </div>}
    </>
  )
}

export default ResumePDF
