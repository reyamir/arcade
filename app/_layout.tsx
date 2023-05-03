import { Slot, SplashScreen } from 'expo-router'
import { useCachedResources } from 'lib/hooks'
import { StatusBar, View } from 'react-native'

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
    <View style={{ flex: 1, backgroundColor: '#030712', overflow: 'hidden' }}>
      <Slot />
    </View>
  )
}
