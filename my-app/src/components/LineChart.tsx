import { useCallback, useState } from 'react'
import { Alert, Dimensions, View } from 'react-native'

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from 'react-native-chart-kit'
import { api } from '../lib/axios'
import dayjs from 'dayjs'
import { useFocusEffect } from '@react-navigation/native'
import { Loading } from './Loading'

export function LineC(grafico) {
  const [loading, setLoading] = useState(true)
  const [valor, setValor] = useState([])
  const [meses, setMeses] = useState([])
  const [dados, setDados] = useState([])

  /*const data = [
    dados.map((dado) =>{
      `{
        name: ${dado.a_nome},
        population: ${dado.a_valor},
        color: 'rgba(131, 167, 234, 1)',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15
      },`
    }),
    {
      name: 'Seoul',
      population: 21500000,
      color: 'rgba(131, 167, 234, 1)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15
    },
    {
      name: 'Toronto',
      population: 2800000,
      color: '#F00',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15
    },
    {
      name: 'Beijing',
      population: 527612,
      color: 'red',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15
    },
    {
      name: 'New York',
      population: 8538000,
      color: '#ffffff',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15
    },
    {
      name: 'Moscow',
      population: 11920000,
      color: 'rgb(0, 0, 255)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15
    }
  ]*/

  async function fetchData() {
    try {
      setLoading(true)
      const response = await api.get('/buscaAtivos')

      //const dataF = dayjs(response.data[0].created_at)
      // console.log(response.data)
      // dayjs.locale('pt-br')

      dayjs.locale('pt-br')
      const novosMeses = response.data.map(dado =>
        dayjs(dado.created_at).locale('pt-br').format('MMMM')
      )
      const novosValores = response.data.map(dado => dado.a_valor)
      setMeses([...meses, novosMeses])
      setValor([...valor, novosValores])

      setDados(response.data)
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

  const generateColor = month => {
    // Lógica para mapear o nome do mês para uma cor específica
    // Este é apenas um exemplo, você pode personalizar conforme necessário
    const monthColors = {
      January: 'rgba(75, 192, 192, 1)',
      February: 'rgba(255, 99, 132, 1)',
      March: 'rgba(255, 205, 86, 1)',
      April: 'rgba(54, 162, 235, 1)',
      May: 'rgba(255, 159, 64, 1)',
      June: 'rgba(153, 102, 255, 1)',
      July: 'rgba(255, 140, 0, 1)',
      August: 'rgba(0, 128, 0, 1)',
      September: 'rgba(220, 20, 60, 1)',
      October: 'rgba(0, 0, 128, 1)',
      November: 'rgba(128, 0, 128, 1)',
      December: 'rgba(210, 105, 30, 1)'
      // Adicione mais meses conforme necessário
    }

    return monthColors[month] || 'rgba(131, 167, 234, 1)'
  }

  const data = dados.map(dado => ({
    name: dayjs(dado.created_at).locale('pt-br').format('MMMM'),
    population: parseFloat(dado.a_valor), // Certifique-se de converter para um número
    color: generateColor(dayjs(dado.created_at).locale('pt-br').format('MMMM')),
    legendFontColor: '#7F7F7F',
    legendFontSize: 15
  }))

  console.log(grafico.grafico)
  if (grafico.grafico === 'line') {
    return (
      <View>
        <LineChart
          data={{
            labels: meses[0],
            datasets: [
              {
                data: valor[0]
              }
            ]
          }}
          width={Dimensions.get('window').width + valor[0].length * 25} // from react-native
          height={245}
          yLabelsOffset={-10}
          withDots={true}
          yAxisLabel="R$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#2E8B57',
            backgroundGradientTo: '#2E8B57',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: '1',
              strokeWidth: '1',
              stroke: '#212222'
            }
          }}
          bezier
          style={{
            marginVertical: 1,
            borderRadius: 16
          }}
        />
      </View>
    )
  }
  if (grafico.grafico === 'pier') {
    return (
      <View>
        <PieChart
          data={data}
          width={Dimensions.get('window').width - 60}
          height={250}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#2E8B57',
            backgroundGradientTo: '#2E8B57',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#212222'
            },
            propsForLabels: {
              fill: 'white' // Aqui você define a cor da legenda
            }
          }}
          accessor={'population'}
          backgroundColor={'transparent'}
          paddingLeft={'15'}
          center={[10, 10]}
          absolute
          style={{
            borderRadius: 16
          }}
        />
      </View>
    )
  }
}
