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

export function CriarConta() {
  //Alert.alert('a','criar conta')
  const { navigate } = useNavigation()
  const [username, setusername] = useState('')
  const [password, setPassword] = useState('')

  async function fetchData() {
    try {
      //const response = await api.get(`/login?user=${username}&pass=${password}`);

      const response = await api.post(`/cadastro`, {
        user: username,
        pass: password
      })

      Alert.alert('Cadastro', 'Usuário cadastrado com sucesso!')

      console.log(response.status)
      if (response.status === 200) {
        console.log('Login ok')
        navigate('login' as never)
      } else {
        console.log('Login não autorizado')
      }
    } catch (error) {
      Alert.alert('Ops', 'Não foi possível cadastrar.')
      console.log(error)
    } finally {
      setusername('')
      setPassword('')
    }
  }

  return (
    <View className="flex-1 bg-zinc-900 px-8 pt-10  pl-0 pr-0">
      <BackButton />
      <View className="items-center h-50 mb-28">
        <Text className="text-white text-4xl font-black">C A D A S T R O</Text>
      </View>

      <View className="flex-1 h-100">
        <TextInput
          placeholder="  E-mail"
          className="bg-zinc-300 h-16 rounded-md mx-5 my-5"
          onChangeText={setusername}
          value={username}
        />

        <TextInput
          placeholder="  Password"
          className="bg-zinc-300 h-16 rounded-md mx-5 my-5"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />

        <TouchableOpacity
          className="items-center my-5 mx-16 mb-16 bg-blue-500 h-20 rounded-xl"
          onPress={() => fetchData()}
        >
          <Text className="text-white font-black text-xl my-6">Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
