import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../components/CustomButton'

const ResultScreen = ({ navigation, route }) => {
  const result = route.params.paramKey
  const total = route.params.paramSecond

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.h1}>ResultScreen</Text>
      </View>
      <View>
        <Text>
          You had {result} out of {total}
        </Text>
      </View>
      <View style={styles.buttonView}>
        <CustomButton
          title="Go to quiz"
          onPress={() => navigation.navigate('Quiz')}
        />
      </View>
    </SafeAreaView>
  )
}

export default ResultScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 2
  },
  h1: {
    // textAlign: 'center',
    fontFamily: 'boldItalic',
    fontSize: 20,
    padding: 10
  },
  buttonView: {
    width: '60%',
    padding: 15
  }
})
