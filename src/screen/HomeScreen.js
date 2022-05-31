import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import CustomButton from '../components/CustomButton'
import CustomInput from '../components/CustomInput'
import { SafeAreaView } from 'react-native-safe-area-context'
import DropDownPicker from 'react-native-dropdown-picker'

const HomeScreen = ({ navigation }) => {
  const [text, onTextChange] = useState('')
  const [categories, setCategoris] = useState(0)
  const [apiResult, setResult] = useState([])

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(null)
  const [items, setItems] = useState([
    { label: 'General Knowledge', value: 9 },
    { label: 'Entertainment: Books', value: 10 },
    { label: 'Entertainment: Film', value: 11 },
    { label: 'Entertainment: Music', value: 12 },
    { label: 'Entertainment: Musicals & Theatres', value: 13 },
    { label: 'Entertainment: Television', value: 14 },
    { label: 'Entertainment: Video Games', value: 15 },
    { label: 'Entertainment: Board Games', value: 16 },
    { label: 'Science & Nature', value: 17 },
    { label: 'Science & Computers', value: 18 },
    { label: 'Science: Mathematics', value: 19 },
    { label: 'Mythology', value: 20 },
    { label: 'Sports', value: 21 },
    { label: 'Geography', value: 22 },
    { label: 'History', value: 23 },
    { label: 'Politics', value: 24 },
    { label: 'Art', value: 25 },
    { label: 'Celebrities', value: 26 },
    { label: 'Animals', value: 27 },
    { label: 'Vehicles', value: 28 },
    { label: 'Entertainment: Comics', value: 29 },
    { label: 'Science: Gadgets', value: 30 },
    { label: 'Entertainment: Japanese Anime & Manga', value: 31 },
    { label: 'Entertainment: Cartoon & Animations', value: 32 }
  ])

  return (
    <SafeAreaView>
      <Text style={styles.h1}>Choose Category</Text>

      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        onPress={setTheCategory(value)}
      />

      {/* <View style={styles.dropDownView}>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          onPress={setTheCategory(value)}
        />
      </View> */}

      <View style={{ padding: 10 }}>
        <Text style={styles.h1}>Choose Amount</Text>
        <CustomInput
          placeholder="Enter amount of questions"
          value={text}
          onChangeText={onTextChange}
        />
      </View>

      <View style={styles.buttonView}>
        <CustomButton title="Start Quiz" onPress={startQuiz} />
      </View>
    </SafeAreaView>
  )
  function setTheCategory(item) {
    console.log(item)
    useEffect(() => {
      setCategoris(item)
    })
  }

  function startQuiz() {
    navigation.navigate('Quiz', {
      paramKey: text,
      paramSecond: categories
    })
  }
}

export default HomeScreen

const styles = StyleSheet.create({
  h1: {
    fontFamily: 'extraBoldItalic',
    fontSize: 25,
    textAlign: 'center',
    padding: 15
  },
  dropDownView: {
    padding: 10
  },
  buttonView: {
    padding: 10
  }
})
