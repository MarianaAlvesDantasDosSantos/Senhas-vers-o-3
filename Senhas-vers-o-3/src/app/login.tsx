import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, commonStyles, fontSans, shadows } from '../lib/styles';
import { useApp } from '../lib/store';

export default function Login() {
  const router = useRouter();
  const { login } = useApp();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleLogin() {
    if (login(password)) {
      router.replace('/home');
      return;
    }
    setError('Senha incorreta.');
  }

  return (
    <View style={styles.screen}>
      <View style={styles.panel}>
        <Text style={styles.title}>Bem-vindo de volta</Text>
        <Text style={styles.subtitle}>Use sua senha para abrir o cofre.</Text>

        <Text style={commonStyles.label}>Senha de acesso</Text>
        <TextInput
          style={commonStyles.input}
          placeholder="••••"
          placeholderTextColor={colors.inactive}
          secureTextEntry
          value={password}
          onChangeText={(t) => { setPassword(t); setError(''); }}
          onSubmitEditing={handleLogin}
          autoFocus
        />

        {!!error && <Text style={commonStyles.error}>{error}</Text>}

        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={commonStyles.buttonText}>Desbloquear</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    ...commonStyles.screen,
    justifyContent: 'center',
    padding: 20,
  },
  panel: {
    width: '100%',
    maxWidth: 460,
    alignSelf: 'center',
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 26,
    ...shadows.soft,
  },
  title: {
    ...commonStyles.title,
    fontSize: 30,
  },
  subtitle: {
    color: colors.muted,
    fontFamily: fontSans,
    marginTop: 6,
    marginBottom: 18,
  },
  button: {
    ...commonStyles.button,
    backgroundColor: colors.ink,
  },
});