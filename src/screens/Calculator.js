import React from 'react'
import { useState } from 'react'
import {
    SafeAreaView,
    View,
    StyleSheet
} from 'react-native'
import Button from '../components/Button'
import Display from '../components/Display'

const style = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        backgroundColor: '#000',
    },
    list: {
        flexWrap: 'wrap',
        flexDirection: 'row',
    }
})

const digits = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."]
const operators = ['%', '+', '-', 'x', '/', '=']
const allItems = ["AC", "%", '/', "7", "8", "9", 'x', "4", "5", "6", '+', "1", "2", "3", '-', "0", ".", '=']


export default function Calculator() {
    const [displayValue, setDisplayValue] = useState("0")
    const [clearDisplay, setClearDisplay] = useState(false)
    const [operator, setOperator] = useState("")
    const [values, setValues] = useState([0, 0])
    const [currentIndex, setCurrentIndex] = useState(0)

    const addDigit = (n) => {
        const isDot = n === "."
        const clearDisplayAux = (!isDot && displayValue === '0') || clearDisplay

        if (n === '.' && displayValue.includes('.') && !clearDisplayAux) return

        const emptyValue = isDot ? '0' : ''
        const currentValueAux = clearDisplayAux ? emptyValue : displayValue
        const displayValueAux = currentValueAux + n

        setDisplayValue(displayValueAux)
        setClearDisplay(false)

        if (n !== '.') {
            const newValue = parseFloat(displayValueAux)
            const updatedValues = [...values]
            updatedValues[currentIndex] = newValue
            setValues(updatedValues)
        }
    }

    const handleOperation = (operatorParameter) => {
        if (operators.includes(operator) && operatorParameter !== "=") {
            setOperator(operatorParameter)
        }

        if (currentIndex === 0) {
            setOperator(operatorParameter)
            setCurrentIndex(1)
            setClearDisplay(true)
        } else {
            const equals = operatorParameter === '='
            const [value1, value2] = values
            const updatedValues = [value1, value2]

            if (operator === '/' && value2 === 0) {
                updatedValues[0] = undefine
            }

            updatedValues[0] = calculate();
            updatedValues[1] = 0
            setDisplayValue(updatedValues[0] !== undefined ? updatedValues[0].toString() : 'Operação inválida');
            setOperator(equals ? null : operatorParameter)
            setCurrentIndex(equals ? 0 : 1)
            setClearDisplay(true)
            setValues(updatedValues)
        }
    }

    const calculate = () => {
        switch (operator) {
            case "%":
                return values[0] % values[1]
            case "/":
                return values[0] / values[1]
            case "x":
                return values[0] * values[1]
            case "-":
                return values[0] - values[1]
            case "+":
                return values[0] + values[1]
            default:
                return values[0];
        }
    }

    const handleClearMemory = () => {
        setDisplayValue('0')
        setClearDisplay(false)
        setOperator(null)
        setValues([0, 0])
        setCurrentIndex(0)
    }


    return (
        <SafeAreaView style={style.container}>
            <Display value={displayValue} />

            <View style={style.list}>
                {
                    allItems.map((item, index) => {
                        return (

                            <Button
                                key={item}
                                element={item}
                                onClick={() => {
                                    if (digits.includes(item)) addDigit(item)
                                    if (operators.includes(item)) handleOperation(item)
                                    if (item === 'AC') handleClearMemory()
                                }}
                                operation={operators.includes(item)}
                                double={item === '0' || item === 'AC'}
                                darkButton={item === "AC" || item === "%"}
                            />
                        )
                    })
                }
            </View>
        </SafeAreaView>
    )
}