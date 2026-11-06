import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { colors, commonStyles, fontSans, shadows } from '../../../lib/styles';
import { useApp } from '../../../lib/store';

export default function AccountForm() {
    const { id } = useLocalSearchParams<{ id?: string }>();
    const router = useRouter();
    const { accounts, addAccount, updateAccount } = useApp();

    const editing = accounts.find((a) => a.id === id);

    const [site, setSite] = useState(editing?.site ?? '');
    const [image, setImage] = useState(editing?.image);
    const [username, setUsername] = useState(editing?.username ?? '');
    const [password, setPassword] = useState(editing?.password ?? '');
    const [showPass, setShowPass] = useState(false);

    async function pickImage() {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
        });
        if (!result.canceled) setImage(result.assets[0].uri);
    }

    async function save() {
        if (!site.trim() || !username.trim() || !password) {
            Alert.alert('Atenção', 'Preencha site, usuário e senha.');
            return;
        }
        const data = { site: site.trim(), image, username: username.trim(), password };
        if (editing) await updateAccount(editing.id, data);
        else await addAccount(data);
        router.back();
    }

    return (
        <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
            <Stack.Screen options={{ title: editing ? 'Editar conta' : 'Nova conta' }} />

            <View style={styles.card}>
                <Pressable onPress={pickImage} style={styles.imageButton}>
                    {image ? (
                        <Image source={{ uri: image }} style={styles.accountImage} />
                    ) : (
                        <View style={styles.imagePlaceholder}>
                            <Ionicons name="camera-outline" size={30} color={colors.ink} />
                        </View>
                    )}
                    <Text style={styles.imageText}>
                        {image ? 'Trocar imagem' : 'Adicionar imagem'}
                    </Text>
                </Pressable>

                <Text style={commonStyles.label}>Site</Text>
                <TextInput
                    style={commonStyles.input}
                    value={site}
                    onChangeText={setSite}
                    autoCapitalize="none"
                    placeholder="ex.: github.com"
                    placeholderTextColor={colors.inactive}
                />

                <Text style={commonStyles.label}>Usuário ou e-mail</Text>
                <TextInput
                    style={commonStyles.input}
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    placeholderTextColor={colors.inactive}
                />

                <Text style={commonStyles.label}>Senha</Text>
                <View style={styles.passwordField}>
                    <TextInput
                        style={styles.passwordInput}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPass}
                        autoCapitalize="none"
                    />
                    <Pressable onPress={() => setShowPass((v) => !v)} hitSlop={10}>
                        <Ionicons
                            name={showPass ? 'eye-off-outline' : 'eye-outline'}
                            size={22}
                            color={colors.ink}
                        />
                    </Pressable>
                </View>

                <Pressable style={commonStyles.button} onPress={save}>
                    <Text style={commonStyles.buttonText}>
                        {editing ? 'Salvar alterações' : 'Cadastrar'}
                    </Text>
                </Pressable>
            </View>
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
        ...shadows.soft,
    },
    imageButton: { alignSelf: 'center', alignItems: 'center', marginBottom: 8 },
    accountImage: {
        width: 90,
        height: 90,
        borderRadius: 24,
        ...shadows.soft,
    },
    imagePlaceholder: {
        width: 90,
        height: 90,
        borderRadius: 24,
        backgroundColor: colors.cream,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.line,
    },
    imageText: {
        textAlign: 'center',
        color: colors.ink,
        fontFamily: fontSans,
        fontSize: 12,
        marginTop: 8,
    },
    passwordField: {
        ...commonStyles.input,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 0,
    },
    passwordInput: {
        flex: 1,
        fontSize: 16,
        color: colors.ink,
        fontFamily: fontSans,
        paddingVertical: 14,
        outlineStyle: 'none', // apenas para web
    },
});