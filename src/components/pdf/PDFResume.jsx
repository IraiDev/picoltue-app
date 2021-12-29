import { Page, Text, View, Document, Image } from '@react-pdf/renderer'
import logo from '../../assets/img/logo150x150.png'
import moment from 'moment'
import ViewContainer from './ViewContainer'
import NumberFormat from 'react-number-format'

const arrData = [
  { label: 'Cantidad de Cosecheros', unity: 'Unidad' },
  { label: 'Kilogramos Totales', unity: 'KGS' },
  { label: 'Bandejas Totales', unity: 'Unidades' },
  { label: 'Promedio Cosecheros', unity: 'KG / Cosechero' },
  { label: 'Kilogramos / Bandejas', unity: 'KG / Bandejas' }
]

const PDFResume = ({ data }) => (
  <Document>
    {Object.keys(data).length > 0 &&
      <Page size="A4">
        <View style={{ display: 'flex', flexDirection: 'column', margin: 20 }}>

          <Image src={logo} style={{ width: '50px', height: '50px' }} />

          <Text style={{ fontSize: 24, marginTop: 20, flexDirection: 'row', alignItems: 'left', }}>
            {data.general.nombre_empresa}
          </Text>

          <Text style={{ fontSize: 12, marginTop: 5, marginBottom: 5, alignItems: 'left', }}>
            {data.general.msg_filtro_fecha}
          </Text>

          <Text style={{ fontSize: 16, marginTop: 5, marginBottom: 5, alignItems: 'left', }}>
            TOTAL GENERAL
          </Text>

          {
            Object.values(data.resumen_general[0]).map((item, i) => (
              <ViewContainer
                key={i}
                align={{ c1: 'left', c2: 'right', c3: 'center' }}
                col1={arrData[i].label}
                col2={
                  <NumberFormat
                    value={item}
                    displayType={'text'}
                    decimalSeparator=','
                    thousandSeparator='.'
                    decimalScale={2} />
                }
                col3={arrData[i].unity} />
            ))
          }

          <Text style={{ fontSize: 12, marginTop: 25, textAlign: 'right' }} >
            Fecha y hora impresion: {moment(new Date()).format('DD-MM-YYYY HH:mm:ss')}
          </Text>
        </View>
      </Page>
    }

    {Object.keys(data).length > 0 &&
      Object.values(data.resumen_especifico).map((res, i) => (
        Object.values(res.fundos).map(fun => (
          Object.values(fun.cuarteles).map(cua => (
            <Page key={i} size="A4">
              <View style={{ display: 'flex', flexDirection: 'column', margin: 20 }}>

                <Image src={logo} style={{ width: '50px', height: '50px' }} />

                <Text style={{ fontSize: 24, marginTop: 20, flexDirection: 'row', alignItems: 'left', }}>
                  {data.general && data.general.nombre_empresa}
                </Text>

                <Text style={{ fontSize: 12, marginTop: 5, marginBottom: 5, alignItems: 'left', }}>
                  {data.general && data.general.msg_filtro_fecha}
                </Text>

                <Text style={{ fontSize: 16, marginTop: 5, marginBottom: 5, alignItems: 'left', }}>
                  Especie: {res.especie} -  Fundo: {fun.nombre_fundo} - Cuartel: {cua.nombre_cuartel}
                </Text>

                {
                  Object.values(cua.data[0]).map((item, i) => (
                    <ViewContainer
                      key={i}
                      align={{ c1: 'left', c2: 'right', c3: 'center' }}
                      col1={arrData[i].label}
                      col2={
                        <NumberFormat
                          value={item}
                          displayType={'text'}
                          decimalSeparator=','
                          thousandSeparator='.'
                          decimalScale={2} />
                      }
                      col3={arrData[i].unity} />
                  ))
                }

                <Text style={{ fontSize: 12, marginTop: 25, textAlign: 'right' }} >
                  Fecha y hora impresion: {moment(new Date()).format('DD-MM-YYYY HH:mm:ss')}
                </Text>
              </View>
            </Page>
          ))
        ))
      ))
    }

  </Document>
)

export default PDFResume
