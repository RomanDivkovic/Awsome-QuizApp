import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Alert
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { auth } from '../../firebase'
import CustomButton from '../components/CustomButton'

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState()

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged((user) => {
      console.log('user', JSON.stringify(user))
      setUser(user)
    })
    return subscriber
  }, [])

  function handleSignOut() {
    auth
      .signOut()
      .then(() => {
        navigation.navigate('Login')
      })
      .catch((error) => alert(error.message))
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.fistView}>
        {user ? (
          <Text>
            Welcome {user.displayName ? user.displayName : user.email}
          </Text>
        ) : null}
        <Text>Test</Text>
        <View style={styles.viewStyle}>
          <Text>Profile</Text>
        </View>
        <CustomButton title="Log out" onPress={handleSignOut} />
      </View>
    </SafeAreaView>
  )
}
// const logout = ({ navigation }) => {
//   Alert.alert(
//     'Logout',
//     'Are you sure? You want to logout?',
//     [
//       {
//         text: 'Cancel',
//         onPress: () => {
//           return null
//         }
//       },
//       {
//         text: 'Confirm',
//         onPress: () => {
//           auth
//             .signOut()
//             .then(() => navigation.replace('Login'))
//             .catch((error) => {
//               console.log(error)
//               if (error.code === 'auth/no-current-user')
//                 navigation.replace('Auth')
//               else alert(error)
//             })
//         }
//       }
//     ],
//     { cancelable: false }
//   )
// }

export default ProfileScreen

const styles = StyleSheet.create({
  fistView: {
    flex: 1,
    padding: 16
  },
  safe: {
    flex: 1
  },
  textStyle: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 16
  },
  viewStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonStyle: {
    minWidth: 300,
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16
  }
})
