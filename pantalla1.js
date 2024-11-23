import React from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

const Pagina1 = ({ navigation }) => {
  const numColumns = 3;
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  const cardWidth = (screenWidth - (numColumns + 1) * 20) / numColumns;
  const cardHeight = screenHeight / 5;

  const rectangleHeight = 100;

  const handleLogout = () => {
    navigation.navigate('VisLogin'); // Navega a la pantalla de inicio de sesión
  };

  return (
    <View style={styles.container}>
      <View style={[styles.whiteBackground, { height: (cardHeight + 60) * 3 + 10 }]} />

      <View style={styles.rectangleContainer}>
        <View style={[styles.rectangle, { width: screenWidth - 40, height: rectangleHeight }]}>
          <View style={styles.innerBox}>
            <Text style={styles.innerBoxText}>Practica de Flex 1</Text>
          </View>
        </View>
      </View>

      <FlatList
        data={Array.from({ length: 9 })}
        keyExtractor={(_, index) => index.toString()}
        numColumns={numColumns}
        renderItem={({ index }) => (
          <View style={styles.cardContainer}>
            <View style={[styles.card, { width: cardWidth, height: cardHeight }]}>
              <Text style={styles.cardText}>Cuadro {index + 1}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={styles.flatListContent}
        scrollEnabled={false}
      />

      {/* Menú de iconos en la parte inferior */}
      <View style={styles.bottomMenu}>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('vistaAlumno')}>
          <MaterialCommunityIcons name="account" size={24} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('visMapa')}>
          <MaterialCommunityIcons name="map" size={24} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('visaltaAlumno')}>
          <MaterialCommunityIcons name="account-plus" size={24} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('VisEditarAlumno')}>
          <MaterialCommunityIcons name="account-edit" size={24} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={handleLogout}>
          <MaterialCommunityIcons name="logout" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D4D0C8', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  whiteBackground: {
    position: 'absolute',
    top: 20,
    left: 5,
    width: '100%',
    backgroundColor: '#FFFFFF',
    zIndex: -1,
  },
  rectangleContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'absolute',
    top: 7,
    zIndex: 1,
  },
  rectangle: {
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerBox: {
    backgroundColor: '#92C3E5', 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    width: 150, 
    height: 70, 
  },
  innerBoxText: {
    color: '#FFFFFF', 
    fontSize: 14,
  },
  flatListContent: {
    paddingHorizontal: 11,
    paddingTop: 140, 
  },
  cardContainer: {
    marginHorizontal: 9,
    marginVertical: 9,
  },
  card: {
    backgroundColor: '#90EE90', 
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#708090', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    color: '#333333',
    fontSize: 16,
  },
  bottomMenu: {
    position: 'absolute',
    bottom: 0, // espacio entre borde inferior
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#007BFF', // Color para menu inferior
    paddingVertical: 8, // Ajusta este valor si es necesario
    borderRadius: 0, // Bordes redondeados para el menú
    elevation: 5, // Sombra para dar un efecto de profundidad
    height: 80, // Ajustar la altura del menú según sea necesario
  },
  menuButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

export default Pagina1;
