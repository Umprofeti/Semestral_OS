import React from 'react';
import { Page, Document,Image, StyleSheet, View, Text } from '@react-pdf/renderer';
import CODIMG from '@/src/img/iconmonstr-plus-6-96.png'



const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: 200, // Ajusta el tamaño de la imagen según tus necesidades
    height: 200,
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    marginBottom: 5,
  },
});

export default function DocumentoPDF({
  NombreDelVideoJuego,
  CompaniaCreadora,
  LanzamientoJuego,
  ImagenJuego,
}) {

  
  
  return (
    <Document>
      <Page style={styles.page}>
        <View>
          <Text style={styles.title}>{NombreDelVideoJuego}</Text>
        </View>
        <View>
        <Image src={`data:image/png;base64, ${CODIMG}`} style={styles.image} />
        </View>
        <View>
          <Text style={styles.text}>Compañía: {CompaniaCreadora}</Text>
          <Text style={styles.text}>Fecha de lanzamiento: {LanzamientoJuego}</Text>
        </View>
      </Page>
    </Document>
  );
}
