import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, commonStyles, fontSans, fontSerif, shadows } from '../../lib/styles';
import { useApp } from '../../lib/store';

export default function Profile() {
  const router = useRouter();
  const { profile, updateProfile, changeAppPassword, logout } = useApp();

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');

  async function saveProfile() {
    await updateProfile({ name: name.trim(), email: email.trim() });
    Alert.alert('Pronto', 'Dados atualizados.');
  }

  async function savePassword() {
    if (next !== confirm) {
      Alert.alert('Atenção', 'A confirmação não confere.');
      return;
    }
    const changed = await changeAppPassword(current, next);
    if (!changed) {
      Alert.alert('Atenção', 'Senha atual incorreta ou nova senha com menos de 4 caracteres.');
      return;
    }
    setCurrent(''); setNext(''); setConfirm('');
    Alert.alert('Pronto', 'Senha de acesso alterada.');
  }

  function handleLogout() {
    logout();
    router.replace('/');
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: 'Dados Pessoais' }} />

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Sua Identidade</Text>
        
        <Text style={commonStyles.label}>Nome</Text>
        <TextInput
          style={commonStyles.input}
          value={name}
          onChangeText={setName}
          placeholderTextColor={colors.inactive}
        />

        <Text style={commonStyles.label}>E-mail</Text>
        <TextInput
          style={commonStyles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholderTextColor={colors.inactive}
        />

        <Pressable style={styles.saveButton} onPress={saveProfile}>
          <Text style={commonStyles.buttonText}>Salvar Dados</Text>
        </Pressable>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Segurança</Text>

        <Text style={commonStyles.label}>Senha atual</Text>
        <TextInput
          style={commonStyles.input}
          secureTextEntry
          value={current}
          onChangeText={setCurrent}
          placeholderTextColor={colors.inactive}
        />

        <Text style={commonStyles.label}>Nova senha</Text>
        <TextInput
          style={commonStyles.input}
          secureTextEntry
          value={next}
          onChangeText={setNext}
          placeholderTextColor={colors.inactive}
        />

        <Text style={commonStyles.label}>Confirmar nova senha</Text>
        <TextInput
          style={commonStyles.input}
          secureTextEntry
          value={confirm}
          onChangeText={setConfirm}
          placeholderTextColor={colors.inactive}
        />

        <Pressable style={styles.saveButton} onPress={savePassword}>
          <Text style={commonStyles.buttonText}>Alterar Senha</Text>
        </Pressable>
      </View>

      <Pressable style={[commonStyles.button, commonStyles.dangerButton, { marginTop: 10 }]} onPress={handleLogout}>
        <Text style={[commonStyles.buttonText, { color: colors.danger }]}>Sair do Cofre</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { ...commonStyles.screen },
  content: { padding: 20, paddingBottom: 40 },
  card: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 22,
    marginBottom: 20,
    ...shadows.soft,
  },
  sectionTitle: {
    ...commonStyles.title,
    fontSize: 20,
    marginBottom: 6,
  },
  saveButton: {
    ...commonStyles.button,
    backgroundColor: colors.cream,
    marginTop: 24,
  },
});