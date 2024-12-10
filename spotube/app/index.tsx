import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';

const Welcome = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const toNextPage = () => {
        setLoading(true);
        setTimeout(() => {
            router.replace('/otp');
            setLoading(false);
        }, 5000);
    };

    return (
        <View>
            {loading ? (
                <Text>Loading...</Text>
            ) : (
                <>
                    <Text>welcome</Text>
                    <TouchableOpacity onPress={toNextPage}>
                        <Text>next</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
};

export default Welcome;
