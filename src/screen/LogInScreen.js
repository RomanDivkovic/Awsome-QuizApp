import React, { useEffect, useState } from 'react'
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Text,
  TextInput
} from 'react-native'
import { auth } from '../../firebase'
import { useNavigation } from '@react-navigation/native'
import CustomButton from '../components/CustomButton'
import CustomInput from '../components/CustomInput'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate('Profile', user.email)
      }
    })

    return unsubscribe
  }, [])

  function handleSignUp() {
    navigation.navigate('Register')
  }

  function handleLogin() {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user
        console.log('Logged in with:', user.email)
      })
      .catch((error) => alert(error.message))
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <SafeAreaView>
        <Text style={styles.title}>Trivia Quiz App</Text>
        <View style={styles.inputContainer}>
          <View style={styles.myInput}>
            <CustomInput
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.myInput}
              keyboardType="email-address"
            />
          </View>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            secureTextEntry
          />
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton title="Login" onPress={() => handleLogin()} />
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton title="Register" onPress={() => handleSignUp()} />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    width: '80%'
  },
  buttonContainer: {
    // width: '60%',
    padding: 5
  },
  myInput: {
    padding: 15,
    margin: 5
  },
  title: {
    fontFamily: 'extraBoldItalic',
    fontSize: 25,
    textAlign: 'center',
    padding: 10
  },
  input: {
    margin: 10,
    minWidth: 200,
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#3b4053',
    backgroundColor: 'whitesmoke',
    paddingHorizontal: 15,
    paddingVertical: 10
  }
})
