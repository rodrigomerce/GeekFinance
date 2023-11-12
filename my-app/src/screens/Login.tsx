import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import {
  Alert,
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { api } from '../lib/axios'
import { BackButton } from '../components/BackButton'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

export function Login() {
  const { navigate } = useNavigation<NativeStackNavigationProp<any>>()
  const [username, setusername] = useState('')
  const [password, setPassword] = useState('')

  async function fetchData() {
    try {
      const response = await api.get(`/login?user=${username}&pass=${password}`)

      console.log(response.data)
      if (response.data) {
        console.log('Login ok')
        console.log(username)

        navigate('home')
      } else {
        console.log('Login não autorizado')
        setusername('')
        setPassword('')
      }
    } catch (error) {
      Alert.alert('Ops', 'Não foi possível carregar o sumário de hábitos.')
      console.log(error)
    } finally {
    }
  }

  return (
    <View className="flex-1 bg-zinc-900 px-8 pt-16  pl-0 pr-0">
      <View className="items-center h-50 mb-64">
        <Text className="text-white text-4xl font-black">GeekDuck</Text>
      </View>

      <View className="flex-1 h-100">
        <TextInput
          placeholder="  E-mail"
          className="bg-zinc-300 h-12 rounded-md mx-5 my-5 text-center"
          onChangeText={setusername}
          value={username}
        />

        <TextInput
          placeholder="  Password"
          className="bg-zinc-300 h-12 rounded-md mx-5 my-5 text-center"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />

        <View className="flex-row justify-between">
          <TouchableOpacity
            className="my-5 ml-5 mb-16 bg-green-500 h-12 rounded-xl"
            onPress={() => fetchData()}
          >
            <Text className="text-white font-black text-lg my-2 mx-8">
              Login
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="my-5 mr-5 mb-16 bg-blue-500 h-12 rounded-xl"
            onPress={() => navigate('criarconta')}
          >
            <Text className="text-white font-black text-lg my-2 mx-5">
              Criar conta
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
