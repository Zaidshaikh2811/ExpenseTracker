import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { MaterialIcons } from "@expo/vector-icons"
import Colors from '../utils/Colors'
import ColorPicker from '../components/ColorPicker'
import { Foundation } from "@expo/vector-icons"
import { TouchableOpacity } from 'react-native'

const AddNewCategory = () => {

    const [selectedIcon, setSelectedIcon] = useState('')
    const [selectedColor, setSelectedColor] = useState(Colors.PRIMARY)
    const [categoryName, setCategoryName] = useState()
    const [totalBudget, setTotalBudget] = useState()


    const onCreateCategory = () => {

    }

    return (
        <View style={{
            padding: 20,
        }} >

            <View style={{
                justifyContent: "center",
                alignItems: "center"
            }}>
                <TextInput onChangeText={setSelectedIcon} maxLength={2} style={[styles.iconInput, { backgroundColor: selectedColor }]}>
                    {selectedIcon}
                </TextInput>
                <ColorPicker selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
            </View>

            <View style={styles.inputView}>
                <MaterialIcons name='local-offer' size={24} color={Colors.GRAY} />
                <TextInput onChangeText={setCategoryName} style={{
                    width: "100%",
                    fontSize: 17
                }} placeholder='Category Name' />
            </View>
            <View style={styles.inputView}>
                <Foundation name='dollar' size={30} color={Colors.GRAY} />
                <TextInput onChangeText={setTotalBudget} style={{
                    width: "100%",
                    fontSize: 17
                }} placeholder='Total Budget'
                    keyboardType='number-pad'
                />
            </View>

            <TouchableOpacity disabled={
                !categoryName || !selectedColor || !selectedIcon || !totalBudget
            } style={styles.button}>
                <Text style={{
                    color: Colors.WHITE,
                    fontWeight: "bold",
                    fontSize: 20,
                    textTransform: "uppercase",
                    textAlign: "center",

                }}>Create</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AddNewCategory;

const styles = StyleSheet.create({
    iconInput: {
        textAlign: "center",
        fontSize: 30,
        padding: 20,
        borderRadius: 99,
        paddingHorizontal: 28,
        color: Colors.WHITE

    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 20
    },
    inputView: {
        borderWidth: 1,
        display: "flex",
        display: "flex",
        flexDirection: "row",
        gap: 5,
        padding: 14,
        borderRadius: 10,
        borderColor: Colors.GRAY,
        backgroundColor: Colors.WHITE,
        alignItems: "center",
        marginTop: 20
    },
    button: {
        backgroundColor: Colors.PRIMARY,
        padding: 15,
        paddingHorizontal: 5,
        borderRadius: 50,
        marginTop: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"

    }
})
