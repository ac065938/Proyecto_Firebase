import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { db } from '../Control/Firebase';

const VisPartes = () => {
  const [partes, setPartes] = useState([]); // Lista de partes
  const [nombre, setNombre] = useState(''); // Nombre de la parte
  const [numeroParte, setNumeroParte] = useState(''); // Número de parte
  const [precio, setPrecio] = useState(''); // Precio de la parte
  const [selectedParte, setSelectedParte] = useState(null); // Parte seleccionada para editar

  // Leer partes de Firebase
  useEffect(() => {
    const unsubscribe = db.collection('partes').onSnapshot((snapshot) => {
      const partesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPartes(partesData);
    });

    return unsubscribe; // Cancelar la suscripción al desmontar el componente
  }, []);

  // Crear o actualizar parte
  const handleSaveParte = async () => {
    if (!nombre || !numeroParte || !precio) {
      alert('Todos los campos son obligatorios');
      return;
    }

    try {
      if (selectedParte) {
        // Actualizar
        await db.collection('partes').doc(selectedParte.id).update({ nombre, numeroParte, precio });
        alert('Parte actualizada');
      } else {
        // Crear
        await db.collection('partes').add({ nombre, numeroParte, precio });
        alert('Parte agregada');
      }

      // Resetear campos
      setNombre('');
      setNumeroParte('');
      setPrecio('');
      setSelectedParte(null);
    } catch (error) {
      console.error('Error al guardar la parte:', error);
    }
  };

  // Eliminar parte
  const handleDeleteParte = async (id) => {
    try {
      await db.collection('partes').doc(id).delete();
      alert('Parte eliminada');
    } catch (error) {
      console.error('Error al eliminar la parte:', error);
    }
  };

  // Seleccionar parte para edición
  const handleEditParte = (parte) => {
    setNombre(parte.nombre);
    setNumeroParte(parte.numeroParte);
    setPrecio(parte.precio);
    setSelectedParte(parte);
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
