import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
//   import QuestionButton from '../components/QuestionButton'
import QuestionItem from '../components/QuestionButton'
import axios from 'axios'

const QuizScreen = ({ navigation, route }) => {
  const [theResult, setResult] = useState([])
  const [questions, setQuestions] = useState([])
  const [nextQuestion, setNextQuestion] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(1)

  const type = route.params.paramSecond
  const amount = route.params.paramKey
  const url = `https://opentdb.com/api.php?amount=${amount}&category=${type}&type=multiple`

  useEffect(async () => {
    let tempQuestionsArr = []
    let myAnswers = []

    // const getAdvice = () => {
    //   axios.get(url).then((response) => {
    //     setResult(response.data)
    //     console.log('axios call log: ' + theResult)

    //     let questionId = 0

    //     theResult.results.forEach((question) => {
    //       // response_data.results.forEach((question) => {
    //       let answers = []

    //       //CORRECT
    //       const correct_answer = {
    //         title: question.correct_answer,
    //         isCorrect: true
    //       }
    //       answers.push(correct_answer)
    //       myAnswers.push(correct_answer)
    //       setScore(score + 1)
    //       //INCORRECT
    //       question.incorrect_answers.forEach((item) => {
    //         const incorrect_answer = { title: item, isCorrect: false }
    //         answers.push(incorrect_answer)
    //         myAnswers.push(incorrect_answer)
    //       })

    //       const formatted_question = {
    //         id: questionId++,
    //         title: question.question,
    //         type: question.type,
    //         category: question.category,
    //         difficulty: question.difficulty,
    //         answers: shuffle(answers)
    //       }
    //       tempQuestionsArr.push(formatted_question)
    //     })
    //     console.log('Log tempArray ' + JSON.stringify(tempQuestionsArr))
    //     setQuestions(tempQuestionsArr)
    //   })
    // }
    // getAdvice()
    const url = `https://opentdb.com/api.php?amount=${amount}&category=${type}&type=multiple`
    const response = await fetch(url, { method: 'get' })
    const result = await response.json()

    setResult(result)

    let questionId = 0

    result.results.forEach((question) => {
      // response_data.results.forEach((question) => {
      let answers = []

      //CORRECT
      const correct_answer = { title: question.correct_answer, isCorrect: true }
      answers.push(correct_answer)
      myAnswers.push(correct_answer)
      setScore(score + 1)
      //INCORRECT
      question.incorrect_answers.forEach((item) => {
        const incorrect_answer = { title: item, isCorrect: false }
        answers.push(incorrect_answer)
        myAnswers.push(incorrect_answer)
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
    // console.log(JSON.stringify(tempQuestionsArr));
    setQuestions(tempQuestionsArr)
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
      navigation.navigate('Result', {
        paramKey: score,
        paramSecond: amount
      })
    }
  }

  const onAnswer = (answer) => {
    console.log(JSON.stringify(answer))
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
      {questions.length > 0 ? questionsUI : <Text>No Questions </Text>}
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
  }
})

export default QuizScreen
