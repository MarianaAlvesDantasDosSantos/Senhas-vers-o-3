import { Redirect, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { useApp } from '../../lib/store';
import { colors, fontSerif, fontSans } from '../../lib/styles';

export default function PrivateLayout() {
  const { authenticated } = useApp();

  if (!authenticated) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: styles.header,
        headerTintColor: colors.ink,
        headerTitleStyle: styles.headerTitle,
        headerShadowVisible: false,
        contentStyle: styles.content,
      }}
    />
  );
}

const styles = StyleSheet.create({
  header: { backgroundColor: colors.paper },
  headerTitle: {
    color: colors.ink,
    fontFamily: fontSerif,
    fontWeight: '500',
    fontSize: 18,
  },
  content: { backgroundColor: colors.paper },
});