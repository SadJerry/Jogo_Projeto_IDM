import { useState, useEffect } from 'react'
import React from 'react'
import { ImageBackground, Text, View, StyleSheet, TouchableOpacity, Button } from 'react-native'

const GameColumn = ({ col, idx, onPress }) => {
  return (
    <TouchableOpacity style={styles.column} key={`col-${idx}`} onPress={onPress}>
      {col.map((cell, x) => {
        return (
          <View style={styles.cell} key={`cell-${idx}-${x}`}>
            <Text>{cell}</Text>
          </View>
        )
      })}
    </TouchableOpacity>
  )
}

Y_PLAYER = "🟡"
R_PLAYER = "🔴"

const Jogo = () => {
  const [winners, setWinners] = useState([])

  let initial = []
  for (var col = 0; col < 7; col++) {
    initial.push([null, null, null, null, null, null])
  }
  const [gameState, setGameState] = useState(initial)
  const [winner, setWinner] = useState(null)
  const [currentPlayer, setCurrentPlayer] = useState(R_PLAYER)

  const gameOver = (gameState, currentPlayer) => {
    let column
      //coluna
      for(var c = 0; c < 7; c++){
        for(var r = 0; r < 6 - 3; r++){
          if(gameState[c][r] != null &&
            gameState[c][r] == gameState[c][r + 1] &&
            gameState[c][r + 1] == gameState[c][r + 2] &&
            gameState[c][r + 2] == gameState[c][r + 3]){
              return true
            }
        }
      }
      //linha
      for(var c = 0; c < 7 - 3; c++){
        for(var r = 0; r < 6; r++){
          if(gameState[c][r] != null &&
            gameState[c][r] == gameState[c + 1][r] &&
            gameState[c + 1][r] == gameState[c + 2][r] &&
            gameState[c + 2][r] == gameState[c + 3][r]){
              return true
            }
        }
      }
      //diagonal up direita
      for(var c = 0; c < 7; c++){
        for(var r = 0; r < 6; r++){
          if(gameState[c][r] != null &&
            gameState[c][r] == gameState[c + 1][r + 1] &&
            gameState[c + 1][r + 1] == gameState[c + 2][r + 2] &&
            gameState[c + 2][r + 2] == gameState[c + 3][r + 3]){
              return true
            }
        }
      }
      //diagonal down direita
      for(var c = 0; c < 7; c++){
        for(var r = 5; r >= 3; r--){
          if(gameState[c][r] != null &&
            gameState[c][r] == gameState[c + 1][r - 1] &&
            gameState[c + 1][r - 1] == gameState[c + 2][r - 2] &&
            gameState[c + 2][r - 2] == gameState[c + 3][r - 3]){
              return true
            }
        }
      }
      return false
  };

  useEffect(() => {
    if (gameOver(gameState, currentPlayer)) {
      setWinner(currentPlayer)
      alert("Fim do jogo. " + currentPlayer + " é o vencedor!")
    }
  }, [gameState, currentPlayer])

  const addPiece = (columnIdx) => {
    const column = [...gameState[columnIdx]]
    const piecePos = column.indexOf(null)
    if (piecePos !== -1) {
      column[piecePos] = currentPlayer
      setGameState((prevState) => {
        const newState = [...prevState]
        newState[columnIdx] = column

        if (gameOver(newState, currentPlayer)) {
          setWinner(currentPlayer)
        } else {
          setCurrentPlayer(currentPlayer === R_PLAYER ? Y_PLAYER : R_PLAYER)
        }

        return newState
      })
    }
  }

  const handlePlayAgain = () => {
    setGameState(initial)
    setWinner(null)
    setCurrentPlayer(R_PLAYER)
    if (winner) {
      setWinners((prevWinners) => [...prevWinners, winner])
    }
  }

  const WinnerList = ({ winners }) => {
    return (
      <View style={styles.winnerList}>
        <Text style={styles.playText}>Historico de Vencedores:</Text>
        {winners.map((winner, index) => (
          <Text key={index}>{winner}</Text>
        ))}
      </View>
    )
  }

  if (winner) {
    return (
      <>
        <ImageBackground source={require('./imagem_de_fundo.jpg')} style={styles.background}>
          <Text style={styles.playText}>{winner} is the winner</Text>
          <Button title='PLAY AGAIN' onPress={handlePlayAgain} color='white' />
          <WinnerList style={styles.playText} winners={winners} />
        </ImageBackground>
      </>
    )
  } else {
    return (
      <>
        <ImageBackground source={require('./imagem_de_fundo.jpg')} style={styles.background}>
          <Text style={styles.playText}>Let's Play</Text>
          <View style={styles.board}>
            {gameState.map((col, x) => {
              return <GameColumn col={col} idx={x} onPress={() => addPiece(x)} />;
            })}
          </View>
        </ImageBackground>
      </>
    )
  }  
}

const styles = StyleSheet.create({
  column: {
    display: 'flex',
    borderWidth: 1,
    borderColor: 'blue',
    padding: 10,
    flexGrow: 1,
    flexDirection: 'column-reverse'
  },
  cell: {
    display: 'flex',
    flexGrow: 1,
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  board: {
    display: 'flex',
    flexDirection: 'row',
  },
  playText: {
    fontSize: 30,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
  winnerList: {
    marginTop: 20,
    alignItems: 'center',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Jogo