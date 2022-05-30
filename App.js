import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
//Navigation
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
//Screens
import HomeScreen from './src/screen/HomeScreen'
import SplashScreen from './src/screen/SplashScreen'
import RegisterScreen from './src/screen/RegisterScreen'
import LoginScreen from './src/screen/LogInScreen'
import ProfileScreen from './src/screen/ProfileScreen'

// Fonts and icons for the app
import { Ionicons } from '@expo/vector-icons'
import { useFonts } from 'expo-font'

export default function App() {
  const Tab = createBottomTabNavigator()
  const Stack = createStackNavigator()

  const [loaded] = useFonts({
    Montserrat1: require('./src/fonts/MontserratAlternates-BoldItalic.ttf'),
    Montserrat2: require('./src/fonts/MontserratAlternates-ExtraBoldItalic.ttf'),
    Montserrat3: require('./src/fonts/MontserratAlternates-MediumItalic.ttf'),
    Montserrat4: require('./src/fonts/MontserratAlternates-BoldItalic.ttf'),
    Montserrat5: require('./src/fonts/MontserratAlternates-SemiBoldItalic.ttf'),
    Montserrat6: require('./src/fonts/MontserratAlternates-Italic.ttf'),
    Montserrat7: require('./src/fonts/MontserratAlternates-Medium.ttf')
  })

  if (!loaded) {
    return null
  }
  function HomeTabs() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName

            if (route.name === 'Profile') {
              iconName = focused ? 'ios-person' : 'ios-person-outline'
            } else if (route.name === 'Quiz') {
              iconName = focused ? 'ios-list' : 'ios-list-outline'
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
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen
        name="Result"
        component={ResultScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Change"
        component={changePassword}
        options={{ headerShown: false }}
      /> */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
