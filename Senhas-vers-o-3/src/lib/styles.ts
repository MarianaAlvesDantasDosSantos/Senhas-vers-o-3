import { Platform, StyleSheet } from 'react-native';

export const fontSerif = Platform.select({
  ios: 'Fraunces_500Medium',
  android: 'Fraunces_500Medium',
  web: 'Fraunces, Georgia, serif',
  default: 'serif',
});

export const fontSans = Platform.select({
  ios: 'Inter_400Regular',
  android: 'Inter_400Regular',
  web: 'Inter, system-ui, sans-serif',
  default: 'sans-serif',
});

export const colors = {
  paper: '#FAF7F2',
  cream: '#F5EDE3',
  card: '#FFFFFF',
  ink: '#1F3D5C',
  muted: '#6B6B6B',
  line: '#E5DDD2',
  terracotta: '#D97742',
  sage: '#7A9E7E',
  mustard: '#C99A3D',
  inactive: '#B0A89E',
  danger: '#B0472F',
};

export const avatarPalette = ['#D97742', '#7A9E7E', '#C99A3D', '#8B6F9E', '#5B8DB8'];

export function avatarColor(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return avatarPalette[h % avatarPalette.length];
}

export const shadows = {
  soft: {
    shadowColor: '#1F3D5C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  warm: {
    shadowColor: '#D97742',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
};

export const commonStyles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.paper },
  title: {
    fontSize: 26,
    color: colors.ink,
    fontFamily: fontSerif,
    letterSpacing: 0.2,
  },
  label: {
    fontSize: 13,
    color: colors.muted,
    marginTop: 16,
    marginBottom: 6,
    fontFamily: fontSans,
  },
  input: {
    backgroundColor: colors.card,
    color: colors.ink,
    borderRadius: 16,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.line,
    fontFamily: fontSans,
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  button: {
    backgroundColor: colors.ink,
    paddingVertical: 15,
    paddingHorizontal: 22,
    borderRadius: 26,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 15,
    fontFamily: fontSans,
    letterSpacing: 0.3,
  },
  pill: {
    backgroundColor: colors.cream,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  pillText: {
    color: colors.ink,
    fontSize: 12,
    fontWeight: '600',
    fontFamily: fontSans,
  },
  dangerButton: {
    backgroundColor: '#FBEEE9',
    borderWidth: 1,
    borderColor: '#EBC9BD',
  },
  error: {
    color: colors.danger,
    marginTop: 8,
    fontFamily: fontSans,
    fontSize: 14,
  },
});