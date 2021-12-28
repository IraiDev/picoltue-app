import { Page, Text, View, Document, Image } from '@react-pdf/renderer'
import logo from '../../assets/img/logo150x150.png'
import moment from 'moment'
import ViewContainer from './ViewContainer'

const PDFResume = ({ data }) => {

  console.log('data recibida: ', data)

  return (
    <Document>
      <Page size="A4">
        <View style={{ display: 'flex', flexDirection: 'column', margin: 20 }}>

          <Image src={logo} style={{ width: '50px', height: '50px' }} />

          <Text style={{ fontSize: 24, marginTop: 20, flexDirection: 'row', alignItems: 'left', }}>
            {data.general && data.general.nombre_empresa}
          </Text>

          <Text style={{ fontSize: 12, marginTop: 5, marginBottom: 5, alignItems: 'left', }}>
            {data.general && data.general.msg_filtro_fecha}
          </Text>

          <Text style={{ fontSize: 20, marginTop: 5, marginBottom: 5, alignItems: 'left', }}>
            TOTAL GENERAL
          </Text>

          {
            data.general &&
            <View>
              <ViewContainer align={{ c1: 'left', c2: 'right', c3: 'center' }} col1='Cantidad cosecheros' col2={data.resumen_general[0].cantidad_cosechero} col3='Unidad' />
              <ViewContainer align={{ c1: 'left', c2: 'right', c3: 'center' }} col1='Kilogramos totales' col2={data.resumen_general[0].pesototal} col3='KGS' />
              <ViewContainer align={{ c1: 'left', c2: 'right', c3: 'center' }} col1='Bandejas totales' col2={data.resumen_general[0].cantidad_bandeja} col3='Unidades' />
              <ViewContainer align={{ c1: 'left', c2: 'right', c3: 'center' }} col1='Promedio cosecheros' col2={data.resumen_general[0].promedio_cosechero} col3='KG / Cosechero' />
              <ViewContainer align={{ c1: 'left', c2: 'right', c3: 'center' }} col1='Kilogramos / bandejas' col2={data.resumen_general[0].promedio_bandeja} col3='KG / Bandejas' />
            </View>
          }

          <Text style={{ fontSize: 12, marginTop: 25, textAlign: 'right' }} >
            Fecha y hora impresion: {moment(new Date()).format('DD-MM-YYYY HH:mm:ss')}
          </Text>
        </View>
      </Page>

      <Page size="A4">
        <View style={{ display: 'flex', flexDirection: 'column', margin: 20 }}>

          <Image src={logo} style={{ width: '50px', height: '50px' }} />

          <Text style={{ fontSize: 24, marginTop: 20, flexDirection: 'row', alignItems: 'left', }}>
            {data.general && data.general.nombre_empresa}
          </Text>

          <Text style={{ fontSize: 12, marginTop: 5, marginBottom: 5, alignItems: 'left', }}>
            {data.general && data.general.msg_filtro_fecha}
          </Text>

          <Text style={{ fontSize: 16, marginTop: 5, marginBottom: 5, alignItems: 'left', }}>
            TOTAL GENERAL
          </Text>

          {
            data.general &&
            <View>
              <ViewContainer align={{ c1: 'left', c2: 'right', c3: 'center' }} col1='Cantidad cosecheros' col2={data.resumen_general[0].cantidad_cosechero} col3='Unidad' />
              <ViewContainer align={{ c1: 'left', c2: 'right', c3: 'center' }} col1='Kilogramos totales' col2={data.resumen_general[0].pesototal} col3='KGS' />
              <ViewContainer align={{ c1: 'left', c2: 'right', c3: 'center' }} col1='Bandejas totales' col2={data.resumen_general[0].cantidad_bandeja} col3='Unidades' />
              <ViewContainer align={{ c1: 'left', c2: 'right', c3: 'center' }} col1='Promedio cosecheros' col2={data.resumen_general[0].promedio_cosechero} col3='KG / Cosechero' />
              <ViewContainer align={{ c1: 'left', c2: 'right', c3: 'center' }} col1='Kilogramos / bandejas' col2={data.resumen_general[0].promedio_bandeja} col3='KG / Bandejas' />
            </View>
          }

          <Text style={{ fontSize: 12, marginTop: 25, textAlign: 'right' }} >
            Fecha y hora impresion: {moment(new Date()).format('DD-MM-YYYY HH:mm:ss')}
          </Text>
        </View>
      </Page>
    </Document>
  )
}

export default PDFResume
