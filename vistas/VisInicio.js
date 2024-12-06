import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
} from 'react-native';

const Pagina1 = ({ navigation }) => {
  const { width: screenWidth } = Dimensions.get('window');
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('Andrés Chávez Pérez');
  const [email, setEmail] = useState('ac192582@gmail.com');

  const handleLogout = () => {
    navigation.navigate('VisLogin'); // Navega a la pantalla de inicio de sesión
  };

  const handleSave = () => {
    setModalVisible(false); // Cierra el modal
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
          source={{
            uri: 'https://scontent.ftpq3-1.fna.fbcdn.net/v/t39.30808-6/462689432_2362714774068559_8296105676411748992_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=OJ9mCxc7NycQ7kNvgHaaFlS&_nc_zt=23&_nc_ht=scontent.ftpq3-1.fna&_nc_gid=A-OUra9qOZfwSZFIJyGxz5L&oh=00_AYDmb81L6CV4coaiMkf9b8QhlUn6zm9KSTpPL3p0MiwuJg&oe=67515330',
          }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{name}</Text>
        <Text style={styles.profileEmail}>{email}</Text>
      </View>

      {/* Botones de acción */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Editar Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>

      {/* Modal para editar el perfil */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Editar Perfil</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Correo"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={handleSave}>
                <Text style={styles.modalButtonText}>Guardar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#bc6c25' }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dda15e',
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
    backgroundColor: '#bc6c25',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerBox: {
    backgroundColor: '#dda15e',
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
    borderColor: '#1d7874',
    marginBottom: 20,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fefae0',
  },
  profileEmail: {
    fontSize: 16,
    color: '#fefae0',
  },
  actionButtons: {
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#bc6c25',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#1d7874',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default Pagina1;
