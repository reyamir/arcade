import { Stack } from 'expo-router/stack'

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        title: 'Channels',
        headerStyle: { backgroundColor: '#030712' },
        headerShadowVisible: false,
        headerTintColor: '#fff',
        contentStyle: {
          backgroundColor: '#030712',
        },
      }}
    />
  )
}
