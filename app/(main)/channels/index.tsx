import { MessageCircle } from '@tamagui/lucide-icons'
import { Link } from 'expo-router'
import { Separator, Stack, Text, XStack, YStack } from 'tamagui'

export default function Page() {
  return (
    <XStack flex={1} flexWrap="wrap">
      <YStack width={80} paddingHorizontal={8}>
        <Stack>
          <Link href="#">
            <Stack
              backgroundColor={'#18181b'}
              flex={1}
              width={'64px'}
              height={'64px'}
              borderRadius={8}
              alignItems="center"
              justifyContent="center"
            >
              <Text color={'#fff'}>DM</Text>
            </Stack>
          </Link>
        </Stack>
        <Separator marginVertical={8} />
      </YStack>
      <YStack
        flex={1}
        borderTopLeftRadius={8}
        backgroundColor={'#18181b'}
      ></YStack>
    </XStack>
  )
}
