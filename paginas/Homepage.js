import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ActivityIndicator, Alert } from 'react-native';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';

export default function HomePage() {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('');
  const [destination, setDestination] = useState('Faculdade Senac');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setAddress('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      obterEndereco(location.coords.latitude, location.coords.longitude);
    })();
  }, []);

  const obterEndereco = async (latitude, longitude) => {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data && data.address) {
        const rua = data.address.road || '';
        const bairro = data.address.neighbourhood || data.address.suburb || '';
        const cidade = data.address.city || data.address.town || data.address.village || '';
        setAddress(`${rua}, ${bairro}, ${cidade}`);
      } else {
        setAddress('Endereço não encontrado');
      }
    } catch (error) {
      console.error('Erro ao obter endereço:', error);
      setAddress('Erro ao obter endereço');
    }
  };

  const obterCoordenadas = async (endereco) => {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(endereco)}&format=json&limit=1`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        return {
          latitude: parseFloat(lat),
          longitude: parseFloat(lon),
        };
      } else {
        throw new Error('Endereço não encontrado');
      }
    } catch (error) {
      console.error('Erro ao obter coordenadas:', error);
      Alert.alert('Erro', 'Não foi possível obter as coordenadas do destino.');
    }
  };

  const handleNavigateToConfirmation = async () => {
    if (!location) {
      Alert.alert('Erro', 'Localização atual não disponível.');
      return;
    }

    const currentLocation = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };

    setLoading(true);
    const destinationLocation = await obterCoordenadas(destination);
    setLoading(false);

    if (destinationLocation) {
      navigation.navigate('RotaPagina', {
        currentLocation,
        destinationLocation,
      });
    }
  };

  const cadastrarCArro = () => {
    navigation.navigate('CarroCadastro');
  };

  const cadastrarRota = () => {
    navigation.navigate('RotaCadastro');
  };



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agende Sua Carona</Text>
      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Localização atual"
          value={address}
          onChangeText={setAddress}
        />
        <TextInput
          style={styles.input}
          placeholder="Faculdade Senac"
          value={"Faculdade Senac"}
          onChangeText={setDestination}
          editable={false} // Não permite edição do ID do usuário
        />
        <TextInput
          style={styles.input}
          placeholder="Data"
          value={date}
          onChangeText={setDate}
        />
        <TextInput
          style={styles.input}
          placeholder="Horário"
          value={time}
          onChangeText={setTime}
        />
        <Button title="Localizar" onPress={handleNavigateToConfirmation} />
        <Button title="Cadastro Carro" onPress={cadastrarCArro} />
        <Button title="Cadastro de Endereço" onPress={cadastrarRota} />
      </View>
      {loading && <ActivityIndicator size="large" color="#228B22" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 20,
  },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    marginVertical: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
});
