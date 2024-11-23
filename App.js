import React, { useState, useRef, useCallback,useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Easing,style } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Pagina1 from './pantalla1';
import VisInicio from './vistas/VisInicio';
import VisPartes from './vistas/VisPartes';
import VisVehiculos from './vistas/VisVehiculos';
import VisProveedores from './vistas/VisProveedores';

import VisLogin from './vistas/VisLogin';
import Login from './vistas/Login';
import VisClientes from './vistas/VisClientes';
import { name as appName } from './app.json';
import { AppRegistry } from 'react-native';

const Stack = createNativeStackNavigator();

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
  // useEffect(() => {
  //   handleAddPhoto();
  // }, []);

  // Función para abrir el modal con la imagen seleccionada
  const handleImageClick = (uri) => {
    setSelectedImage(uri); // Establecer la imagen seleccionada
    setModalVisible(true); // Mostrar el modal
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setModalVisible(false); // Cerrar el modal
  };

export default function App() {
  return (
    <>
      {/* Navegación */}
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen 
            name="Login" 
            component={Login} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="Pagina1" 
            component={Pagina1} 
            options={{ title: 'Página 1' }} 
          />
          <Stack.Screen 
            name="VisInicio" 
            component={VisInicio} 
            options={{ title: 'Inicios' }} 
          />
          <Stack.Screen 
            name="VisLogin" 
            component={VisLogin} 
            options={{ title: 'Login' }} 
          />
          <Stack.Screen 
            name="VisClientes" 
            component={VisClientes} 
            options={{ title: 'VisClientes' }} 
          />
<Stack.Screen 
  name="VisVehiculos" 
  component={VisVehiculos} 
  options={{ title: 'Gestión de Vehículos' }} 
/>
          <Stack.Screen 
            name="VisPartes" 
            component={VisPartes} 
            options={{ title: 'VisPartes' }}  
          />
          <Stack.Screen 
            name="VisProveedores" 
            component={VisProveedores} 
            options={{ title: 'VisProveedores' }}
          />
        </Stack.Navigator>
      </NavigationContainer>



    </>
  );
}

AppRegistry.registerComponent(appName, () => App);


const HomeScreen = ({ navigation }) => {
  const [showAlumnoMenu, setShowAlumnoMenu] = useState(false); // Control del submenú
  const slideAnim = useRef(new Animated.Value(0)).current; // Valor inicial para la animación

  const handleToggleMenu = () => {
    setShowAlumnoMenu(!showAlumnoMenu);

    // Animación de deslizamiento
    Animated.timing(slideAnim, {
      toValue: showAlumnoMenu ? 0 : 1,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  };

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  // Cierra el submenú cuando la pantalla pierde el enfoque
  useFocusEffect(
    useCallback(() => {
      return () => {
        setShowAlumnoMenu(false);
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          easing: Easing.ease,
          useNativeDriver: false,
        }).start();
      };
    }, [])
  );

  const heightInterpolation = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 210], // Aumenté la altura para incluir el nuevo ítem
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>¡Hola, Andromeda!</Text>

      <View style={styles.bottomMenu}>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('VisInicio')}>
          <MaterialCommunityIcons name="account" size={24} color="#000" />
        </TouchableOpacity>

{/* Botón del submenú de alumnos */}
<TouchableOpacity style={styles.menuButton} onPress={handleToggleMenu}>
  <MaterialCommunityIcons name="tools" size={24} color="#000" /> {/* Icono de herramientas */}
</TouchableOpacity>

{/* Submenú animado */}
<Animated.View style={[styles.subMenu, { height: heightInterpolation }]}>
  {/* Opción para consulta de alumnos */}
  <TouchableOpacity style={styles.subMenuItem} onPress={() => navigation.navigate('VisClientes')}>
    <MaterialCommunityIcons name="account-multiple-outline" size={20} color="#007BFF" /> {/* Icono de consulta de existencias (autopartes) */}
    <Text style={styles.subMenuText}>VisClientes</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.subMenuItem} onPress={() => navigation.navigate('VisVehiculos')}>
            <MaterialCommunityIcons name="car" size={20} color="#007BFF" />
            <Text style={styles.subMenuText}>VisVehiculos</Text>
          </TouchableOpacity>

  {/* Opción para editar alumno */}
  <TouchableOpacity style={styles.subMenuItem} onPress={() => navigation.navigate('VisProveedores')}>
    <MaterialCommunityIcons name="store-outline" size={20} color="#007BFF" /> {/* Icono de editar pieza */}
    <Text style={styles.subMenuText}>VisProveedores</Text>
  </TouchableOpacity>

  {/* Opción para la foto de usuario */}
  <TouchableOpacity style={styles.subMenuItem} onPress={() => navigation.navigate('VisPartes')}>
  <MaterialCommunityIcons name="toolbox" size={20} color="#007BFF" /> {/* Icono de herramienta */}
  <Text style={styles.subMenuText}>VisPartes</Text>
</TouchableOpacity>

</Animated.View>

        <TouchableOpacity style={styles.menuButton} onPress={handleLogout}>
          <MaterialCommunityIcons name="logout" size={24} color="#000" />
        </TouchableOpacity>
        
      </View>
    </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#000',
    fontSize: 24,
    marginTop: 200,
  },
  bottomMenu: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#e0f7fa',
    paddingVertical: 8,
    height: 80,
  },
  menuButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  subMenu: {
    position: 'absolute',
    bottom: 90,
    left: 10,
    right: 10,
    backoundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
  },
  subMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  subMenuText: {
    fontSize: 16,
    color: '#000',
    marginLeft: 10,
  },
});
