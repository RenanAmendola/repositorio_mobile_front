import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthProvider } from './AuthContext';
import { Image } from 'react-native';

import LoginPage from './paginas/login';
import RegisterPage from './paginas/cadastro';
import Homepage from './paginas/Homepage';
import Historico from './paginas/Historico';
import Motorista from './paginas/Motorista';
import ConfirmationPage from './paginas/Confirmcao';
import CarroCadastro from './paginas/cadastro_carro';
import RotaCadastro from './paginas/cadastro_rota';
import RotaPagina from './paginas/rotas_pagina';
import EditarUsuario from './paginas/editar_usuario';
import MapPage from './MapPage';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? require('./assets/casa.png') : require('./assets/casa.png');
          } else if (route.name === 'Perfil') {
            iconName = focused ? require('./assets/motorista.png') : require('./assets/motorista.png');
          } else if (route.name === 'Historico') {
            iconName = focused ? require('./assets/historico.png') : require('./assets/historico.png');
          }

          return <Image source={iconName} style={{ width: 24, height: 24 }} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#228B22',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={Homepage} />
      <Tab.Screen name="Perfil" component={Motorista} />
      <Tab.Screen name="Historico" component={Historico} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginPage">
        <Stack.Screen name="LoginPage" component={LoginPage} options={{ title: 'Login' }} />
        <Stack.Screen name="RegisterPage" component={RegisterPage} options={{ title: 'Cadastro' }} />
        <Stack.Screen name="EditarUsuario" component={EditarUsuario} options={{ title: 'Editar usuario' }} />
        <Stack.Screen name="CarroCadastro" component={CarroCadastro} options={{ title: 'Cadastro de carro' }} />
        <Stack.Screen name="RotaCadastro" component={RotaCadastro} options={{ title: 'Cadastro de rota' }} />
        <Stack.Screen name="RotaPagina" component={RotaPagina} options={{ title: 'Buscar rotas' }} />
        <Stack.Screen name="HomePage" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="ConfirmationPage" component={ConfirmationPage} options={{ title: 'Confirmação' }} />
        <Stack.Screen name="MapPage" component={MapPage} options={{ title: 'Mapa' }} />
      </Stack.Navigator>
    </NavigationContainer>
    </AuthProvider>
  );
}
