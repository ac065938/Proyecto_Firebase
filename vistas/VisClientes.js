import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { db } from '../Control/Firebase'; // Tu archivo de configuración de Firebase

const VisClientes = () => {
  const [clientes, setClientes] = useState([]); // Lista de clientes
  const [nombre, setNombre] = useState(''); // Nombre del cliente
  const [telefono, setTelefono] = useState(''); // Teléfono del cliente
  const [direccion, setDireccion] = useState(''); // Dirección del cliente
  const [vehiculo, setVehiculo] = useState(''); // Dirección del cliente

  const [selectedCliente, setSelectedCliente] = useState(null); // Cliente seleccionado para editar

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
    if (!nombre || !telefono || !direccion || !vehiculo) {
      alert('Todos los campos son obligatorios');
      return;
    }

    try {
      if (selectedCliente) {
        // Actualizar cliente
        await db.collection('clientes').doc(selectedCliente.id).update({
          nombre,
          telefono,
          direccion,
          vehiculo,
        });
        alert('Cliente actualizado');
      } else {
        // Crear cliente
        await db.collection('clientes').add({
          nombre,
          telefono,
          direccion,
          vehiculo,
        });
        alert('Cliente agregado');
      }

      // Resetear campos
      setNombre('');
      setTelefono('');
      setDireccion('');
      setVehiculo('');

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
    setSelectedCliente(cliente);
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
        placeholder="Vehiculo"
        value={vehiculo}
        onChangeText={setVehiculo}
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
});

export default VisClientes;
