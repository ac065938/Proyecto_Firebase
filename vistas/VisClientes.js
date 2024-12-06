import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'; // Importa DateTimePicker
import { db } from '../Control/Firebase'; // Tu archivo de configuración de Firebase

const VisClientes = () => {
  const [clientes, setClientes] = useState([]); // Lista de clientes
  const [nombre, setNombre] = useState(''); // Nombre del cliente
  const [telefono, setTelefono] = useState(''); // Teléfono del cliente
  const [direccion, setDireccion] = useState(''); // Dirección del cliente
  const [vehiculo, setVehiculo] = useState(''); // Vehículo del cliente
  const [correo, setCorreo] = useState(''); // Correo electrónico del cliente
  const [fechaNacimiento, setFechaNacimiento] = useState(new Date()); // Fecha de nacimiento (por defecto, fecha actual)
  const [modeloVehiculo, setModeloVehiculo] = useState(''); // Modelo del vehículo

  const [selectedCliente, setSelectedCliente] = useState(null); // Cliente seleccionado para editar
  const [showDatePicker, setShowDatePicker] = useState(false); // Mostrar u ocultar el selector de fecha

  // Leer clientes desde Firebase
  useEffect(() => {
    const unsubscribe = db.collection('clientes').onSnapshot((snapshot) => {
      const clientesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setClientes(clientesData);
    });
    return unsubscribe;
  }, []);

  // Crear o actualizar cliente
  const handleSaveCliente = async () => {
    if (!nombre || !telefono || !direccion || !vehiculo || !correo || !fechaNacimiento || !modeloVehiculo) {
      alert('Todos los campos son obligatorios');
      return;
    }

    try {
      // Verificar si fechaNacimiento es un objeto Date
      const fechaISO = fechaNacimiento instanceof Date ? fechaNacimiento.toISOString().split('T')[0] : '';
      if (selectedCliente) {
        // Actualizar cliente
        await db.collection('clientes').doc(selectedCliente.id).update({
          nombre,
          telefono,
          direccion,
          vehiculo,
          correo,
          fechaNacimiento: fechaISO, // Formatear fecha
          modeloVehiculo,
        });
        alert('Cliente actualizado');
      } else {
        // Crear cliente
        await db.collection('clientes').add({
          nombre,
          telefono,
          direccion,
          vehiculo,
          correo,
          fechaNacimiento: fechaISO, // Formatear fecha
          modeloVehiculo,
        });
        alert('Cliente agregado');
      }

      // Resetear campos
      setNombre('');
      setTelefono('');
      setDireccion('');
      setVehiculo('');
      setCorreo('');
      setFechaNacimiento(new Date());
      setModeloVehiculo('');

      setSelectedCliente(null);
    } catch (error) {
      console.error('Error al guardar cliente:', error);
    }
  };

  // Eliminar cliente
  const handleDeleteCliente = async (id) => {
    try {
      await db.collection('clientes').doc(id).delete();
      alert('Cliente eliminado');
    } catch (error) {
      console.error('Error al eliminar cliente:', error);
    }
  };

  // Seleccionar cliente para edición
  const handleEditCliente = (cliente) => {
    setNombre(cliente.nombre);
    setTelefono(cliente.telefono);
    setDireccion(cliente.direccion);
    setVehiculo(cliente.vehiculo);
    setCorreo(cliente.correo);
    setFechaNacimiento(new Date(cliente.fechaNacimiento)); // Convertir a Date
    setModeloVehiculo(cliente.modeloVehiculo);
    setSelectedCliente(cliente);
  };

  // Mostrar el selector de fecha
  const showDatePickerHandler = () => {
    setShowDatePicker(true);
  };

  // Manejar el cambio de fecha
  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false); // Ocultar el selector de fecha
    if (selectedDate) {
      setFechaNacimiento(selectedDate); // Actualizar la fecha seleccionada
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Clientes</Text>

      {/* Formulario */}
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={telefono}
        onChangeText={setTelefono}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Dirección"
        value={direccion}
        onChangeText={setDireccion}
      />
      <TextInput
        style={styles.input}
        placeholder="Vehículo"
        value={vehiculo}
        onChangeText={setVehiculo}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        value={correo}
        onChangeText={setCorreo}
        keyboardType="email-address"
      />
      
      <TouchableOpacity onPress={showDatePickerHandler} style={styles.datePickerButton}>
        <Text>Fecha de Nacimiento: {fechaNacimiento.toISOString().split('T')[0]}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={fechaNacimiento}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onDateChange}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Modelo del Vehículo"
        value={modeloVehiculo}
        onChangeText={setModeloVehiculo}
      />
      <Button
        title={selectedCliente ? 'Actualizar Cliente' : 'Agregar Cliente'}
        onPress={handleSaveCliente}
      />

      {/* Lista de clientes */}
      <FlatList
        data={clientes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.clienteItem}>
            <Text>Nombre: {item.nombre}</Text>
            <Text>Teléfono: {item.telefono}</Text>
            <Text>Dirección: {item.direccion}</Text>
            <Text>Vehículo: {item.vehiculo}</Text>
            <Text>Correo: {item.correo}</Text>
            <Text>Fecha de Nacimiento: {item.fechaNacimiento}</Text>
            <Text>Modelo del Vehículo: {item.modeloVehiculo}</Text>

            <View style={styles.actions}>
              <TouchableOpacity onPress={() => handleEditCliente(item)}>
                <Text style={styles.editButton}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteCliente(item.id)}>
                <Text style={styles.deleteButton}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  clienteItem: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    color: '#007BFF',
  },
  deleteButton: {
    color: '#FF0000',
  },
  datePickerButton: {
    marginBottom: 10,
  },
});

export default VisClientes;
