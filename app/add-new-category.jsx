import React, { useState } from 'react'
import { Alert, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, ToastAndroid, TouchableWithoutFeedback, View } from 'react-native'
import { MaterialIcons } from "@expo/vector-icons"
import Colors from '../utils/Colors'
import ColorPicker from '../components/ColorPicker'
import { Foundation } from "@expo/vector-icons"
import { TouchableOpacity } from 'react-native'
import { supabase } from '../utils/SupaBaseConfig'
import { client } from '../utils/KindConfig'
import { useRouter } from 'expo-router'

const AddNewCategory = () => {

    const router = useRouter();
    const [selectedIcon, setSelectedIcon] = useState('')
    const [selectedColor, setSelectedColor] = useState(Colors.PRIMARY)
    const [categoryName, setCategoryName] = useState()
    const [totalBudget, setTotalBudget] = useState()


    const onCreateCategory = async () => {
        try {

            const user = await client.getUserDetails()
            const { data, error } = await supabase.from("Category")
                .insert([{
                    name: categoryName,
                    assigned_Budget: totalBudget,
                    icon: selectedIcon,
                    color: selectedColor,
                    createdBy: user.email
                }]).select();


            if (error) {
                Alert.alert('Error', 'Failed to create category');
            } else {
                Alert.alert('Success', 'Category Created Successfully');

                // Clear input fields after saving
                setCategoryName('');
                setTotalBudget('');
                setSelectedIcon('');
                setSelectedColor(Colors.PRIMARY);
                console.log(data);

                router.replace({
                    pathname: "/category-detail",
                    params: {
                        categoryId: data[0].id
                    }
                })

            }

        } catch (err) {

            Alert.alert('Error', 'Something went wrong, please try again');

        }
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>


                <View style={{
                    padding: 20,
                }} >

                    <View style={{
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <TextInput placeholder="?" onChangeText={setSelectedIcon} maxLength={2} style={[styles.iconInput, { backgroundColor: selectedColor }]}>
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
                    } style={styles.button} onPress={onCreateCategory}>
                        <Text style={{
                            color: Colors.WHITE,
                            fontWeight: "bold",
                            fontSize: 20,
                            textTransform: "uppercase",
                            textAlign: "center",

                        }}>Create</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default AddNewCategory;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
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
