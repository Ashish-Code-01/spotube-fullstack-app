import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Logo from '../assets/images/logo.png';
import Icon from "react-native-vector-icons/AntDesign"
import React from 'react';
import { useRouter } from 'expo-router';

const Index = () => {
    const router = useRouter()
    const toNextpage = () => {
        router.replace("/otp")
    };
    return (
        <View style={styles.container}>
            <Text style={styles.text}>WELCOME</Text>
            <Image source={Logo} style={styles.image} />
            <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText} onPress={toNextpage}>Continue </Text>
                <Icon size={24} color="white" name="arrowright" />
            </TouchableOpacity>
        </View>
    );
};

export default Index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(101, 154, 44)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 42,
        fontWeight: 'bold',
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 4,

    },
    image: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
        borderRadius: 10,
    },
    btn: {
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