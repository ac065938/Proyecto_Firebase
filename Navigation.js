import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CardLayoutScreen from './CardLayoutScreen'; // Asegúrate de que la ruta sea correcta
import Pagina1 from './pantalla1'; // Asegúrate de que la ruta sea correcta
import VisInicio from './vistas/VisInicio'; // Asegúrate de que la ruta sea correcta
import VisLogin from './vistas/VisLogin';
import VisLogin from './vistas/Login';
import VisLogin from './vistas/VisGrafica';
import VisLogin from './vistas/VisConsulAlumno';
import AddVolkswagenModel from './vistas/VisVehiculos';




const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CardLayoutScreen">
        <Stack.Screen name="CardLayoutScreen" component={CardLayoutScreen} />
        <Stack.Screen name="Pagina1" component={Pagina1} />
        <Stack.Screen name="VisInicio" component={VisInicio} />
        <Stack.Screen name="VisLogin" component={VisLogin} />
        <Stack.Screen name="VisGrafica" component={VisGrafica} />
        <Stack.Screen name="VisConsulAlumno" component={VisConsulAlumno} />
        <Stack.Screen name="VisVehiculos" component={VisVehiculos} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
