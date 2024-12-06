import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

const Pagina1 = ({ navigation }) => {
  const { width: screenWidth } = Dimensions.get('window');
  
  const handleLogout = () => {
    navigation.navigate('VisLogin'); // Navega a la pantalla de inicio de sesión
  };

  return (
    <View style={styles.container}>
      <View style={[styles.whiteBackground, { height: 200 }]} />

      <View style={styles.rectangleContainer}>
        <View style={[styles.rectangle, { width: screenWidth - 40, height: 100 }]}>
          <View style={styles.innerBox}>
            <Text style={styles.innerBoxText}>Perfil del Usuario</Text>
          </View>
        </View>
      </View>

      {/* Información del Usuario */}
      <View style={styles.profileContainer}>
        <Image 
          source={{ uri: 'https://www.example.com/user-avatar.jpg' }} // Puedes cambiar esta URL por la imagen del perfil del usuario
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Juan Pérezz</Text>
        <Text style={styles.profileEmail}>juan.perez@example.com</Text>
      </View>

      {/* Botones de acción */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('VisEditarAlumno')}>
          <Text style={styles.buttonText}>Editar Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>

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
  profileContainer: {
    alignItems: 'center',
    marginTop: 120,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#007BFF',
    marginBottom: 20,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  profileEmail: {
    fontSize: 16,
    color: '#666',
  },
  actionButtons: {
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    width: '100%',
    marginBottom: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
  bottomMenu: {
    position: 'absolute',
    bottom: 0, 
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#007BFF',
    paddingVertical: 8,
    elevation: 5,
    height: 80,
  },
  menuButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

export default Pagina1;
