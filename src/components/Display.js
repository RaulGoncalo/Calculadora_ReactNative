import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#000',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    text: {
        color: '#FFF',
        fontSize: 58
    }
})



export default function Display({ value }) {

    return (
        <View style={style.container}>
            <Text style={style.text}>{value}</Text>
        </View>
    );
};


