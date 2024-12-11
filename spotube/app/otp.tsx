import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Linking,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    Alert,
} from 'react-native';
import MaskInput from 'react-native-mask-input';
import { isClerkAPIResponseError, useSignIn, useSignUp } from '@clerk/clerk-expo';

const Colors = {
    primary: '#25D366',
    gray: '#808080',
    lightGray: '#E0E0E0',
    background: '#F5F5F5',
};

const GER_PHONE = [
    '+',
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
];

const Page = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 90 : 0;
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { signUp, setActive } = useSignUp();
    const { signIn } = useSignIn();

    const openLink = () => {
        Linking.openURL('https://galaxies.dev');
    };

    const sendOTP = async () => {
        if (phoneNumber.length < 12) {
            Alert.alert('Invalid Phone Number', 'Please enter a valid phone number.');
            return;
        }

        console.log('sendOTP', phoneNumber);
        setLoading(true);

        try {
            await signUp!.create({ phoneNumber });

            await signUp!.preparePhoneNumberVerification();

            router.push(`/verify/${phoneNumber}`);
        } catch (err) {
            console.log('error', JSON.stringify(err, null, 2));

            if (isClerkAPIResponseError(err)) {
                if (err.errors[0].code === 'form_identifier_exists') {
                    // User signed up before
                    await trySignIn();
                } else {
                    Alert.alert('Error', err.errors[0].message);
                }
            } else {
                Alert.alert('Error', 'An unexpected error occurred.');
            }
        } finally {
            setLoading(false);
        }
    };

    const trySignIn = async () => {
        try {
            const { supportedFirstFactors } = await signIn!.create({ identifier: phoneNumber });

            const firstPhoneFactor: any = supportedFirstFactors.find((factor: any) => {
                return factor.strategy === 'phone_code';
            });

            const { phoneNumberId } = firstPhoneFactor;

            await signIn!.prepareFirstFactor({
                strategy: 'phone_code',
                phoneNumberId,
            });

            router.push(`/verify/${phoneNumber}?signin=true`);
        } catch (error) {
            console.error('Sign-in error:', error);
            Alert.alert('Error', 'Failed to sign in. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            keyboardVerticalOffset={keyboardVerticalOffset}
            style={{ flex: 1 }}
            behavior="padding">
            {loading && (
                <View style={[StyleSheet.absoluteFill, styles.loading]}>
                    <ActivityIndicator size="large" color={Colors.primary} />
                    <Text style={{ fontSize: 18, padding: 10 }}>Sending code...</Text>
                </View>
            )}

            <View style={styles.container}>
                <Text style={styles.description}>
                    WhatsApp will need to verify your account. Carrier charges may apply.
                </Text>

                <View style={styles.list}>
                    <View style={styles.listItem}>
                        <Text style={styles.listItemText}>Germany</Text>
                        <Ionicons name="chevron-forward" size={20} color={'gray'} />
                    </View>
                    <View style={styles.separator} />

                    <MaskInput
                        value={phoneNumber}
                        keyboardType="numeric"
                        autoFocus
                        placeholder="+12 your phone number"
                        onChangeText={(masked, unmasked) => {
                            setPhoneNumber(masked);
                        }}
                        mask={GER_PHONE}
                        style={styles.input}
                    />
                </View>

                <Text style={styles.legal}>
                    You must be{' '}
                    <Text style={styles.link} onPress={openLink}>
                        at least 16 years old
                    </Text>{' '}
                    to register. Learn how WhatsApp works with the{' '}
                    <Text style={styles.link} onPress={openLink}>
                        Meta Companies
                    </Text>
                    .
                </Text>

                <View style={{ flex: 1 }} />

                <TouchableOpacity
                    style={[styles.button, phoneNumber !== '' ? styles.enabled : null, { marginBottom: 20 }]}
                    onPress={sendOTP}
                    disabled={loading || phoneNumber === ''}>
                    <Text style={[styles.buttonText, phoneNumber !== '' ? styles.enabledText : null]}>Next</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'red',
        gap: 20,
    },
    description: {
        fontSize: 14,
        color: Colors.gray,
    },
    legal: {
        fontSize: 12,
        textAlign: 'center',
        color: '#000',
    },
    link: {
        color: 'green',
    },
    button: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'lightGray',
        padding: 10,
        borderRadius: 10,
    },
    enabled: {
        backgroundColor: 'green',
    },
    enabledText: {
        color: '#FFF',
    },
    buttonText: {
        color: 'gray',
        fontSize: 22,
        fontWeight: '500',
    },
    list: {
        backgroundColor: '#fff',
        width: '100%',
        borderRadius: 10,
        padding: 10,
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 6,
        marginBottom: 10,
    },
    listItemText: {
        fontSize: 18,
        color: 'green',
    },
    separator: {
        width: '100%',
        height: 1,
        backgroundColor: 'gray',
        opacity: 0.2,
    },
    input: {
        backgroundColor: '#fff',
        width: '100%',
        fontSize: 16,
        padding: 6,
        marginTop: 10,
    },
    loading: {
        zIndex: 10,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Page;
