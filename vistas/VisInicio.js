import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, Image, Modal, TouchableOpacity } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker'; // Importar la librería

const Pagina1 = ({ navigation }) => {
  const { width: screenWidth } = Dimensions.get('window');
  
  const [numColumns, setNumColumns] = useState(3); // Estado para el número de columnas
  const [profilePicture, setProfilePicture] = useState('https://scontent.ftpq3-1.fna.fbcdn.net/v/t39.30808-6/448701383_2269341096739261_5574070838425043319_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_ohc=B66fjTSgoagQ7kNvgEJtWGk&_nc_zt=23&_nc_ht=scontent.ftpq3-1.fna&_nc_gid=A7SK-WEyFaPIsH-erhNdGjf&oh=00_AYCmhpUk7DPZ6MOSZuF-tZ5ddkxZxVNytsJ6fkfFl2aNfw&oe=674170FB'); // Foto de perfil
  const [coverPhoto, setCoverPhoto] = useState('https://scontent.ftpq3-1.fna.fbcdn.net/v/t39.30808-6/448757223_2271311786542192_3105681844618444598_n.jpg?stp=cp6_dst-jpg&_nc_cat=104&ccb=1-7&_nc_sid=9eae26&_nc_ohc=1wYTYUYSGRIQ7kNvgGzTHXY&_nc_zt=23&_nc_ht=scontent.ftpq3-1.fna&_nc_gid=AcPgCoQykr-UiFtBmCyfEPF&oh=00_AYDFAE7cEbOeJOoSm924x4rMv3HFSMqlp5ou7mgGAyqwXQ&oe=67415279'); // Foto de portada
  const [selectedImage, setSelectedImage] = useState(null); // Para almacenar la imagen seleccionada para ampliar
  const [modalVisible, setModalVisible] = useState(false); // Controlar la visibilidad del modal

  // Datos de ejemplo para el perfil
  const userProfile = {
    name: 'Andrés Chávez Pérez',
    bio: 'Desarrollador de software | Amante de la tecnología',
  };

  // Datos de ejemplo para las imágenes (mosaicos)
  const images = Array.from({ length: 9 }, (_, index) => ({
    id: index.toString(),
    uri: `https://scontent.ftpq3-1.fna.fbcdn.net/v/t39.30808-6/459225136_2332846850388685_8684664685935203353_n.jpg?stp=cp6_dst-jpg&_nc_cat=110&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=bLslnm9yHF4Q7kNvgFZijnt&_nc_zt=23&_nc_ht=scontent.ftpq3-1.fna&_nc_gid=ADhXgxi__zgKV2pzlztfrxf&oh=00_AYDSGoILRtOEorW1Fsmqhod_edOuyuIAEEm-QBp1g8eddw&oe=6741BEB3${index + 1}`, // URL de las imágenes
  }));

  const handleLogout = () => {
    navigation.navigate('VisLogin'); // Navega a la pantalla de inicio de sesión
  };

  // Función para manejar la selección de foto
  const handleAddPhoto = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.5 }, (response) => {
      if (response.didCancel) {
        console.log('El usuario canceló la selección de imagen');
      } else if (response.errorCode) {
        console.log('Error al seleccionar la imagen:', response.errorMessage);
      } else {
        setProfilePicture(response.assets[0].uri); // Actualizar la foto de perfil
      }
    });
  };

  // Llamar a handleAddPhoto al cargar el componente
  useEffect(() => {
    handleAddPhoto();
  }, []);

  // Función para abrir el modal con la imagen seleccionada
  const handleImageClick = (uri) => {
    setSelectedImage(uri); // Establecer la imagen seleccionada
    setModalVisible(true); // Mostrar el modal
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setModalVisible(false); // Cerrar el modal
  };

  return (
    <View style={styles.container}>
      {/* Foto de portada */}
      <View style={styles.coverPhotoContainer}>
        <Image source={{ uri: coverPhoto }} style={styles.coverPhoto} />
        
        {/* Foto de perfil sobre la foto de portada */}
        <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
      </View>

      <View style={styles.profileContainer}>
        <Text style={styles.profileName}>{userProfile.name}</Text>
        <Text style={styles.profileBio}>{userProfile.bio}</Text>
      </View>

      <FlatList
        key={numColumns} // Cambia la clave para forzar la re-renderización cuando numColumns cambie
        data={images}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleImageClick(item.uri)} style={styles.imageContainer}>
            <Image source={{ uri: item.uri }} style={styles.image} />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.flatListContent}
      />

      {/* Modal para mostrar la imagen expandida */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.modalBackground} onPress={closeModal}>
            <Image source={{ uri: selectedImage }} style={styles.modalImage} />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D4D0C8',
  },
  coverPhotoContainer: {
    width: '100%',
    height: 200, // Altura de la foto de portada
    position: 'relative', // Posicionar la foto de perfil encima
  },
  coverPhoto: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  profilePicture: {
    width: 150, // Subir el tamaño de la foto de perfil
    height: 150, // Ajusta el tamaño si lo deseas
    borderRadius: 75, // Hace la imagen redonda
    position: 'absolute', // Posicionar encima de la foto de portada
    bottom: -75, // Mueve la foto de perfil hacia abajo, para que quede parcialmente encima de la portada
    left: '50%', // Centra la foto de perfil
    marginLeft: -75, // Ajuste para centrar completamente la imagen
    borderWidth: 4, // Opcional, para darle un borde
    borderColor: '#fff', // Borde blanco
  },
  profileContainer: {
    alignItems: 'center',
    padding: 20,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 60,
  },
  profileBio: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10, 
  },
  
  flatListContent: {
    padding: 10,
  },
  imageContainer: {
    flex: 1,
    margin: 5,
    height: 100, // Altura de cada imagen
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fondo oscuro para el modal
  },
  modalBackground: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: 300, // Tamaño de la imagen expandida
    height: 300,
    resizeMode: 'contain',
  },
});

export default Pagina1;
