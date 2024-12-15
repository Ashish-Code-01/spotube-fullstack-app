import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const index = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text} >Welcome</Text>
        </View>
    )
}

export default index
const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: "white",
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 38,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    }

})
