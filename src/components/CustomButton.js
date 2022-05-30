// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
import React, { useState } from 'react'
import { View, StyleSheet, Text, Pressable } from 'react-native'

/* My custom button created to use in application where its needed, button has design here and an props to send to other screens and they can add title and onPress */

const CustomButton = (props) => {
  const [pressed, setPressed] = useState(false)
  return (
    <View style={styles.viewBackground}>
      <Pressable
        onPress={props.onPress}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? 'lightgrey' : '#0077b6'
          },
          styles.viewButton
        ]}
      >
        <Text style={styles.buttonText}>{props.title}</Text>
      </Pressable>
    </View>
  )
}

export default CustomButton

// Button design
const styles = StyleSheet.create({
  viewBackground: {
    maxHeight: 50,
    backgroundColor: '#ddf0f7'
  },
  buttonText: {
    fontSize: 24,
    fontFamily: 'Montserrat2',
    color: 'white',
    textAlign: 'center',
    top: 10
  },
  viewButton: {
    minHeight: 50,
    borderRadius: 15,
    margin: 2
  }
})
