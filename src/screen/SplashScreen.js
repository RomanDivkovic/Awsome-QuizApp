// Import React and Component
import React, { useState, useEffect } from 'react'
import { SafeAreaView, ActivityIndicator, View, StyleSheet } from 'react-native'

import { auth } from '../../firebase'

export default function SplashScreen({ navigation }) {
  const [animating, setAnimating] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false)
      // Check if currentUser is set or not
      // If not then send for Authentication
      // else send to Home Screen
      navigation.replace(auth.currentUser ? 'HomeTabs' : 'Login')
    }, 5000)
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ActivityIndicator
          animating={animating}
          color="#FFFFFF"
          size="large"
          style={styles.activityIndicator}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80
  }
})
