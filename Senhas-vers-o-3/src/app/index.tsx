import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, commonStyles, fontSans, shadows } from '../lib/styles';

export default function Welcome() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <View style={styles.iconBox}>
          <Ionicons name="lock-closed-outline" size={52} color={colors.ink} />
        </View>

        <Text style={styles.title}>Meu Cofre</Text>
        <Text style={styles.subtitle}>
          Suas senhas guardadas com calma e cuidado.
        </Text>

        <Pressable style={styles.button} onPress={() => router.push('/login')}>
          <Text style={commonStyles.buttonText}>Entrar</Text>
        </Pressable>

        <Text style={styles.footnote}>v3 · Paper Vault</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    ...commonStyles.screen,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  content: { width: '100%', maxWidth: 440, alignItems: 'center' },
  iconBox: {
    width: 110,
    height: 110,
    borderRadius: 28,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.soft,
  },
  title: {
    ...commonStyles.title,
    fontSize: 40,
    marginTop: 28,
    textAlign: 'center',
  },
  subtitle: {
    color: colors.muted,
    fontFamily: fontSans,
    lineHeight: 23,
    marginTop: 10,
    textAlign: 'center',
    fontSize: 15,
  },
  button: {
    ...commonStyles.button,
    width: '100%',
    marginTop: 36,
    backgroundColor: colors.terracotta,
    ...shadows.warm,
  },
  footnote: {
    marginTop: 22,
    color: colors.inactive,
    fontSize: 12,
    fontFamily: fontSans,
    fontStyle: 'italic',
  },
});