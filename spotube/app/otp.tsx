import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Alert } from 'react-native';
import MaskInput from 'react-native-mask-input';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { isClerkAPIResponseError, useSignIn, useSignUp } from '@clerk/clerk-expo';

const Page = () => {
    const router = useRouter();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const { signUp, setActive } = useSignUp();
    const { signIn } = useSignIn();

    const sendOTP = async () => {
        console.log('sendOTP', phoneNumber);
        setLoading(true);

        try {
            await signUp!.create({
                phoneNumber,
            });
            console.log('TESafter createT: ', signUp!.createdSessionId);

            await signUp!.preparePhoneNumberVerification();

            console.log('after prepare: ');
            router.push(`/auth/${phoneNumber}`);
        } catch (err) {
            console.log('error', JSON.stringify(err, null, 2));

            if (isClerkAPIResponseError(err)) {
                if (err.errors[0].code === 'form_identifier_exists') {
                    // User signed up before
                    console.log('User signed up before');
                    await trySignIn();
                } else {
                    setLoading(false);
                    Alert.alert('Error', err.errors[0].message);
                }
            }
        }
    };

    const trySignIn = async () => {
        console.log('trySignIn', phoneNumber);

        const { supportedFirstFactors } = await signIn!.create({
            identifier: phoneNumber,
        });

        const firstPhoneFactor = supportedFirstFactors.find((factor) => {
            return factor.strategy === 'phone_code';
        });

        const { phoneNumberId } = firstPhoneFactor;

        await signIn!.prepareFirstFactor({
            strategy: 'phone_code',
            phoneNumberId,
        });

        router.push(`/auth/${phoneNumber}?signin=true`);
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0066cc" />
            ) : (
                <>
                    <Text style={styles.label}>Enter your phone number</Text>
                    <MaskInput
                        value={phoneNumber}
                        placeholder='+91 XXX XXX-XXXX'
                        onChangeText={(masked, unmasked) => {
                            setPhoneNumber(masked);
                        }}
                        mask={['+', '9', '1', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                        style={styles.input}
                        keyboardType="numeric"
                    />
                    <TouchableOpacity style={styles.btn} onPress={sendOTP} disabled={loading}>
                        <Text style={styles.btnText}>Send OTP</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
};

export default Page;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(101, 154, 44)',
        padding: 20,
    },
    label: {
        fontSize: 24,
        marginBottom: 20,
        color: 'black',
        fontWeight: "bold",
    },
    input: {
        width: '80%',
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        backgroundColor: 'rgb(101, 154, 44)',
        fontSize: 16,
        color: "black",
    },
    btn: {
        marginTop: 30,
        backgroundColor: '#0066cc',
        height: 50,
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    btnText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 6,
    },
});
