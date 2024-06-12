import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, Image, ActivityIndicator, ScrollView } from 'react-native';
import { useAuth } from '../AuthContext'; // Ajuste o caminho conforme necessário
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

export default function EditUserInfoPage() {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const [idUsuario, setIdUsuario] = useState('');
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

  useEffect(() => {
    if (user) {
      setIdUsuario(user.id);
      setNome(user.nome);
      setSobrenome(user.sobrenome);
      setTelefone(user.telefone);
      setEmail(user.email);
      setTipoUsuario(user.tipo);
      setCPF(user.cpf);
      setMatricula(user.matricula);
      setSenha(user.senha);
    }
  }, [user]);

  const updateUserInfo = async () => {
    try {
      setLoading(true);
      // Suponha que você tenha um endpoint para atualizar os dados do usuário
      const response = await fetch('https://mobile-group-project-api-production.up.railway.app/Usuario/atualizar', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id : idUsuario,
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

      if (response.ok) {
        setLoading(false);
        Alert.alert('Sucesso', 'Informações do usuário atualizadas com sucesso!');
        navigation.goBack(); // Volta para a tela anterior
      } else {
        throw new Error('Erro ao atualizar as informações');
      }
    } catch (error) {
      setLoading(false);
      Alert.alert('Erro', 'Houve um erro ao atualizar as informações do usuário.');
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }


  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
      <Text style={styles.title}>Editar Informações do Usuário</Text>
      <Image source={{ uri: user.foto }} style={styles.image} />
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
      <Button title="Salvar" onPress={updateUserInfo} />
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 20,
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
});
