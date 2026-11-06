import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import {
  useFonts,
  Fraunces_500Medium,
  Fraunces_600SemiBold,
} from '@expo-google-fonts/fraunces';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from '@expo-google-fonts/inter';
import { AppProvider } from '../lib/store';
import { colors } from '../lib/styles';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Fraunces_500Medium,
    Fraunces_600SemiBold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  if (!fontsLoaded) return null;

  return (
    <AppProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: styles.content,
        }}
      />
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  content: { backgroundColor: colors.paper },
});