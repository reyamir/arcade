import { Slot, SplashScreen } from 'expo-router'
import { useCachedResources } from 'lib/hooks'
import { StatusBar } from 'react-native'
import { TamaguiProvider, Theme } from 'tamagui'
import { config } from '../tamagui.config'

export default function Layout() {
  const loaded = useCachedResources()

  if (!loaded) {
    return <SplashScreen />
  }

  /*
  return (
    <View style={{ height: '100vh' }}>
      <View
        style={{
          flex: 1,
          height: '100vh',
          width: '100vw',
          position: 'absolute',
          zIndex: 1000,
        }}
      >
        <Slot />
      </View>
      <View
        style={{
          flex: 1,
          height: '100vh',
          width: '100vw',
          position: 'absolute',
          zIndex: 1,
        }}
      >
        <BackgroundCanvas />
      </View>
    </View>
  )
  */

  return (
    <TamaguiProvider config={config}>
      <Theme name="dark">
        <Slot />
      </Theme>
      <StatusBar barStyle="light-content" />
    </TamaguiProvider>
  )
}
