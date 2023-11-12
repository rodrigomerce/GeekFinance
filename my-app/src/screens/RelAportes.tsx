import { View, TextInput, Text, FlatList, Alert } from 'react-native'
import { BackButton } from '../components/BackButton'
import { Header } from '../components/Header'
import { api } from '../lib/axios'
import { useCallback, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { Loading } from '../components/Loading'
import dayjs from 'dayjs'

export function RelAportes() {
  const [loading, setLoading] = useState(true)
  const [dados, setDados] = useState([])
  async function fetchData() {
    try {
      setLoading(true)
      const response = await api.get('/buscaAtivos')
      setDados(response.data)
      console.log(response.data[0].a_nome, response.data[0].a_valor)
    } catch (error) {
      Alert.alert('Ops', 'Não foi possível carregar o sumário de hábitos.')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchData()
    }, [])
  )

  if (loading) {
    return <Loading />
  }

  return (
    <View className="flex-1 bg-zinc-900 px-8 pt-10  pl-0 pr-0">
      <BackButton />
      <Header />

      <Text className="text-white pl-6 py-3">Extrato de aplicações</Text>
      <View className="flex-1 bg-zinc-200 pt-10 pr-0 items-center">
        {dados.map((_dado, i) => (
          <Text>
            {dayjs(_dado.created_at).format('DD/MM/YYYY')} - {_dado.a_nome} - R$
            {_dado.a_valor} - {_dado.a_tipo}
          </Text>
        ))}
      </View>
    </View>
  )
}
