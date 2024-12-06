import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { auth } from '../Control/Firebase';
import { Fontisto, Ionicons, FontAwesome, AntDesign } from '@expo/vector-icons'; 

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [googleSubmitting, setGoogleSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // Estado del modal
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserName, setNewUserName] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        props.navigation.navigate("Login");
      }
    });

    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(newUserEmail, newUserPassword)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log(`Usuario registrado: ${user.email}, Nombre: ${newUserName}`);
        setModalVisible(false); // Cerrar modal después del registro
      })
      .catch(error => alert(error.message));
  };

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
        props.navigation.replace('Home');
      })
      .catch(error => alert(error.message));
  };

  const handleCircleClick = () => setShowContent(true);
  const handleClose = () => setShowContent(false);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Agregar Usuario</Text>
            <TextInput
              placeholder="Nombre"
              value={newUserName}
              onChangeText={setNewUserName}
              style={styles.input}
            />
            <TextInput
              placeholder="Email"
              value={newUserEmail}
              onChangeText={setNewUserEmail}
              style={styles.input}
            />
            <TextInput
              placeholder="Contraseña"
              value={newUserPassword}
              onChangeText={setNewUserPassword}
              style={styles.input}
              secureTextEntry
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={handleSignUp} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Registrar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={[styles.modalButton, { backgroundColor: '#f44336' }]}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {!showContent ? (
        <Animatable.View animation="bounceIn" duration={1500} style={styles.circleContainer}>
          <TouchableOpacity onPress={handleCircleClick}>
            <Ionicons name="person-circle" size={100} color="#f44336" />
          </TouchableOpacity>
        </Animatable.View>
      ) : (
        <Animatable.View animation="zoomIn" duration={1000} style={styles.contentContainer}>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <AntDesign name="closecircle" size={30} color="#f44336" />
          </TouchableOpacity>
          <Image source={require('../imagenes/180px2.jpg')} style={styles.logo} />
          <View style={styles.inputContainer}>
          <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputPassword}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
              <FontAwesome name="sign-in" size={20} color="#FFF" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.buttonSecondary}>
              <FontAwesome name="user-plus" size={20} color="#FFF" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Agregar Usuario</Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      )}
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
  },
  circleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
  },
  buttonSecondary: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50', // Color verde para diferenciar
    width: '100%',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10, // Espacio adicional entre botones
  },
  circleTouchable: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    padding: 10,
    backgroundColor: '#fff',
    elevation: 5,
  },
  contentContainer: {
    width: '90%',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: '#ffffff',
    borderRadius: 25,
    padding: 25,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#f44336',
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#f44336',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 95,
    paddingVertical: 12,
    borderRadius: 25,
    marginBottom: 15,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f44336',
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f44336',
  },
  inputPassword: {
    flex: 1,
    fontSize: 16,
  },
  eyeIcon: {
    marginLeft: 10,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#f44336',
    width: '100%',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    marginLeft: 10,
  },
  buttonIcon: {
    marginRight: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#f44336',
    padding: 8,
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
