import React, { useState, useEffect } from 'react';
import { db } from '../Control/Firebase';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';

const VisVehiculos = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [modelo, setModelo] = useState('');
  const [anio, setAnio] = useState('');
  const [numeroSerie, setNumeroSerie] = useState('');
  const [combustibleOpen, setCombustibleOpen] = useState(false);
  const [transmisionOpen, setTransmisionOpen] = useState(false);

  const [color, setColor] = useState('');
  const [combustible, setCombustible] = useState('Gasolina');
  const [aireAcondicionado, setAireAcondicionado] = useState(false);
  const [tipoTransmision, setTipoTransmision] = useState('Estándar');
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
    if (!modelo || !anio || !numeroSerie || !color) {
      alert('Todos los campos son obligatorios');
      return;
    }

    try {
      const data = { modelo, anio, numeroSerie, color, combustible, aireAcondicionado, tipoTransmision };
      if (selectedVehiculo) {
        await db.collection('vehiculos').doc(selectedVehiculo.id).update(data);
        alert('Vehículo actualizado');
      } else {
        await db.collection('vehiculos').add(data);
        alert('Vehículo agregado');
      }

      setModelo('');
      setAnio('');
      setNumeroSerie('');
      setColor('');
      setCombustible('Gasolina');
      setAireAcondicionado(false);
      setTipoTransmision('Estándar');
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
    setColor(vehiculo.color);
    setCombustible(vehiculo.combustible);
    setAireAcondicionado(vehiculo.aireAcondicionado);
    setTipoTransmision(vehiculo.tipoTransmision);
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

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = 1900; year <= currentYear; year++) {
      years.push(year.toString());
    }
    return years;
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
      <TextInput
        style={styles.input}
        placeholder="Color"
        value={color}
        onChangeText={setColor}
      />

<View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={[styles.checkbox, aireAcondicionado && styles.checked]}
          onPress={() => setAireAcondicionado(!aireAcondicionado)}
        >
          {aireAcondicionado && <Text style={styles.checkmark}>✓</Text>}
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>Aire Acondicionado</Text>
      </View>

<Text style={styles.label}>Tipo de Combustible:</Text>
      <DropDownPicker
        open={combustibleOpen}
        value={combustible}
        items={[
          { label: 'Gasolina', value: 'Gasolina' },
          { label: 'Diésel', value: 'Diésel' },
          { label: 'Eléctrico', value: 'Eléctrico' },
          { label: 'Híbrido', value: 'Híbrido' },
        ]}
        setOpen={setCombustibleOpen}
        setValue={setCombustible}
        style={styles.dropdown}
        placeholder="Seleccionar"
      />

<Text style={styles.label}>Tipo de Transmisión:</Text>
<DropDownPicker
  open={transmisionOpen}
  value={tipoTransmision}
  items={[
    { label: 'Estándar', value: 'Estándar' },
    { label: 'Automático', value: 'Automático' },
  ]}
  setOpen={setTransmisionOpen}
  setValue={setTipoTransmision}
  style={styles.dropdown}
  placeholder="Seleccionar"
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
            <Text>Color: {item.color}</Text>
            <Text>Combustible: {item.combustible}</Text>
            <Text>Aire Acondicionado: {item.aireAcondicionado ? 'Sí' : 'No'}</Text>
            <Text>Transmisión: {item.tipoTransmision}</Text>
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
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checked: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  checkmark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  
  editButton: {
    color: '#007BFF',
  },
  deleteButton: {
    color: '#FF0000',
  },
});

export default VisVehiculos;
