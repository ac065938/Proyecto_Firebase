import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { db } from '../Control/Firebase';
import LinearGradient from 'react-native-linear-gradient';

import DropDownPicker from 'react-native-dropdown-picker'; // Importa DropDownPicker

const VisPartes = () => {
  const [partes, setPartes] = useState([]);
  const [nombre, setNombre] = useState('');
  const [numeroParte, setNumeroParte] = useState('');
  const [precio, setPrecio] = useState('');
  const [fechaIngreso, setFechaIngreso] = useState(new Date());
  const [garantia, setGarantia] = useState(false);
  const [descripcion, setDescripcion] = useState('');
  const [selectedParte, setSelectedParte] = useState(null);
  const [garantiaOpen, setGarantiaOpen] = useState(false); // Para "Garantía"

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [activoOpen, setActivoOpen] = useState(false); // Estado para el dropdown de "Activo/Inactivo"
  const [activo, setActivo] = useState('activo'); // Cambio: 'activo' o 'inactivo'


  const [esOriginal, setEsOriginal] = useState(false); // Inicializar como false por defecto

  // Leer partes de Firebase
  useEffect(() => {
    const unsubscribe = db.collection('partes').onSnapshot((snapshot) => {
      const partesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPartes(partesData);
    });

    return unsubscribe;
  }, []);

  // Crear o actualizar parte
  const handleSaveParte = async () => {
    if (!nombre || !numeroParte || !precio) {
      alert('Todos los campos son obligatorios');
      return;
    }

    try {
      const parteData = {
        nombre,
        numeroParte,
        precio,
        fechaIngreso: fechaIngreso.toISOString(),
        garantia,
        descripcion,
        esOriginal, // Incluye el valor del DropdownPicker
      };

      if (selectedParte) {
        await db.collection('partes').doc(selectedParte.id).update(parteData);
        alert('Parte actualizada');
      } else {
        await db.collection('partes').add(parteData);
        alert('Parte agregada');
      }

      setNombre('');
      setNumeroParte('');
      setPrecio('');
      setFechaIngreso(new Date());
      setGarantia(false);
      setDescripcion('');
      setSelectedParte(null);
      setEsOriginal(null); // Resetear el DropdownPicker
    } catch (error) {
      console.error('Error al guardar la parte:', error);
    }
  };

  const handleDeleteParte = async (id) => {
    try {
      await db.collection('partes').doc(id).delete();
      alert('Parte eliminada');
    } catch (error) {
      console.error('Error al eliminar la parte:', error);
    }
  };

  const handleEditParte = (parte) => {
    setNombre(parte.nombre);
    setNumeroParte(parte.numeroParte);
    setPrecio(parte.precio);
    setFechaIngreso(new Date(parte.fechaIngreso));
    setGarantia(parte.garantia);
    setDescripcion(parte.descripcion);
    setSelectedParte(parte);
    setEsOriginal(parte.esOriginal); // Asignar el valor de "esOriginal" cuando edites una parte
  };

  return (
    
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Partes</Text>

      {/* Formulario */}
      <TextInput
        style={styles.input}
        placeholder="Nombre de la Parte"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Número de Parte"
        value={numeroParte}
        onChangeText={setNumeroParte}
      />
      <TextInput
        style={styles.input}
        placeholder="Precio"
        value={precio}
        onChangeText={setPrecio}
        keyboardType="numeric"
      />
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePicker}>
        <Text>Fecha de Ingreso: {fechaIngreso.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={fechaIngreso}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, date) => {
            setShowDatePicker(false);
            if (date) setFechaIngreso(date);
          }}
        />
      )}

<DropDownPicker
  open={activoOpen}
  value={esOriginal} // Usar `esOriginal` en lugar de `activo`
  items={[
    { label: 'Es original', value: true },
    { label: 'No es original', value: false },
  ]}
  setOpen={setActivoOpen}
  setValue={setEsOriginal} // Actualiza el estado de `esOriginal`
  containerStyle={styles.dropdown}
  placeholder="Seleccionar tipo de parte"
/>

<DropDownPicker
  open={garantiaOpen}
  value={garantia}
  items={[
    { label: 'Tiene Garantía', value: true },
    { label: 'No tiene Garantía', value: false },
  ]}
  setOpen={setGarantiaOpen}
  setValue={setGarantia}
  defaultValue={garantia}
  containerStyle={styles.dropdown}
  onChangeItem={(item) => setGarantia(item.value)}
  placeholder="Garantía"
/>

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Descripción de la Parte"
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
      />
      <Button title={selectedParte ? 'Actualizar Parte' : 'Agregar Parte'} onPress={handleSaveParte} />

      {/* Lista de partes */}
      <FlatList
        data={partes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.parteItem}>
            <Text>Nombre: {item.nombre}</Text>
            <Text>Número de Parte: {item.numeroParte}</Text>
            <Text>Precio: ${item.precio}</Text>
            <Text>Fecha de Ingreso: {new Date(item.fechaIngreso).toLocaleDateString()}</Text>
            <Text>Garantía: {item.garantia ? 'Sí' : 'No'}</Text>
            <Text>Descripción: {item.descripcion}</Text>
            <Text>Es Original: {item.esOriginal ? 'Sí' : 'No'}</Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => handleEditParte(item)}>
                <Text style={styles.editButton}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteParte(item.id)}>
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
  textArea: {
    height: 80,
  },
  datePicker: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  dropdown: {
    marginBottom: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    zIndex: 100, // Ajustar el valor de zIndex si es necesario
  },
  parteItem: {
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

export default VisPartes;
