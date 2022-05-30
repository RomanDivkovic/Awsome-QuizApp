//Navigators and containers
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
//Screens
import HomeScreen from './src/screen/HomeScreen'
import SplashScreen from './src/screen/SplashScreen'
import RegisterScreen from './src/screen/RegisterScreen'
import LoginScreen from './src/screen/LogInScreen'
import ProfileScreen from './src/screen/ProfileScreen'
import QuizScreen from './src/screen/QuizScreen'
import ResultScreen from './src/screen/ResultScreen'

// Fonts and icons for the app
import { Ionicons } from '@expo/vector-icons'
import { useFonts } from 'expo-font'

export default function App() {
  const Tab = createBottomTabNavigator()
  const Stack = createStackNavigator()

  const [loaded] = useFonts({
    boldItalic: require('./src/fonts/MontserratAlternates-BoldItalic.ttf'),
    extraBoldItalic: require('./src/fonts/MontserratAlternates-ExtraBoldItalic.ttf'),
    mediumItalic: require('./src/fonts/MontserratAlternates-MediumItalic.ttf'),
    semiBoldItalic: require('./src/fonts/MontserratAlternates-SemiBoldItalic.ttf'),
    italic: require('./src/fonts/MontserratAlternates-Italic.ttf'),
    medium: require('./src/fonts/MontserratAlternates-Medium.ttf')
  })

  if (!loaded) {
    return null
  }

  ;<Ionicons name="game-controller-outline" size={24} color="black" />
  function HomeTabs() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName
            if (route.name === 'Profile') {
              iconName = focused ? 'ios-person' : 'ios-person-outline'
            } else if (route.name === 'Home') {
              iconName = focused
                ? 'ios-game-controller'
                : 'ios-game-controller-outline'
            }

            return <Ionicons name={iconName} size={size} color={color} />
          },
          tabBarActiveTintColor: 'purple',
          tabBarInactiveTintColor: 'gray'
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="HomeTabs"
          component={HomeTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          // options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Quiz"
          component={QuizScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Result"
          component={ResultScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
