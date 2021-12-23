import { Page, Text, View, Document, Image } from '@react-pdf/renderer'
import logo from '../../assets/img/logo150x150.png'
import moment from 'moment'

const arr = [0, 1, 2, 3]

const PDFEspecific = ({ dateTo = '21-11-2019', dateFrom = '21-11-2021' }) => (
  <Document>
    <Page size="A4">
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          margin: 20
        }}
      >
        <Image src={logo} style={{ width: '50px', height: '50px' }} />
        <Text
          style={{
            fontSize: 24,
            marginTop: 20,
            flexDirection: 'row',
            alignItems: 'left',
          }}
        >
          AGRICOLA PICOLTUE LIMITADA
        </Text>
        <Text
          style={{
            fontSize: 12,
            marginTop: 5,
            alignItems: 'left',
          }}
        >
          Reporte de Cosecha Desde: {dateFrom} , Hasta: {dateTo}
        </Text>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            marginTop: 30,
            border: '1px solid black',
            backgroundColor: '#D5D8DC',
          }}
        >
          <Text style={{ width: '10%', textAlign: 'center', }}>
            #
          </Text>
          <Text
            style={{
              width: '50%',
              textAlign: 'center',
              borderRight: '1px solid black',
              borderLeft: '1px solid black',
            }}
          >
            Mejores Totales
          </Text>
          <Text
            style={{
              width: '40%',
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            KGS
          </Text>
        </View>

        {
          arr.map(item => (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                border: '1px solid black',
                width: '100%',
              }}
            >
              <Text
                style={{
                  width: '10%',
                  // border: '1px solid black',
                  textAlign: 'right',
                }}
              >
                1
              </Text>
              <Text
                style={{
                  borderLeft: '1px solid black',
                  borderRight: '1px solid black',
                  width: '50%',
                  textAlign: 'center',
                }}
              >
                Mejores Totales
              </Text>
              <Text
                style={{
                  // border: '1px solid black',
                  width: '40%',
                  textAlign: 'right',
                  fontWeight: 'bold',
                }}
              >
                KGS
              </Text>
            </View>
          ))
        }

        <Text
          style={{
            fontSize: 12,
            marginTop: 25,
            textAlign: 'center',
          }}
        >
          Fecha y hora impresion: {moment(new Date()).format('DD-MM-YYYY HH:mm:ss')}
        </Text>

      </View>

    </Page>
  </Document>
)

export default PDFEspecific
