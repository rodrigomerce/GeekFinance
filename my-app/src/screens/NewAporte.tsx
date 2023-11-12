import {
  Alert,
  Button,
  FlatList,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { BackButton } from '../components/BackButton'
import React, { useState } from 'react'
import { api } from '../lib/axios'
import { Footer } from '../components/Footer'
import { TextInputMask } from 'react-native-masked-text'

export function NewAporte() {
  //Alert.alert('a','criar conta')
  const { navigate } = useNavigation()
  const [nomeativo, setNomeativo] = useState('')
  const [valorativo, setValorativo] = useState('')
  const [observacao, setObservacao] = useState('')
  const [selected, setSelected] = useState('')

  const data = [
    { key: '1', value: '--' },
    { key: '2', value: 'CDB' },
    { key: '3', value: 'LCI/LCA' },
    { key: '4', value: 'IPCA' }
    /*{ key: '4', value: 'Computers', disabled: true },
    { key: '5', value: 'Vegetables' },
    { key: '6', value: 'Diary Products' },
    { key: '7', value: 'Drinks' }*/
  ]

  async function fetchData() {
    try {
      console.log(nomeativo, valorativo, selected, observacao)
      const response = await api.post(`/cadastroAtivo`, {
        nome: nomeativo,
        valor: valorativo.toString(),
        tp_investimento: selected.toString(),
        observacao: observacao
      })

      Alert.alert('Novo Ativo', 'Ativo cadastrado com sucesso!')

      console.log(response.data)
      if (response.data) {
        console.log('cadastrado ok')
      } else {
        console.log('Login não autorizado')
      }
    } catch (error) {
      Alert.alert(
        'Ops',
        'Ocorreu um erro ao cadastrar seu ativo, tente novamente em alguns minutos.'
      )
      console.log(error)
    } finally {
      setNomeativo('')
      setValorativo('')
    }
  }

  return (
    <View className="flex-1 bg-white  px-8 pt-10  pl-0 pr-0">
      <BackButton />
      <View className="ml-5 h-50 mb-1">
        <Text className="text-zinc-900 text-3xl font-black mt-3">
          Adicionar ativo
        </Text>
      </View>

      <View className="flex-1 h-100">
        <TextInput
          placeholder="  Ativo"
          className="bg-zinc-300 h-12 rounded-md mx-5 my-5"
          onChangeText={setNomeativo}
          value={nomeativo}
        />

        <View className="flex-row justify-between">
          <TextInputMask
            type={'money'}
            placeholder="  Valor"
            keyboardType="numeric"
            className="bg-zinc-300 h-12 rounded-md ml-5 w-40 my-5"
            onChangeText={value => {
              value = value.replace('R$', '')
              value = value.replace('.', '')
              value = value.replace(',', '.')
              setValorativo(value)
            }}
            value={valorativo}
          />

          <SelectList
            setSelected={val => setSelected(val)}
            data={data}
            save="value"
            boxStyles={{
              width: 200,
              marginRight: 20,
              backgroundColor: 'white',
              marginTop: 20,
              zIndex: 1,
              height: 50
            }}
            dropdownStyles={{
              backgroundColor: 'white',
              width: 200,
              position: 'absolute', // Define a posição como absoluta
              zIndex: 1,
              marginTop: 20
            }}
            dropdownItemStyles={{ marginHorizontal: 10 }}
            dropdownTextStyles={{ color: 'black' }}
          />
        </View>

        <TextInput
          placeholder="  Observação"
          className="bg-zinc-300 h-12 rounded-md mx-5 my-5"
          onChangeText={setObservacao}
          value={observacao}
        />

        <TouchableOpacity
          className="items-center my-5 mx-16 mb-16 bg-blue-500 h-14 rounded-xl"
          onPress={() => fetchData()}
        >
          <Text className="text-white font-black text-xl my-3">Salvar</Text>
        </TouchableOpacity>
      </View>

      <Footer />
    </View>
  )
}
