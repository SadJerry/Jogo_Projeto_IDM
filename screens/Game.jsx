import React, { useState, useEffect, useRef } from 'react'
import { ImageBackground, View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native'
import Tile from './Tile'

const ROWS = 7
const COLUMNS = 4

const Game = () => {
  const [tilesPressed, setTilesPressed] = useState(Array(ROWS * COLUMNS).fill(false))
  const [gameStarted, setGameStarted] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [recordTime, setRecordTime] = useState(null)
  const [gameOver, setGameOver] = useState(false)

  const timerRef = useRef(null)
  const startTimeRef = useRef(null)

  
  useEffect(() => {
    if (gameStarted && !timerRef.current) {
      startTimeRef.current = Date.now() - timeElapsed
      timerRef.current = setInterval(updateTimeElapsed, 10)
    } else if (!gameStarted && timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    return () => clearInterval(timerRef.current)
  }, [gameStarted])

  useEffect(() => {
    if (!tilesPressed.some((pressed) => !pressed) && !gameOver) {
      setGameOver(true)
      handleGameOver()
    }
  }, [tilesPressed, gameOver])

  const updateTimeElapsed = () => {
    setTimeElapsed(Date.now() - startTimeRef.current)
  };

  const handleTilePress = (index) => {
    if (!gameStarted) {
      setGameStarted(true)
    }

    if (!tilesPressed[index]) {
      const newTilesPressed = [...tilesPressed]
      newTilesPressed[index] = true
      setTilesPressed(newTilesPressed)
    }
  };

  const handleGameOver = () => {
    const formattedTime = formatTime(timeElapsed)
    if (!recordTime || timeElapsed < recordTime) {
      setRecordTime(timeElapsed)
    }
    Alert.alert(
      'Fim do jogo',
      `Você completou em ${formattedTime}${recordTime ? ` e estabeleceu um novo recorde de ${formatTime(recordTime)}!` : '.'}`,
      [{ text: 'Reiniciar', onPress: handleRestart }],
      { cancelable: false }
    );
  };

  const handleRestart = () => {
    setTilesPressed(Array(ROWS * COLUMNS).fill(false))
    setGameStarted(false)
    setTimeElapsed(0)
    setGameOver(false)
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000)
    const seconds = Math.floor((time % 60000) / 1000)
    const milliseconds = Math.floor((time % 1000) / 10)
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`
  }

  return (
    <ImageBackground source={require('./imagem_de_fundo.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text>Time elapsed: {formatTime(timeElapsed)}</Text>
        <View style={styles.grid}>
          {[...Array(ROWS)].map((_, row) => (
            <View key={`row-${row}`} style={styles.row}>
              {[...Array(COLUMNS)].map((_, col) => {
                const index = row * COLUMNS + col;
                return (
                  <Tile
                    key={`tile-${index}`}
                    onPress={() => handleTilePress(index)}
                    isPressed={tilesPressed[index]}
                  />
                );
              })}
            </View>
          ))}
        </View>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Game
