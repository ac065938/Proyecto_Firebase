import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import * as Location from 'expo-location';
import { LinearGradient } from 'expo-linear-gradient';

// Coordenadas de las oficinas de desarrollo
const oficinasDesarrollo = {
  latitude: 20.650724,
  longitude: -105.226412,
};

// Función para calcular la distancia en kilómetros
const calcularDistancia = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c).toFixed(2);
};

const VisGPS = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [distancia, setDistancia] = useState(null);

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permiso denegado para acceder a la ubicación.');
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });

      const distanciaOficinas = calcularDistancia(
        loc.coords.latitude,
        loc.coords.longitude,
        oficinasDesarrollo.latitude,
        oficinasDesarrollo.longitude
      );
      setDistancia(distanciaOficinas);
    } catch (error) {
      setErrorMsg('Error al obtener la ubicación.');
      console.error(error);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const nombre = 'Andrés Chávez Pérez';
  const empresa = 'Digital Craft Studios';
  const telefono = '3221234567';
  const Correo = 'contacto@digitalcraftstudios.com.mx';


  return (
    <LinearGradient colors={['#dda15e', '#dda15e', '#fefae0']} style={styles.gradient}>
      <View style={styles.container}>
        <Text style={styles.header}>Ubicación y Contacto</Text>
        {errorMsg ? (
          <Text style={styles.error}>{errorMsg}</Text>
        ) : location ? (
          <View style={styles.infoContainer}>
            <Text style={styles.text}>Latitud: {location.latitude}</Text>
            <Text style={styles.text}>Longitud: {location.longitude}</Text>
            <Text style={styles.text}>
              Distancia a las oficinas: {distancia ? `${distancia} km` : 'Calculando...'}
            </Text>
            <Text style={styles.text}>
              Oficinas de Desarrollo: Av. Francisco Villa 1526, Los Sauces, 48328 Puerto Vallarta, Jal.
            </Text>
          </View>
        ) : (
          <Text style={styles.text}>Obteniendo ubicación...</Text>
        )}

        <View style={styles.contactContainer}>
          <Text style={styles.contactHeader}>Datos de Contacto</Text>
          <Text style={styles.text}>Nombre: {nombre}</Text>
          <Text style={styles.text}>Teléfono: {telefono}</Text>
          <Text style={styles.text}>Empresa: {empresa}</Text>
          <Text style={styles.text}>Correo: {Correo}</Text>

          <Image
            source={require('../imagenes/QR.jpg')}
            style={styles.logo}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 30,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  text: {
    fontSize: 18,
    color: '#333',
    marginVertical: 5,
  },
  error: {
    fontSize: 16,
    color: '#ff4d4d',
    textAlign: 'center',
  },
  contactContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  contactHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#bc6c25',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 15,
  },
});

export default VisGPS;
