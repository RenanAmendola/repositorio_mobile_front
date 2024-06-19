import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

export default function RegisterPage() {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState(''); 
  const [cpf, setCPF] = useState(''); 
  const [foto, setFoto] = useState(''); 
  const [matricula, setMatricula] = useState(''); 

  const navigation = useNavigation();

  const handleRegister = async () => {
    try {
      const response = await fetch('https://mobile-group-project-api-production.up.railway.app/Usuario/cadastrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome : nome,
          sobrenome : sobrenome,
          telefone : telefone,
          email : email,
          tipo : tipoUsuario,
          cpf : cpf,
          foto : foto,
          matricula : matricula,
          senha : senha,
           
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.message);
        Alert.alert("Conta criada com sucesso, redirecionando para login!")
        // Navegar para a tela de login após o cadastro
        navigation.navigate('LoginPage');
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
        <Text style={styles.title}>Cadastro</Text>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={nome}
            onChangeText={setNome}
          />
          <TextInput
            style={styles.input}
            placeholder="Sobrenome"
            value={sobrenome}
            onChangeText={setSobrenome}
          />
          <TextInput
            style={styles.input}
            placeholder="Telefone"
            value={telefone}
            onChangeText={setTelefone}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <Picker
            selectedValue={tipoUsuario}
            style={styles.input}  
            onValueChange={(itemValue) => {
              setTipoUsuario(itemValue);
            }}
          >
            <Picker.Item label="Selecione uma função" value="" />
            <Picker.Item label="Motorista" value="motorista" />
            <Picker.Item label="Passageiro" value="passageiro" />
          </Picker>
          <TextInput
            style={styles.input}
            placeholder="Foto"
            value={foto}
            onChangeText={setFoto}
          />
          <TextInput
            style={styles.input}
            placeholder="CPF"
            value={cpf}
            onChangeText={setCPF}
          />
          <TextInput
            style={styles.input}
            placeholder="Matricula"
            value={matricula}
            onChangeText={setMatricula}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />
          <Button title="Cadastrar" onPress={handleRegister} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
