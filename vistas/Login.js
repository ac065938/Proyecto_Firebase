import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { auth } from '../Control/Firebase';

import { Fontisto, Ionicons, FontAwesome, AntDesign } from '@expo/vector-icons'; // Importar AntDesign para el ícono de cerrar

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [googleSubmitting, setGoogleSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showContent, setShowContent] = useState(false); // Controla la animación del contenido

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
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Registered with:', user.email);
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

  const handleGoogleSigingIn = () => {
    const config = {
      webClientId: '458634231060-9p0a51g12fpd2ls7efbpjpp6hqf51ab8.apps.googleusercontent.com',
    };
    Google.logInAsync(config)
      .then((result) => {
        const { type, user } = result;
        if (type == 'success') {
          const { email, name, photoUrl } = user;
          setTimeout(() => props.navigation.navigate('Home', { email, name, photoUrl }), 1000);
          handleMessage('Google signing success', 'success');
          props.navigation.replace("Home");
        } else {
          handleMessage('Google signing canceled', 'prueba');
        }
        setGoogleSubmitting(false);
      })
      .catch((error) => {
        console.log(error);
        handleMessage('Ha ocurrido un error, verifica tu red e intenta nuevamente.', 'prueba');
        setGoogleSubmitting(false);
      });
  };

  // Controla cuando se hace clic en el círculo
  const handleCircleClick = () => {
    setShowContent(true); // Activa la animación para mostrar el contenido
  };

  // Controla cuando se hace clic en el botón de cerrar
  const handleClose = () => {
    setShowContent(false); // Vuelve al círculo
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {!showContent ? (
        <Animatable.View
          animation="bounceIn"
          duration={1500}
          style={styles.circleContainer}
        >
          <TouchableOpacity onPress={handleCircleClick}>
            <Ionicons name="person-circle" size={100} color="#f44336" />
          </TouchableOpacity>
        </Animatable.View>
      ) : (
        <Animatable.View
          animation="zoomIn" // Animación de zoom
          duration={1000}
          style={styles.contentContainer}
        >
          {/* Botón de cerrar */}
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <AntDesign name="closecircle" size={30} color="#f44336" />
          </TouchableOpacity>

          <Image source={require('../imagenes/180px2.jpg')} style={styles.logo} />

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={text => setEmail(text)}
              style={styles.input}
            />

            <View style={styles.passwordContainer}>
              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={text => setPassword(text)}
                style={styles.inputPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="#333" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
              <FontAwesome name="sign-in" size={20} color="#FFF" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Login</Text>
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
  contentContainer: {
    width: '90%',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    elevation: 5,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 100,
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
    paddingHorizontal: 15,
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
    borderWidth: 2,
    borderColor: '#f44336',
    padding: 5,
    elevation: 3,
  },
});
