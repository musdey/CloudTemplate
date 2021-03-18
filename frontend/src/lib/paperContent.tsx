import React from 'react'
import { Image, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'

// Create styles
const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Oswald',
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman',
  },
  image: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '150px',
    height: '150px',
    textAlign: 'center',
  },
  page: {
    paddingTop: 35,
    paddingBottom: 65,
    textAlign: 'center',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
})
// Create Document Component
const MyDocument = (tableNr: number, size: string, name: string, imgUri: string) => (
  <Document>
    <Page size={size} style={styles.page}>
      <View style={styles.section}>
        <Text style={{ paddingBottom: '20px' }}> {name}</Text>
        <Text></Text>
        <Text>COVID-19 Contact Tracing</Text>
      </View>

      <Image style={styles.image} src={imgUri} />
      <Text>{tableNr && `Tischnummer ${tableNr}`}</Text>
      <View style={styles.section}>
        <Text>Bitte um deine Mithilfe!</Text>
        <Text>Jetzt scannen und registrieren!</Text>
      </View>
    </Page>
  </Document>
)

export default MyDocument
