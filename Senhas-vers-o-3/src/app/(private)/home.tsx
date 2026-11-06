import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import {
  avatarColor,
  colors,
  commonStyles,
  fontSans,
  fontSerif,
  shadows,
} from '../../lib/styles';
import { useApp } from '../../lib/store';

export default function Home() {
  const router = useRouter();
  const { accounts } = useApp();

  return (
    <View style={styles.screen}>
      <Stack.Screen
        options={{
          title: 'Meu Cofre',
          headerBackVisible: false,
          headerRight: () => (
            <Pressable onPress={() => router.push('/profile')}>
              <Ionicons name="person-circle-outline" size={30} color={colors.ink} />
            </Pressable>
          ),
        }}
      />

      <View style={styles.headerBlock}>
        <Text style={styles.title}>Meu Cofre</Text>
        <Text style={styles.counter}>
          {accounts.length} {accounts.length === 1 ? 'senha guardada' : 'senhas guardadas'}
        </Text>
      </View>

      <FlatList
        data={accounts}
        keyExtractor={(a) => a.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhuma conta por aqui ainda.</Text>
        }
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => router.push(`/account/${item.id}`)}
          >
            {item.image ? (
              <Image source={{ uri: item.image }} style={styles.avatar} />
            ) : (
              <View style={[styles.avatar, { backgroundColor: avatarColor(item.site) }]}>
                <Text style={styles.avatarInitial}>
                  {item.site.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}

            <View style={styles.accountInfo}>
              <Text style={styles.site}>{item.site}</Text>
              <Text style={styles.username}>{item.username}</Text>
            </View>

            <View style={styles.copyPill}>
              <Text style={commonStyles.pillText}>Copiar</Text>
            </View>
          </Pressable>
        )}
      />

      <Pressable style={styles.fab} onPress={() => router.push('/account/form')}>
        <Ionicons name="add" size={28} color="#FFFFFF" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { ...commonStyles.screen, padding: 20, paddingBottom: 0 },
  headerBlock: { marginBottom: 14 },
  title: {
    ...commonStyles.title,
    fontSize: 32,
  },
  counter: {
    color: colors.muted,
    fontFamily: fontSans,
    fontSize: 14,
    marginTop: 4,
  },
  list: { flexGrow: 1, paddingBottom: 100 },
  emptyText: {
    textAlign: 'center',
    color: colors.muted,
    fontFamily: fontSans,
    marginTop: 60,
    fontStyle: 'italic',
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 18,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    ...shadows.soft,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 14,
    marginRight: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitial: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: fontSerif,
    fontWeight: '600',
  },
  accountInfo: { flex: 1 },
  site: {
    fontSize: 18,
    color: colors.ink,
    fontFamily: fontSerif,
    fontWeight: '500',
  },
  username: {
    color: colors.muted,
    fontFamily: fontSans,
    fontSize: 13,
    marginTop: 2,
  },
  copyPill: {
    ...commonStyles.pill,
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 28,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.terracotta,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.warm,
  },
});