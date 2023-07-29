import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

const Tile = ({ onPress, isPressed }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={isPressed ? styles.tilePressed : styles.tile}
        onPress={onPress}
      >
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  tile: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 75,
    height: 75,
  },
  tilePressed: {
    alignItems: 'center',
    backgroundColor: '#0000FF',
    padding: 10,
    width: 75,
    height: 75,
  },
})

export default Tile