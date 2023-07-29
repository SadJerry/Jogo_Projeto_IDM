import React from 'react'
import { ImageBackground, StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const Home = () => {
  const navigation = useNavigation()

  return (
    <ImageBackground source={require('./imagem_de_fundo.jpg')} style={styles.background}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('Jogo')}>
          <Text style={styles.buttonText}>Jogo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('Game')}>
          <Text style={styles.buttonText}>Speed Game</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'blue',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  buttonText: {
    fontSize: 40,
    textAlign: 'center',
    padding: 10,
  },
})

export default Home
