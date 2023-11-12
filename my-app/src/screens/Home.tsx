import {
  View,
  Text,
  ScrollView,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Alert
} from 'react-native'
import { WebView } from 'react-native-webview'
import { Feather } from '@expo/vector-icons'

import { Header } from '../components/Header'
import React, { useCallback, useState } from 'react'
import { Footer } from '../components/Footer'
import { BackButton } from '../components/BackButton'
import colors from 'tailwindcss/colors'
import { LineC } from '../components/LineChart'
import axios from 'axios'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Loading } from '../components/Loading'
import { api } from '../lib/axios'
import dayjs from 'dayjs'

export function Home() {
  const { navigate } = useNavigation<NativeStackNavigationProp<any>>()
  const [showWerbView, setShowWebView] = useState(false)

  const handleShowWebView = () => {
    setShowWebView(true)
  }

  const handleCloseShowWebView = () => {
    setShowWebView(false)
  }
  const [loading, setLoading] = useState(true)

  const [tipoGrafico, setTipoGrafico] = useState('line')

  const [noticias, setnoticias] = useState('')

  const [valor, setValor] = useState<Number>(150.0)

  const [valorOculto, setOcultaValor] = useState()

  const [iconeEye, setIconeEye] = useState('eye')

  const [fetchDataChamado, setFetchDataChamado] = useState(false)

  function ocultaValor() {
    let senhaOculta = valor
    if (iconeEye === 'eye-off') {
      senhaOculta = '*'.repeat(5)
      setIconeEye('eye')
    } else {
      setIconeEye('eye-off')
    }
    setOcultaValor(senhaOculta)
  }

  async function fetchData() {
    try {
      setLoading(true)
      const response = await axios.get(
        'https://newsapi.org/v2/top-headlines?sources=google-news-br&apiKey=436d96e8d965465c856e236f7baca56b'
      )
      let noticia = ''
      if (response.data.articles) {
        response.data.articles.forEach((article, index) => {
          // console.log(`Título do artigo ${index + 1}: ${article.title}`)

          noticia =
            noticia + `Título do artigo ${index + 1}: ${article.title}\n\n`
          setnoticias(noticia)
        })
      } else {
        console.log('Nenhum artigo encontrado na resposta.')
      }
    } catch (error) {
      Alert.alert('Ops', 'Não foi possível carregar api.')
      console.log(error)
    } finally {
      //setLoading(false)
    }
  }

  async function fetchData2() {
    try {
      setLoading(true)
      const response = await api.get('/buscaAtivos')

      //const dataF = dayjs(response.data[0].created_at)
      // console.log(response.data)
      // dayjs.locale('pt-br')

      dayjs.locale('pt-br')
      const valorAcumulado = response.data.map(dado => dado.a_valor)
      console.log(valorAcumulado)
      const soma = valorAcumulado.reduce(
        (acc, valor) => acc + parseFloat(valor),
        0
      )
      console.log('valor - >' + soma.toFixed(2))

      setValor(
        soma.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })
      )
    } catch (error) {
      Alert.alert('Ops', 'Não foi possível carregar o sumário de hábitos.')
      console.log(error)
    } finally {
      setLoading(false)
      ocultaValor()
    }
  }

  useFocusEffect(
    useCallback(() => {
      if (!fetchDataChamado) {
        fetchData()

        setFetchDataChamado(true)
      }
      fetchData2()
    }, [fetchDataChamado])
  )

  if (loading) {
    return <Loading />
  }

  return (
    <View className="flex-1 bg-zinc-900 px-8 pt-10  pl-0 pr-0">
      <View className="flex-row mt-0 mb-2">
        <Header />
      </View>
      <View className="mx-4 mb-1 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <Text className="text-zinc-100 text-lg mx-2">{valorOculto}</Text>
          <TouchableOpacity onPress={() => ocultaValor()}>
            <Feather
              name={iconeEye as never}
              color={colors.green[500]}
              size={20}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity className="mr-2">
          <Feather name="chevron-right" color={colors.green[500]} size={20} />
        </TouchableOpacity>
      </View>
      <View className="bg-zinc-200 flex-1 flex-row mx-1 px-3 py-6 rounded-sm justify-between">
        <ScrollView horizontal className="bg-zinc-200 flex-row">
          <LineC grafico={tipoGrafico} />
        </ScrollView>

        <View className="px-2 ml-2 bg-zinc-900 rounded-lg">
          <TouchableOpacity
            className="py-7"
            onPress={() => setTipoGrafico('line')}
          >
            <Feather name="bar-chart-2" color={colors.green[500]} size={30} />
          </TouchableOpacity>

          <TouchableOpacity
            className="py-7"
            onPress={() => setTipoGrafico('pier')}
          >
            <Feather name="pie-chart" color={colors.green[500]} size={30} />
          </TouchableOpacity>

          <TouchableOpacity className="py-7">
            <Feather
              name="edit"
              color={colors.green[500]}
              size={30}
              onPress={() => navigate('newaporte')}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View className="bg-zinc-900 mx-1 mt-1 flex-1 rounded-sm">
        <ScrollView horizontal className=" bg-zinc-200 h-1">
          <TouchableOpacity
            className="bg-zinc-200 flex-1 my-1 mx-1 w-28 h-28"
            onPress={() => navigate('relaportes')}
          >
            <View className="bg-zinc-900 flex-1 my-1 mx-1 w-28 rounded-xl justify-center items-center">
              <Feather name="bar-chart-2" color={colors.green[500]} size={30} />
            </View>
            <Text className="text-zinc-900 text-center">Aportes</Text>
          </TouchableOpacity>

          <View className="bg-zinc-200 flex-1 my-1 mx-1 w-28 h-28">
            <View className="bg-zinc-900 flex-1 my-1 mx-1 w-28 rounded-xl justify-center items-center">
              <Feather name="settings" color={colors.green[500]} size={30} />
            </View>
            <Text className="text-zinc-900 text-center">Item 1</Text>
          </View>

          <View className="bg-zinc-200 flex-1 my-1 mx-1  w-28 h-28">
            <View className="bg-zinc-900 flex-1 my-1 mx-1 w-28 rounded-xl justify-center items-center">
              <Feather name="settings" color={colors.green[500]} size={30} />
            </View>
            <Text className="text-zinc-900 text-center">Item 1</Text>
          </View>

          <View className="bg-zinc-200 flex-1 my-1 mx-1  w-28 h-28">
            <View className="bg-zinc-900 flex-1 my-1 mx-1 w-28 rounded-xl justify-center items-center">
              <Feather name="settings" color={colors.green[500]} size={30} />
            </View>
            <Text className="text-zinc-900 text-center">Item 1</Text>
          </View>
        </ScrollView>

        <ScrollView className="bg-zinc-900 flex-1 mt-1 rounded-sm">
          <Text className="text-white text-lg text-center">Notícias</Text>

          <Text className="text-white">{noticias}</Text>
        </ScrollView>
      </View>

      <Footer />
    </View>
  )
}
