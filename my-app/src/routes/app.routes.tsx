import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer'

//const { Navigato, Scree } = createDrawerNavigator()
const { Navigator, Screen } = createNativeStackNavigator()

import { Home } from '../screens/Home'
import { Cadastro } from '../screens/Cadastro'
import { Login } from '../screens/Login'
import { CriarConta } from '../screens/CriarConta'
import { NewAporte } from '../screens/NewAporte'
import { RelAportes } from '../screens/RelAportes'

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="login" component={Login} />

      <Screen name="home" component={Home} />

      <Screen name="cadastro" component={Cadastro} />

      <Screen name="criarconta" component={CriarConta} />

      <Screen name="newaporte" component={NewAporte} />

      <Screen name="relaportes" component={RelAportes} />
    </Navigator>
  )
}
