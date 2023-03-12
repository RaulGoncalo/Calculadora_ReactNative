import { StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native'
import React from 'react'

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width / 4,
        height: Dimensions.get('window').width / 4,
        textAlign: 'center',
        padding: 20,
        backgroundColor: '#707070',
        borderStyle: 'solid',
        borderColor: '#000',
        borderWidth: 0.5,
        borderRadius: 4,
        color: "#fff",
        fontSize: 40,
        fontWeight: '200',
    },
    operationButton: {
        color: '#fff',
        backgroundColor: '#FA9E0D',
    },
    darkButton: {
        color: '#fff',
        backgroundColor: '#525252',
    },
    buttonDouble: {
        width: (Dimensions.get('window').width / 4) * 2,
    },
    text: {
        fontSize: 28,
    },
});

export default function Button({ element, onClick, double, operation, darkButton }) {
    const stylesButton = [styles.container]

    if (double) stylesButton.push(styles.buttonDouble)
    if (operation) stylesButton.push(styles.operationButton)
    if (darkButton) stylesButton.push(styles.darkButton)


    return (
        <TouchableOpacity activeOpacity={0.80} onPress={() => onClick()}>
            <Text style={stylesButton}>{element}</Text>
        </TouchableOpacity>
    )
}