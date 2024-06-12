import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Linking, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function ConfirmationPage() {
  const navigation = useNavigation();
  const route = useRoute();
  const { currentLocation, destinationLocation } = route.params || {};

  const handleMapPress = () => {
    if (currentLocation && destinationLocation) {
      navigation.navigate('MapPage', {
        currentLocation,
        destinationLocation,
      });
    } else {
      alert('Informações de localização estão faltando.');
    }
  };

    if (!currentLocation || !destinationLocation) {
    return <Text>Dados de localização estão faltando.</Text>;
  }

  const homepage = () => {
    navigation.navigate('HomePage');
  };

  const handleWhatsAppPress = () => {
    Linking.canOpenURL('https://wa.me/+558184371475')
      .then((supported) => {
        if (supported) {
          Linking.openURL('https://wa.me/+558184371475');
        } else {
          alert('WhatsApp não está instalado em seu dispositivo.');
        }
      })
      .catch((err) => console.error('Erro ao abrir WhatsApp:', err));
  };

  return (
    <View style={styles.container}>
      <Image style={styles.confirmacaoImg} source={require('../assets/confirmacao.png')} />
      <Text style={styles.text}>
        O seu pedido de carona foi mandado para o motorista, por favor aguarde a resposta da confirmação!
      </Text>
      <Text style={[styles.text, { marginBottom: 30 }]}>
        Caso queira, pode entrar em contato com o motorista pelas seguintes formas:
      </Text>

      <TouchableOpacity style={styles.containerEmail} /*onPress={handleMapPress}*/>
        <Image style={styles.imgRef} source={require('../assets/mapa.png')} />
        <Text style={styles.fontBotao}>Mapa</Text>
        <Image style={styles.imgRef} source={require('../assets/proxima.png')} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.containerEmail} onPress={handleWhatsAppPress}>
        <Image style={styles.imgRef} source={require('../assets/chat1.png')} />
        <Text style={styles.fontBotao}>Via WhatsApp</Text>
        <Image style={styles.imgRef} source={require('../assets/proxima.png')} />
      </TouchableOpacity>

      <Button title="Voltar para home" onPress={homepage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  confirmacaoImg: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  containerEmail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  imgRef: {
    width: 24,
    height: 24,
    marginHorizontal: 10,
  },
  fontBotao: {
    fontSize: 16,
    flex: 1,
  },
});
