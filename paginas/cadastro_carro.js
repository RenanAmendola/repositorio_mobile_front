import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../AuthContext'; // ajuste o caminho conforme necessário

export default function RegisterVehiclePage() {
  const [modelo, setModelo] = useState('');
  const [anoCarro, setAnoCarro] = useState('');
  const [corCarro, setCorCarro] = useState('');
  const [idUsuario, setIdUsuario] = useState(''); // Variável local para armazenar o ID do usuário
  const { user } = useAuth(); // Obtém o usuário do contexto de autenticação
  const navigation = useNavigation();

  // Atualiza o idUsuario com o ID do usuário armazenado no contexto assim que o componente for montado
  useState(() => {
    if (user) {
      setIdUsuario(user.id); // Supondo que o objeto do usuário tenha um campo 'id'
    }
  }, [user]);


  const handleRegister = async () => {
    try {
      const response = await fetch('https://mobile-group-project-api-production.up.railway.app/Carro/cadastrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          modelo: modelo,
          ano_carro: anoCarro,
          cor_carro: corCarro,
          idUsuario: {
            id: idUsuario,
          },
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.message);
        navigation.navigate('HomePage'); // Substitua pelo nome da sua página de destino
      } else {
        console.error('Erro no cadastro:', data);
      }
    } catch (error) {
      console.error('Erro no servidor:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../assets/180.png')} />
        <Text style={styles.title}>Cadastro de Veículo</Text>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="Modelo"
            value={modelo}
            onChangeText={setModelo}
          />
          <TextInput
            style={styles.input}
            placeholder="Ano do Carro"
            value={anoCarro}
            onChangeText={setAnoCarro}
          />
          <TextInput
            style={styles.input}
            placeholder="Cor do Carro"
            value={corCarro}
            onChangeText={setCorCarro}
          />
          <Button title="Cadastrar" onPress={handleRegister} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  container: {
    width: '100%',
    alignItems: 'center',
  },
  logo: {
    margin: 50,
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
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
