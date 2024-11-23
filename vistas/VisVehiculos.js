import React, { useState, useEffect } from 'react';
import { db } from '../Control/Firebase'; // Ya no necesitas el import de storage ni ImagePicker
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const VisVehiculos = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [modelo, setModelo] = useState('');
  const [anio, setAnio] = useState('');
  const [numeroSerie, setNumeroSerie] = useState('');
  const [selectedVehiculo, setSelectedVehiculo] = useState(null);

  useEffect(() => {
    const unsubscribe = db.collection('vehiculos')
      .onSnapshot((snapshot) => {
        const vehiculosData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setVehiculos(vehiculosData);
      });
    return unsubscribe;
  }, []);

  const handleSaveVehiculo = async () => {
    if (!modelo || !anio || !numeroSerie) {
      alert('Todos los campos son obligatorios');
      return;
    }
  
    try {
      if (selectedVehiculo) {
        await db.collection('vehiculos')
          .doc(selectedVehiculo.id)
          .update({ modelo, anio, numeroSerie });
        alert('Vehículo actualizado');
      } else {
        await db.collection('vehiculos').add({ modelo, anio, numeroSerie });
        alert('Vehículo agregado');
      }
  
      // Limpiamos los campos
      setModelo('');
      setAnio('');
      setNumeroSerie('');
      setSelectedVehiculo(null);
    } catch (error) {
      console.error('Error al guardar vehículo:', error);
      alert('Hubo un error al guardar el vehículo.');
    }
  };

  const handleEditVehiculo = (vehiculo) => {
    setModelo(vehiculo.modelo);
    setAnio(vehiculo.anio);
    setNumeroSerie(vehiculo.numeroSerie);
    setSelectedVehiculo(vehiculo);
  };

  const handleDeleteVehiculo = async (id) => {
    try {
      await db.collection('vehiculos').doc(id).delete();
      alert('Vehículo eliminado');
    } catch (error) {
      console.error('Error al eliminar vehículo:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Vehículos</Text>

      <TextInput
        style={styles.input}
        placeholder="Modelo"
        value={modelo}
        onChangeText={setModelo}
      />
      <TextInput
        style={styles.input}
        placeholder="Año"
        value={anio}
        onChangeText={setAnio}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Número de Serie"
        value={numeroSerie}
        onChangeText={setNumeroSerie}
      />

      <Button title={selectedVehiculo ? 'Actualizar Vehículo' : 'Agregar Vehículo'} onPress={handleSaveVehiculo} />

      <FlatList
        data={vehiculos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.vehiculoItem}>
            <Text>Modelo: {item.modelo}</Text>
            <Text>Año: {item.anio}</Text>
            <Text>Número de Serie: {item.numeroSerie}</Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => handleEditVehiculo(item)}>
                <Text style={styles.editButton}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteVehiculo(item.id)}>
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
  vehiculoItem: {
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

export default VisVehiculos;
