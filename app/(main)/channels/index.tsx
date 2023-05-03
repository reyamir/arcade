import { View, Text, Image, StyleSheet } from 'react-native'

export default function Page() {
  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        <View>
          <View
            style={{
              width: '100%',
              aspectRatio: 1 / 1,
              borderRadius: 8,
              backgroundColor: '#111827',
            }}
          />
        </View>
        <View
          style={{
            alignSelf: 'center',
            width: '50%',
            height: 1,
            backgroundColor: '#1f2937',
          }}
        />
        <View style={{ flexDirection: 'column', gap: 16 }}>
          <View>
            <Image
              style={styles.picture}
              source={{
                uri: 'https://source.boringavatars.com/marble/120/Test1?square',
              }}
            />
          </View>
          <View>
            <Image
              style={styles.picture}
              source={{
                uri: 'https://source.boringavatars.com/marble/120/Test2?colors=264653,2a9d8f,e9c46a,f4a261,e76f51&square',
              }}
            />
          </View>
          <View>
            <Image
              style={styles.picture}
              source={{
                uri: 'https://source.boringavatars.com/marble/120/Test3?colors=264653,2a9d8f,e9c46a,f4a261,e76f51&square',
              }}
            />
          </View>
          <View>
            <Image
              style={styles.picture}
              source={{
                uri: 'https://source.boringavatars.com/marble/120/Test4?colors=264653,2a9d8f,e9c46a,f4a261,e76f51&square',
              }}
            />
          </View>
          <View>
            <Image
              style={styles.picture}
              source={{
                uri: 'https://source.boringavatars.com/marble/120/Test5?colors=264653,2a9d8f,e9c46a,f4a261,e76f51&square',
              }}
            />
          </View>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={{ color: '#fff' }}>Channels</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  sidebar: {
    flexDirection: 'column',
    flexShrink: 0,
    gap: 16,
    width: 72,
    height: '100%',
    paddingHorizontal: 8,
  },
  content: {
    flex: 1,
    height: '100%',
    backgroundColor: '#111827',
    borderRadius: 8,
    marginRight: 16,
  },
  picture: {
    width: '100%',
    aspectRatio: 1 / 1,
    borderRadius: 8,
  },
})
