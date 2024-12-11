import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import AppLogo from "../assets/images/applogo.png"

const Welcome = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const toNextPage = useCallback(() => {
        setLoading(true);
        setTimeout(() => {
            router.replace('/otp');
            setLoading(false);
        }, 5000);
    }, [router]);

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="black" />
            ) : (
                <>
                    <Image source={AppLogo} style={styles.logoIMG} />
                    <Text style={styles.title}>Welcome to Spotube Music App</Text>
                    <Text style={styles.subtitle}>
                        This app doesn't contain ads or advertisements.
                    </Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={toNextPage}
                        accessibilityLabel="Continue to the next page"
                    >
                        <Text style={styles.buttonText}>Continue</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#558F22',
    },
    logoIMG: {
        height: 250,
        width: 350,
        borderRadius: 20,
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 20,
        marginBottom: 24,
        textAlign: 'center',
        color: 'black',
    },
    button: {
        backgroundColor: '#6200EE',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 20,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default Welcome;
