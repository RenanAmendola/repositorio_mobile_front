import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../AuthContext';  // Importando o contexto de autenticação

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();  // Utilizando a função de login do contexto
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await fetch('https://mobile-group-project-api-production.up.railway.app/Usuario/logar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, senha: password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        login(data); // Armazena os dados do usuário no contexto
        navigation.navigate('HomePage'); // Navega para a tela principal após o login
      } else {
        console.error('Erro de login:', data);
      }
    } catch (error) {
      console.error('Erro no servidor:', error);
    }
  };
  const handleRegister = () => {
    navigation.navigate('RegisterPage');
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/180.png')} />
      <Text style={styles.title}>RideShare</Text>
      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Login" onPress={handleLogin} />
        <TouchableOpacity onPress={handleRegister}>
          <Text style={styles.registerLink}>Não tem uma conta? Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
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
  registerLink: {
    marginTop: 20,
    color: '#228B22',
    textAlign: 'center',
  },
});
