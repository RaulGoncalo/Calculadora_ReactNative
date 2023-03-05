import React from 'react'
import { useState } from 'react'
import {
    SafeAreaView,
    View,
    StyleSheet
} from 'react-native'
import Keys from './Keys'
import Display from './Display'

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
const operators = ['%', '+', '-', '*', '/', '=']
const allItems = ["AC", "%", '/', "7", "8", "9", '*', "4", "5", "6", '+', "1", "2", "3", '-', "0", ".", '=']


export default function Calculator() {
    const [displayValue, setDisplayValue] = useState("0")
    const [clearDisplay, setClearDisplay] = useState(false)
    const [operator, setOperator] = useState(null)
    const [values, setValues] = useState([0, 0])
    const [currentIndex, setCurrentIndex] = useState(0)


    // está função adiciona um digito afetando o estado do display e da rega de negócio da aplicação
    const addDigit = (n) => {
        const isDot = n === "."
        const clearDisplayAux = (!isDot && displayValue === '0') || clearDisplay

        //valida se existe apena um ".". Também ja faz o tratamento da exceção impedindo o usuario de digitar mais de um ponto
        if (n === '.' && displayValue.includes('.') && !clearDisplayAux) return
        //verifica se existe um zero no começo do display, caso sim ele limpará e 
        //concatenará com vazio, caso não concatenará com o proximo digito (novo digito)

        const emptyValue = isDot ? '0' : ''
        const currentValueAux = clearDisplayAux ? emptyValue : displayValue
        const displayValueAux = currentValueAux + n

        //executa a troca do estado do display (adiciona o digito novo) e da nescessidade de zerar o display
        setDisplayValue(displayValueAux)
        setClearDisplay(false)

        //se for um ponto não segue
        //caso for um digito irá armazenar o novo valor (em float) na variavel de estado values, colocando na possição atual da operação
        //por exemplo, caso for o primeiro número irá colocar na primeira possição da variavel de estado values
        //caso seja o segundo valor será colocado na segunda possição da variavel de estado values que será mudado na chama da função handleOperation
        if (n !== '.') {
            const newValue = parseFloat(displayValueAux)
            const updatedValues = [...values]
            updatedValues[currentIndex] = newValue
            setValues(updatedValues)
        }
    }

    //está função será responsavel por executar as operações.
    const handleOperation = (operatorParameter) => {
        console.log(values)

        if (operators.includes(operator) && operatorParameter !== "=") {
            setOperator(operatorParameter)
        }

        //verifica a se é a primeira vez. Define o operador para executar a operação depois de digitar o proximo numero
        if (currentIndex === 0) {
            //guadar a operação para o proximo numero
            setOperator(operatorParameter)
            //o currentIndex muda para 1 a fim de ter os dois numeros para a operação. Onde na função addDigit auxiliará para que o valor seja armazenado na segunda possição de values
            setCurrentIndex(1)
            //define clearDisplay, para que no proximo digito, na função addDigite não concatene com este valor
            setClearDisplay(true)
        } else {
            //caso currente seja 1, signifca que existe o segundo numero e o que permite executar a função
            //amazena se a operação for igual para caso sim redefinir as variaveis e limpar o display para o proximo digito
            const equals = operatorParameter === '='
            //armazena o valores em variaveis
            const [value1, value2] = values
            const updatedValues = [value1, value2]

            if (operator === '/' && value2 === 0) {
                updatedValues[0] = undefined; // ou 'Indefinido'
            } else {
                // Realiza o cálculo normalmente
                try {
                    updatedValues[0] = eval(`${value1} ${operator} ${value2}`);
                } catch (error) {
                    // Caso de erro na operação, armazeno o primeiro valor na posição 0
                    updatedValues[0] = value1;
                }
            }
            //defino zero a segunda posição do array para futuras operações
            updatedValues[1] = 0

            //redefino o estado da apliação para o inicial caso seja o operado de "=", se não preparo o ciclo para receber o novo digito e a nova operação
            setDisplayValue(updatedValues[0] !== undefined ? updatedValues[0].toString() : 'Operação inválida');
            setOperator(equals ? null : operatorParameter)
            setCurrentIndex(equals ? 0 : 1)
            setClearDisplay(true)
            setValues(updatedValues)
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

                            <Keys
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