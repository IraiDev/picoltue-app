import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer'

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

// Create Document Component
const PDFResume = () => {

  return (
    <div className='h-screen w-full'>
      <Document title='zionit test'>
        <Page size="A4" style={styles.page}>
          <View>
            <Image src="https://i.imgur.com/q5XgY9J.png" style={{ width: 100, height: 100 }} />
          </View>
          <View style={styles.section}>
            <Text>Section #1</Text>
          </View>
          <View style={styles.section}>
            <Text>Section #2</Text>
          </View>
        </Page>
      </Document>
    </div>
  )
}

export default PDFResume
