import { View, TouchableOpacity, Text } from "react-native";
import { Feather } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';
import { useNavigation } from "@react-navigation/native";


import { Cadastro } from '../screens/Cadastro';
import Logo from '../assets/logo.svg';

export function Header() {
  const { navigate } = useNavigation()

  return (
    <View className=" w-full flex-row items-center justify-between">
      <View className="">
       
        <Text className="text-green-500 font-bold text-3xl ml-6">
          GeekDuck
        </Text>
      </View>
      
      <View className="flex-row items-center">
          <TouchableOpacity 
            activeOpacity={0.7}
            className="flex-row h-11 px-1  items-center mr-6" 
            // onPress={() => navigate('cadastro')} 
          >
            <Feather 
            name="plus"
            color={colors.green[500]}
            size={20}
          />

          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            className="flex-row h-11 px-1  items-center mr-6"  
          >
          <Feather 
              name="align-right"
              color={colors.green[500]}
              size={20}
          />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            className="flex-row h-11 px-1  items-center mr-6"  
          >
          <Feather 
              name="settings"
              color={colors.green[500]}
              size={20}
          />
          </TouchableOpacity>
      </View>
    </View>
  )
}