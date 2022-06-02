import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
//   import QuestionButton from '../components/QuestionButton'
import QuestionItem from '../components/QuestionButton'
import axios from 'axios'

const QuizScreen = ({ navigation, route }) => {
  const [theResult, setResult] = useState([])
  const [questions, setQuestions] = useState([])
  const [nextQuestion, setNextQuestion] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [userAnswers] = useState([])

  const type = route.params.paramSecond
  const amount = route.params.paramKey

  const getData = async () => {
    let tempQuestionsArr = []
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=${amount}&category=${type}&type=multiple`
    )
    setResult(data)

    let questionId = 0

    data.results.forEach((question) => {
      let answers = []

      //CORRECT
      const correct_answer = { title: question.correct_answer, isCorrect: true }
      answers.push(correct_answer)

      //   INCORRECT
      question.incorrect_answers.forEach((item) => {
        const incorrect_answer = { title: item, isCorrect: false }
        answers.push(incorrect_answer)
      })

      const formatted_question = {
        id: questionId++,
        title: question.question,
        type: question.type,
        category: question.category,
        difficulty: question.difficulty,
        answers: shuffle(answers)
      }
      tempQuestionsArr.push(formatted_question)
    })
    setQuestions(tempQuestionsArr)
  }
  useEffect(() => {
    getData()
  }, [])

  const shuffle = (arr) => {
    let currentIndex = arr.length,
      randomIndex
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--
      ;[arr[currentIndex], arr[randomIndex]] = [
        arr[randomIndex],
        arr[currentIndex]
      ]
    }
    return arr
  }

  const onNextQuestion = () => {
    let number = currentQuestion
    number++
    setCurrentQuestion(number)
    let nextQuest = questions[currentQuestion].id
    setNextQuestion(nextQuest)
    if (number === amount || number === theResult.results.length) {
      let copyArr = [...userAnswers]
      console.log('Data log before navigation: ' + copyArr)
      navigation.navigate('Result', {
        paramKey: score,
        paramSecond: amount,
        paramAnswers: copyArr
      })
    }
  }

  const onAnswer = (answer) => {
    if (answer.isCorrect === true) {
      setScore(score + 1)
      console.log('user score is now: ' + score)
    }
    console.log(JSON.stringify(answer))
    userAnswers.push(answer)
    console.log('User answers are :' + JSON.stringify(userAnswers))
  }

  const questionsUI = questions.map((question, index) => {
    if (nextQuestion === question.id) {
      return (
        <QuestionItem
          key={index}
          questionItem={question}
          onNextQuestion={onNextQuestion}
          onAnswer={onAnswer}
        />
      )
    }
  })

  return (
    <View style={styles.container}>
      {questions.length > 0 ? (
        questionsUI
      ) : (
        <View>
          <Text>Loading questions</Text>
        </View>
      )}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddf0f7',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50
  },
  activityContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80
  }
})

export default QuizScreen
