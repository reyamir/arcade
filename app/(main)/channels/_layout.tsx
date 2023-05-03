import { Stack } from 'expo-router/stack'

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerTitle: 'Channels',
        headerStyle: { backgroundColor: '#000' },
        headerShadowVisible: false,
        headerTintColor: '#fff',
        contentStyle: { backgroundColor: '#000' },
      }}
    />
  )
}
