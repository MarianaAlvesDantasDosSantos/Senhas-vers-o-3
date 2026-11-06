import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import {
  avatarColor,
  colors,
  commonStyles,
  fontSans,
  fontSerif,
  shadows,
} from '../../../lib/styles';
import { useApp } from '../../../lib/store';

export default function AccountDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { accounts, removeAccount } = useApp();
  const [visible, setVisible] = useState(false);

  const account = accounts.find((item) => item.id === id);

  if (!account) {
    return (
      <View style={styles.notFoundScreen}>
        <Text style={styles.notFoundText}>Conta não encontrada.</Text>
      </View>
    );
  }

  function confirmDelete() {
    Alert.alert('Excluir conta', `Remover "${account.site}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          await removeAccount(account.id);
          router.back();
        },
      },
    ]);
  }

  return (
    <View style={styles.screen}>
      <Stack.Screen options={{ title: account.site }} />

      {account.image ? (
        <Image source={{ uri: account.image }} style={styles.accountImage} />
      ) : (
        <View style={[styles.accountImage, styles.placeholder, { backgroundColor: avatarColor(account.site) }]}>
          <Text style={styles.placeholderText}>
            {account.site.charAt(0).toUpperCase()}
          </Text>
        </View>
      )}

      <View style={styles.panel}>
        <Text style={commonStyles.label}>Site</Text>
        <Text style={styles.value}>{account.site}</Text>

        <Text style={commonStyles.label}>Usuário / e-mail</Text>
        <Text style={styles.value}>{account.username}</Text>

        <Text style={commonStyles.label}>Senha</Text>
        <View style={commonStyles.row}>
          <Text style={[styles.password, !visible && styles.hiddenPassword]}>
            {visible ? account.password : '••••••••'}
          </Text>
          <Pressable onPress={() => setVisible((v) => !v)} hitSlop={10}>
            <Ionicons
              name={visible ? 'eye-off-outline' : 'eye-outline'}
              size={24}
              color={colors.ink}
            />
          </Pressable>
        </View>
      </View>

      <Pressable
        style={commonStyles.button}
        onPress={() => router.push(`/account/form?id=${account.id}`)}
      >
        <Text style={commonStyles.buttonText}>Editar</Text>
      </Pressable>

      <Pressable
        style={[commonStyles.button, commonStyles.dangerButton, styles.deleteButton]}
        onPress={confirmDelete}
      >
        <Text style={styles.dangerText}>Excluir</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { ...commonStyles.screen, padding: 20 },
  accountImage: {
    width: 90,
    height: 90,
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 16,
    ...shadows.soft,
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#FFFFFF',
    fontSize: 36,
    fontFamily: fontSerif,
    fontWeight: '600',
  },
  panel: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 20,
    ...shadows.soft,
  },
  value: {
    fontSize: 17,
    color: colors.ink,
    fontFamily: fontSans,
  },
  password: {
    fontSize: 17,
    flex: 1,
    color: colors.ink,
    fontFamily: fontSans,
    letterSpacing: 1,
  },
  hiddenPassword: { letterSpacing: 3 },
  deleteButton: { marginTop: 10 },
  dangerText: {
    ...commonStyles.buttonText,
    color: colors.danger,
  },
  notFoundScreen: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.paper,
  },
  notFoundText: {
    color: colors.ink,
    fontFamily: fontSans,
    marginTop: 40,
    textAlign: 'center',
  },
});