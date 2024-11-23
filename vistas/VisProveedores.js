import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { db } from '../Control/Firebase'; // Importa tu configuración de Firebase

const VisProveedores = () => {
  const [proveedores, setProveedores] = useState([]);
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [selectedProveedor, setSelectedProveedor] = useState(null);

  // Leer proveedores desde Firebase
  useEffect(() => {
    const unsubscribe = db.collection('proveedores').onSnapshot((snapshot) => {
      const proveedoresData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProveedores(proveedoresData);
    });
    return unsubscribe;
  }, []);

  // Crear o actualizar proveedor
  const handleSaveProveedor = async () => {
    if (!nombre || !telefono || !direccion) {
      alert('Todos los campos son obligatorios');
      return;
    }

    try {
      if (selectedProveedor) {
        // Actualizar proveedor existente
        await db.collection('proveedores').doc(selectedProveedor.id).update({
          nombre,
          telefono,
          direccion,
        });
        alert('Proveedor actualizado');
      } else {
        // Crear un nuevo proveedor
        await db.collection('proveedores').add({
          nombre,
          telefono,
          direccion,
        });
        alert('Proveedor agregado');
      }
      // Resetear campos
      setNombre('');
      setTelefono('');
      setDireccion('');
      setSelectedProveedor(null);
    } catch (error) {
      console.error('Error al guardar proveedor:', error);
    }
  };

  // Eliminar proveedor
  const handleDeleteProveedor = async (id) => {
    try {
      await db.collection('proveedores').doc(id).delete();
      alert('Proveedor eliminado');
    } catch (error) {
      console.error('Error al eliminar proveedor:', error);
    }
  };

  // Seleccionar proveedor para editar
  const handleEditProveedor = (proveedor) => {
    setNombre(proveedor.nombre);
    setTelefono(proveedor.telefono);
    setDireccion(proveedor.direccion);
    setSelectedProveedor(proveedor);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Proveedores</Text>

      {/* Formulario */}
      <TextInput
        style={styles.input}
        placeholder="Nombre del Proveedor"
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
      <Button
        title={selectedProveedor ? 'Actualizar Proveedor' : 'Agregar Proveedor'}
        onPress={handleSaveProveedor}
      />

      {/* Lista de proveedores */}
      <FlatList
        data={proveedores}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.proveedorItem}>
            <Text>Nombre: {item.nombre}</Text>
            <Text>Teléfono: {item.telefono}</Text>
            <Text>Dirección: {item.direccion}</Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => handleEditProveedor(item)}>
                <Text style={styles.editButton}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteProveedor(item.id)}>
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
  proveedorItem: {
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

export default VisProveedores;
