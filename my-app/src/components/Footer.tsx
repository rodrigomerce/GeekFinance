import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import Logo from '../assets/logo.svg'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'

export function Footer() {
  return (
    <View className="bg-zinc-900  w-full flex-row items-center justify-between h-10">
      <TouchableOpacity
        activeOpacity={0.7}
        className="flex-row h-11 px-1  items-center ml-6"
        // onPress={() => navigate('cadastro')}
      >
        <Feather name="plus" color={colors.green[500]} size={20} />
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.7}
        className="flex-row h-11 px-1  items-center"
      >
        <Feather name="align-right" color={colors.green[500]} size={20} />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        className="flex-row h-11 px-1  items-center mr-6"
      >
        <Feather name="settings" color={colors.green[500]} size={20} />
      </TouchableOpacity>
    </View>
  )
}
