import React, { useState, useEffect } from 'react';
import { Image, View, Text, SafeAreaView, ActivityIndicator, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { storage } from '../Control/Firebase';
import { getDownloadURL, uploadBytes, ref } from 'firebase/storage';

const Visphoto = (props) => {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permisos no concedidos', 'Lo sentimos, necesitamos permisos para acceder a tu galería.');
      }
    })();

    const refresh = props.navigation.addListener('focus', () => {
      setImage(null);
      setIsLoading(false);
    });
    return refresh;
  }, [props]);

  const handleSendToFirebase = async () => {
    if (!image) {
      Alert.alert('No hay imagen', 'Selecciona una imagen antes de enviar.');
      return;
    }

    setIsLoading(true);
    try {
      const uploadURL = await uploadImageAsync(image);
      console.log('Imagen subida con éxito:', uploadURL);
      Alert.alert('Éxito', 'La imagen se ha subido correctamente.');
      setImage(null); // Limpiar la imagen después de subir
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      Alert.alert('Error', 'Ocurrió un error al subir la imagen.');
    } finally {
      setIsLoading(false);
    }
  };

  const pickImage = async () => {
    setIsLoading(true);
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImage(result.assets[0].uri);
      } else {
        setImage(null);
      }
    } catch (error) {
      console.error('Error al seleccionar la imagen: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  const uploadImageAsync = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();

      if (!blob) {
        console.error('Error al crear el Blob');
        throw new Error('Error al crear el Blob');
      }

      const storageRef = ref(storage, `photos/${Date.now()}`);
      const result = await uploadBytes(storageRef, blob);
      console.log('Imagen subida con éxito:', result);
      const downloadURL = await getDownloadURL(storageRef);
      console.log('URL de la imagen:', downloadURL);
      return downloadURL;
    } catch (error) {
      console.log('Error al subir la imagen: ', error);
      throw error;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.buttonSelect}
          onPress={pickImage}
        >
          {isLoading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Seleccionar una foto...</Text>
          )}
        </TouchableOpacity>

        {image && (
          <TouchableOpacity
            style={styles.buttonUpload}
            onPress={handleSendToFirebase}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Enviar a Firebase</Text>
            )}
          </TouchableOpacity>
        )}

        {!image ? (
          <View style={styles.noImageContainer}>
            <Text style={styles.noImageText}>No se ha seleccionado ninguna imagen</Text>
          </View>
        ) : (
          <View style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.image} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  buttonSelect: {
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonUpload: {
    alignItems: 'center',
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  noImageContainer: {
    marginTop: 20,
  },
  noImageText: {
    fontSize: 16,
    color: '#999',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#007bff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
});

export default Visphoto;
