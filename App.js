import React from 'react'
import Home from './screens/Home'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Jogo from './screens/Jogo'
import Game from './screens/Game'


const Stack = createStackNavigator()

function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Jogo" component={Jogo} />
          <Stack.Screen name="Game" component={Game} />
        </Stack.Navigator>     
    </NavigationContainer>     
  )
}


export default App
