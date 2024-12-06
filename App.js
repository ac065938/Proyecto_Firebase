import React, { useState, useRef, useCallback,useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Easing,style } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Pagina1 from './pantalla1';
import VisInicio from './vistas/VisInicio';
import VisPartes from './vistas/VisPartes';
import VisVehiculos from './vistas/VisVehiculos';
import VMapaDir from './vistas/VMapaDir';

import VisProveedores from './vistas/VisProveedores';
import VisGPS from './vistas/VisGPS';

import VisLogin from './vistas/VisLogin';
import Login from './vistas/Login';
import VisClientes from './vistas/VisClientes';
import { name as appName } from './app.json';
import { AppRegistry } from 'react-native';

const Stack = createNativeStackNavigator();

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
            options={{ title: 'Inicio' }} 
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
  name="VisGPS" 
  component={VisGPS} 
  options={{ title: 'Mapa GPS' }} 
/>

<Stack.Screen 
  name="VMapaDir" 
  component={VMapaDir} 
  options={{ title: 'Detalle del Mapa' }} 
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
  const [showAlumnoMenu, setShowAlumnoMenu] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const handleToggleMenu = () => {
    setShowAlumnoMenu(!showAlumnoMenu);
    Animated.timing(slideAnim, {
      toValue: showAlumnoMenu ? 0 : 1,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  };

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
    outputRange: [0, 250],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>¡Hola, Bienvenido!</Text>

      <View style={styles.bottomMenu}>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('VisInicio')}>
          <MaterialCommunityIcons name="account" size={24} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuButton} onPress={handleToggleMenu}>
          <MaterialCommunityIcons name="tools" size={24} color="#000" />
        </TouchableOpacity>

        <Animated.View style={[styles.subMenu, { height: heightInterpolation }]}>
          <TouchableOpacity style={styles.subMenuItem} onPress={() => navigation.navigate('VisClientes')}>
            <MaterialCommunityIcons name="account-multiple-outline" size={20} color="#fefae0" />
            <Text style={styles.subMenuText}>VisClientes</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.subMenuItem} onPress={() => navigation.navigate('VisVehiculos')}>
            <MaterialCommunityIcons name="car" size={20} color="#fefae0" />
            <Text style={styles.subMenuText}>VisVehiculos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.subMenuItem} onPress={() => navigation.navigate('VisProveedores')}>
            <MaterialCommunityIcons name="store-outline" size={20} color="#fefae0" />
            <Text style={styles.subMenuText}>VisProveedores</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.subMenuItem} onPress={() => navigation.navigate('VisPartes')}>
            <MaterialCommunityIcons name="toolbox" size={20} color="#fefae0" />
            <Text style={styles.subMenuText}>VisPartes</Text>
          </TouchableOpacity>

          {/* Nuevo botón para GPS */}
          <TouchableOpacity style={styles.subMenuItem} onPress={() => navigation.navigate('VisGPS')}>
            <MaterialCommunityIcons name="map-outline" size={20} color="#fefae0" />
            <Text style={styles.subMenuText}>Mapa GPS</Text>
          </TouchableOpacity>
        </Animated.View>

        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('Login')}>
          <MaterialCommunityIcons name="logout" size={24} color="#000" />
        </TouchableOpacity>
      </View>
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
  text: {
    color: '#fff',
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
    backgroundColor: '#fefae0',
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
    shadowOpacity: 0.6,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
  },
  subMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
  },
  subMenuText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 10,
  },
});
