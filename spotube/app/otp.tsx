import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import MaskInput from 'react-native-mask-input';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';

const Page = () => {
    const router = useRouter();
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);

    const sendOtp = () => {
        setLoading(true);
        setTimeout(() => {
            router.push(`/auth/[phone]`);
            setLoading(false);
        }, 2000);
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0066cc" />
            ) : (
                <>
                    <Text style={styles.label}>Enter your phone number</Text>
                    <MaskInput
                        value={phone}
                        placeholder='+91 XXX XXX-XXXX'
                        onChangeText={(masked, unmasked) => {
                            setPhone(masked);
                        }}
                        mask={['+', '9', '1', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                        style={styles.input}
                        keyboardType="numeric"
                    />
                    <TouchableOpacity style={styles.btn} onPress={sendOtp} disabled={loading}>
                        <Text style={styles.btnText}>{loading ? 'Sending...' : 'Send OTP'}</Text>
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
