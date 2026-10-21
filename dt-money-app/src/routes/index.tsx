import { NavigationContainer } from '@react-navigation/native'
import { useState } from 'react'
import { PrivateRoutes } from './PrivateRoutes'
import { PublicRoutes } from './PublicRoutes'
import { SystemBars } from 'react-native-edge-to-edge'
import { useAuthContext } from '@/context/auth.context'
import { Loading } from '@/screens/Loading'

const NavigationRoutes = () => {
  const [loading, setLoading] = useState(true)
  const { token, user } = useAuthContext()

  return (
    <NavigationContainer>
      <SystemBars style="light" />
      {loading ? (
        <Loading setLoading={setLoading} />
      ) : !user || !token ? (
        <PublicRoutes />
      ) : (
        <PrivateRoutes />
      )}
    </NavigationContainer>
  )
}

export default NavigationRoutes
