import React from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const VMapaDir = ({ route }) => {
  const { lat, lon } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: lat || 0,
          longitude: lon || 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {lat && lon && (
          <Marker coordinate={{ latitude: lat, longitude: lon }} title="Ubicación" />
        )}
      </MapView>
    </View>
  );
};

export default VMapaDir;
