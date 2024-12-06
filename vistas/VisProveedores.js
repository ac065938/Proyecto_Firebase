import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker'; // Importar DropDownPicker
import { db } from '../Control/Firebase';

const VisProveedores = () => {
  const [proveedores, setProveedores] = useState([]);
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [email, setEmail] = useState('');
  const [rfc, setRFC] = useState('');
  const [tipoProveedor, setTipoProveedor] = useState('local');
  const [activo, setActivo] = useState('activo'); // Cambio: 'activo' o 'inactivo'
  const [selectedProveedor, setSelectedProveedor] = useState(null);

  const [tipoProveedorOpen, setTipoProveedorOpen] = useState(false); // Estado para el dropdown
  const [activoOpen, setActivoOpen] = useState(false); // Estado para el dropdown de "Activo/Inactivo"

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
    if (!nombre || !telefono || !direccion || !email || !rfc) {
      alert('Todos los campos son obligatorios');
      return;
    }

    try {
      const data = {
        nombre,
        telefono,
        direccion,
        email,
        rfc,
        tipoProveedor,
        activo,
      };

      if (selectedProveedor) {
        // Actualizar proveedor existente
        await db.collection('proveedores').doc(selectedProveedor.id).update(data);
        alert('Proveedor actualizado');
      } else {
        // Crear un nuevo proveedor
        await db.collection('proveedores').add(data);
        alert('Proveedor agregado');
      }
      // Resetear campos
      setNombre('');
      setTelefono('');
      setDireccion('');
      setEmail('');
      setRFC('');
      setTipoProveedor('local');
      setActivo('activo'); // Reset a default value
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
    setEmail(proveedor.email);
    setRFC(proveedor.rfc);
    setTipoProveedor(proveedor.tipoProveedor);
    setActivo(proveedor.activo); // Actualizar el estado con el valor del proveedor
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
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="RFC"
        value={rfc}
        onChangeText={setRFC}
      />

      {/* Dropdown para Tipo de Proveedor */}
      <Text style={styles.label}>Tipo de Proveedor:</Text>
      <DropDownPicker
        open={tipoProveedorOpen}
        value={tipoProveedor}
        items={[
          { label: 'Local', value: 'local' },
          { label: 'Nacional', value: 'nacional' },
          { label: 'Internacional', value: 'internacional' },
        ]}
        setOpen={setTipoProveedorOpen}
        setValue={setTipoProveedor}
        style={styles.dropdown}
        placeholder="Seleccionar"
      />

      {/* Dropdown para Proveedor Activo/Inactivo */}
      <Text style={styles.label}>Estado del Proveedor:</Text>
      <DropDownPicker
        open={activoOpen}
        value={activo}
        items={[
          { label: 'Activo', value: 'activo' },
          { label: 'Inactivo', value: 'inactivo' },
        ]}
        setOpen={setActivoOpen}
        setValue={setActivo}
        style={styles.dropdown}
        placeholder="Seleccionar"
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
            <Text>Email: {item.email}</Text>
            <Text>RFC: {item.rfc}</Text>
            <Text>Tipo: {item.tipoProveedor}</Text>
            <Text>Estado: {item.activo === 'activo' ? 'Activo' : 'Inactivo'}</Text>
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
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
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
