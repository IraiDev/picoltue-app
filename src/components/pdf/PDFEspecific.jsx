import { Page, Text, View, Document, Image } from '@react-pdf/renderer'
import logo from '../../assets/img/logo150x150.png'
import moment from 'moment'
import ViewContainer from './ViewContainer'
import NumberFormat from 'react-number-format'

const PDFEspecific = ({ data }) => (
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

          <ViewContainer
            width={{ w1: '10%', w2: '60%', w3: '30%' }}
            col1='#'
            col2='Mejores Totales'
            col3='KGS'
            bg='#e5e8e8' />

          {
            Object.values(data.top_five).map((item, i) => (
              <ViewContainer
                key={i}
                align={{ c1: 'right', c2: 'left', c3: 'right' }}
                width={{ w1: '10%', w2: '60%', w3: '30%' }}
                col1={i + 1}
                col2={item.nombre_cosechero}
                col3={
                  <NumberFormat
                    value={item.peso}
                    displayType={'text'}
                    decimalSeparator=','
                    thousandSeparator='.'
                    decimalScale={2} />
                }
              />
            ))
          }

          <Text style={{ fontSize: 12, marginTop: 25, textAlign: 'right' }} >
            Fecha y hora impresion: {moment(new Date()).format('DD-MM-YYYY HH:mm:ss')}
          </Text>
        </View>
      </Page>
    }

    {Object.keys(data).length > 0 && Object.keys(data.under_average).length > 0 &&
      <Page size="A4">
        <View style={{ display: 'flex', flexDirection: 'column', margin: 20 }}>

          <Image src={logo} style={{ width: '50px', height: '50px' }} />

          <Text style={{ fontSize: 24, marginTop: 20, flexDirection: 'row', alignItems: 'left', }}>
            {data.general.nombre_empresa}
          </Text>

          <Text style={{ fontSize: 12, marginTop: 5, marginBottom: 5, alignItems: 'left', }}>
            {data.general.msg_filtro_fecha}
          </Text>

          <ViewContainer
            width={{ w1: '10%', w2: '60%', w3: '30%' }}
            col1='#'
            col2='Bajo 39 KGS'
            col3='KGS'
            bg='#e5e8e8' />

          {
            Object.values(data.under_average).map((item, i) => (
              <ViewContainer
                key={i}
                align={{ c1: 'right', c2: 'left', c3: 'right' }}
                width={{ w1: '10%', w2: '60%', w3: '30%' }}
                col1={i + 1}
                col2={item.nombre_cosechero}
                col3={
                  <NumberFormat
                    value={item.peso}
                    displayType={'text'}
                    decimalSeparator=','
                    thousandSeparator='.'
                    decimalScale={2} />
                }
              />
            ))
          }

          <View style={{ marginTop: '10px' }} />

          <ViewContainer
            width={{ w1: '50%', w2: '40%', w3: '10%' }}
            col1='Total Cosecha Acumulada'
            col2={Object.values(data.under_average).reduce((anterior, actual) => {
              return anterior + actual.peso
            }, 0)}
            col3='KGS'
            bg='#e5e8e8' />

          <Text style={{ fontSize: 12, marginTop: 25, textAlign: 'right' }} >
            Fecha y hora impresion: {moment(new Date()).format('DD-MM-YYYY HH:mm:ss')}
          </Text>
        </View>
      </Page>
    }

  </Document>
)

export default PDFEspecific
