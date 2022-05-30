import { View, TextInput, StyleSheet } from 'react-native'
import React from 'react'

const CustomInput = (props) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={props.placeholder}
        onChangeText={props.onChangeText}
        value={props.value}
        keyboardType="default"
      />
    </View>
  )
}

export default CustomInput

const styles = StyleSheet.create({
  input: {
    minWidth: 200,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#3b4053',
    backgroundColor: 'whitesmoke',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10
  }
})
