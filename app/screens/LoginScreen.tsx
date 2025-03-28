import React, { FC, useContext, useLayoutEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, Pressable, TextStyle, View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Button, Header, RelayContext, Screen, Text, TextField } from "app/components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "app/models"
import { colors, spacing } from "app/theme"
import { EyeIcon, EyeOffIcon } from "lucide-react-native"
import { getPublicKey, nip19 } from "nostr-tools"
import { ArcadeIdentity } from "app/arclib/src"
import { useProfile } from "app/utils/profile"

interface LoginScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Login">> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen() {
  const [nsec, setNsec] = useState("")
  const [secure, setSecure] = useState(true)
  const [loading, setLoading] = useState(false)
  const [steps, setSteps] = useState({ metadata: false, channels: 0, messages: 0 })

  // Pull in one of our MST stores
  const { userStore, channelStore } = useStores()
  const { pool, channelManager, privMessageManager } = useContext(RelayContext)
  const { getProfile, getContacts } = useProfile()

  // Pull in navigation via hook
  const navigation = useNavigation()

  // login
  const login = async () => {
    if (nsec.length < 60) {
      alert("Access key as nsec or hex private key is required")
    } else {
      setLoading(true)
      try {
        let privkey = nsec
        if (privkey.startsWith("nsec1")) {
          privkey = nip19.decode(privkey).data as string
        }
        const pubkey = getPublicKey(privkey)

        const ident = new ArcadeIdentity(privkey)
        pool.ident = ident

        setSteps((prev) => ({ ...prev, metadata: true }))
        const profile = await getProfile(pubkey)
        const contacts = await getContacts(pubkey)

        // fetch joined channels
        const joinedChannels = await userStore.fetchJoinedChannels(channelManager)
        setSteps((prev) => ({ ...prev, metadata: false, channels: joinedChannels.length }))
        // create channel in mst
        for (const channel of joinedChannels) {
          channelStore.create({
            id: channel,
            author: "",
            privkey: "",
            name: "",
            about: "",
            picture: "",
            is_private: false,
          })
        }

        // fetch priv messages
        const privMessages = await userStore.fetchPrivMessages(privMessageManager, contacts)
        setSteps((prev) => ({ ...prev, metadata: false, messages: privMessages.length }))

        // login
        await userStore.loginWithNsec(
          privkey,
          pubkey,
          profile,
          contacts,
          privMessages,
          joinedChannels,
        )
      } catch {
        alert("Invalid key. Did you copy it correctly?")
        setLoading(false)
      }
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          title=""
          titleStyle={{ color: colors.palette.cyan400 }}
          leftIcon="back"
          leftIconColor={colors.palette.cyan400}
          onLeftPress={() => navigation.goBack()}
        />
      ),
    })
  }, [])

  return (
    <Screen
      style={$root}
      safeAreaEdges={["bottom"]}
      preset="scroll"
      contentContainerStyle={$container}
    >
      <View>
        <Text text="Enter access key" preset="subheading" size="xl" style={$title} />
        <View style={$inputGroup}>
          <TextField
            secureTextEntry={secure}
            placeholder="nsec or hex private key"
            placeholderTextColor={colors.palette.cyan500}
            style={$input}
            inputWrapperStyle={$inputWrapper}
            onChangeText={setNsec}
            value={nsec}
            autoCapitalize="none"
            autoFocus={true}
          />
          <Pressable onPress={() => setSecure((prev) => !prev)} style={$secureButton}>
            {secure ? (
              <EyeOffIcon width={20} height={20} color={colors.palette.cyan500} />
            ) : (
              <EyeIcon width={20} height={20} color={colors.palette.cyan500} />
            )}
          </Pressable>
        </View>
        <View style={$formButtonGroup}>
          {loading ? (
            <>
              <ActivityIndicator color={colors.palette.cyan500} animating={loading} />
              {steps.metadata ? (
                <Text text="Fetch user's metadata" size="xs" style={$loadingText} />
              ) : steps.channels > 0 ? (
                <Text
                  text={`Found ${steps.channels} joinded channels. Rejoining...`}
                  size="xs"
                  style={$loadingText}
                />
              ) : steps.messages > 0 ? (
                <Text text={`Fetching private messages..`} size="xs" style={$loadingText} />
              ) : (
                <Text text="Loading..." size="xs" style={$loadingText} />
              )}
            </>
          ) : (
            <Button text="Enter" onPress={login} style={$button} pressedStyle={$button} />
          )}
        </View>
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

const $container: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  paddingHorizontal: spacing.medium,
}

const $title: TextStyle = {
  textAlign: "center",
  marginTop: spacing.medium,
  marginBottom: spacing.huge,
}

const $inputGroup: ViewStyle = {
  position: "relative",
}

const $inputWrapper: ViewStyle = {
  padding: 0,
  alignItems: "center",
  backgroundColor: "transparent",
  borderWidth: 0,
  gap: spacing.extraSmall,
}

const $input: ViewStyle = {
  width: "100%",
  height: 50,
  borderWidth: 1,
  borderColor: colors.palette.cyan900,
  borderRadius: spacing.extraSmall,
  backgroundColor: colors.palette.overlay20,
  paddingHorizontal: spacing.medium,
  paddingVertical: 0,
  marginVertical: 0,
  marginHorizontal: 0,
  alignSelf: "center",
  marginBottom: spacing.small,
  paddingRight: 50,
}

const $secureButton: ViewStyle = {
  position: "absolute",
  right: 0,
  alignItems: "center",
  justifyContent: "center",
  width: 50,
  height: 50,
}

const $button: ViewStyle = {
  backgroundColor: "transparent",
  borderColor: colors.palette.cyan900,
  width: "100%",
  marginVertical: spacing.medium,
  height: 50,
  minHeight: 50,
}

const $formButtonGroup: ViewStyle = {
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 2,
  height: 50,
  minHeight: 50,
  marginVertical: spacing.medium,
}

const $loadingText: TextStyle = {
  color: colors.palette.cyan600,
}
