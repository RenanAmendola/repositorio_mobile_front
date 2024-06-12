import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';

const RotasListagem = () => {
  const [rotas, setRotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    axios.get('https://mobile-group-project-api-production.up.railway.app/Rota')
      .then(response => {
        setRotas(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar rotas:', error);
        setError('Erro ao buscar rotas');
        setLoading(false);
      });
  }, []);

  if (loading) return <Text>Carregando rotas...</Text>;
  if (error) return <Text>{error}</Text>;

  const confirmarCarona = (currentLocation, destinationLocation) => {
    navigation.navigate('ConfirmationPage', {
      currentLocation,
      destinationLocation,
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Listagem de Rotas</Text>
        {rotas.map((rota) => (
          <View key={rota.id} style={styles.rotaContainer}>
            <Text style={styles.rotaText}>Início: {rota.inicio}</Text>
            <Text style={styles.rotaText}>Destino: {rota.destino}</Text>
            <Text style={styles.rotaText}>Motorista: {rota.idMotorista ? rota.idMotorista.nome : 'Desconhecido'}</Text>
            <Text style={styles.rotaText}>Horário: {rota.horario}</Text>
            {rota.parada1 && <Text style={styles.rotaText}>Parada 1: {rota.parada1}</Text>}
            {rota.parada2 && <Text style={styles.rotaText}>Parada 2: {rota.parada2}</Text>}
            {rota.parada3 && <Text style={styles.rotaText}>Parada 3: {rota.parada3}</Text>}
            {rota.parada4 && <Text style={styles.rotaText}>Parada 4: {rota.parada4}</Text>}
            <TouchableOpacity 
              style={styles.button} 
              onPress={() => confirmarCarona(rota.inicio, rota.destino)}
            >
              <Text style={styles.buttonText}>Confirmar Carona</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  rotaContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Para Android
  },
  rotaText: {
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default RotasListagem;
