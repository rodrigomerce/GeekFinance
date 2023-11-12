import {Button, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { BackButton } from '../components/BackButton';

export function Cadastro(){
  {console.log('Cadastro')}
  const { navigate } = useNavigation()
  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <BackButton />

      <View className='flex-1 bg-black px-8 pt-16'>
        <Text className='text-zinc-400 text-xl  text-center mx-1'>
          Cadastre os itens
        </Text>

        <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <TextInput className='bg-zinc-400 mt-16'/>
        
      </ScrollView>

        <Button
          title="Gravar"
          //onPress={() => navigate('home')}
        />
      </View>
    </View>
  )
}