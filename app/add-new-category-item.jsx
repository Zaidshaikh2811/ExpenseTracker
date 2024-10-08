import React, { useState } from 'react'
import { ActivityIndicator, Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import Colors from '../utils/Colors';
import { Ionicons } from "@expo/vector-icons"
import { TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { supabase } from '../utils/SupaBaseConfig';
import { decode } from "base64-arraybuffer"
import { useLocalSearchParams, useRouter } from 'expo-router';

const placeholderImage = "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg";


const AddNewCategoryItem = () => {
    const { categoryId } = useLocalSearchParams()
    const router = useRouter()


    const [image, setImage] = useState(placeholderImage)
    const [previewImage, setPreviewImage] = useState(placeholderImage)

    const [name, setName] = useState('')
    const [url, setUrl] = useState('')
    const [note, setNote] = useState('')
    const [cost, setCost] = useState('')
    const [loading, setLoading] = useState(false)


    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        });



        if (!result.canceled) {

            setPreviewImage(result.assets[0].uri);
            setImage(result.assets[0].base64);
        }
    };


    const onCLickAdd = async () => {
        setLoading(true)
        try {

            const fileName = Date.now();

            const { data, error } = await supabase.storage.from('images')
                .upload(fileName + ".png", decode(image), {
                    contentType: 'image/png'
                })


            if (data) {

                const fileUrl = "https://vflwvgmcseepnxbagybk.supabase.co/storage/v1/object/public/images/" + fileName + ".png"


                const { data, error } = await supabase
                    .from('CategoryItems')
                    .insert([
                        {
                            name: name,
                            url: url,
                            note: note,
                            image: fileUrl,
                            cost: cost,

                            category_id: categoryId,
                        },
                    ])
                    .select()
                if (error) throw insertError;

            }
            router.back()


        } catch (error) {

            console.log(error)
        } finally {

            setLoading(false)
        }

    }

    return (
        <KeyboardAvoidingView>

            <ScrollView style={{
                padding: 20
            }}>

                <TouchableOpacity onPress={() => pickImage()}>

                    <Image source={{ uri: previewImage }} style={styles.image} />
                </TouchableOpacity>
                <View style={styles.textInputContainer}>
                    <Ionicons name='pricetag' size={24} color={Colors.GRAY} />
                    <TextInput value={name} onChangeText={setName} placeholder='Item Name' style={styles.input} />
                </View>
                <View style={styles.textInputContainer}>
                    <FontAwesome5 name="money-bill" size={24} color={Colors.GRAY} />
                    <TextInput placeholder='Cost' value={cost} onChangeText={setCost} keyboardType='number-pad' style={styles.input} />
                </View>
                <View style={styles.textInputContainer}>
                    <Ionicons name='link' size={24} color={Colors.GRAY} />
                    <TextInput value={url} onChangeText={setUrl} placeholder='Url' style={styles.input} />
                </View>
                <View style={styles.textInputContainer}>
                    <Ionicons name='pencil' size={24} color={Colors.GRAY} />
                    <TextInput value={note} onChangeText={setNote} placeholder='Note' style={[styles.input, { height: 80, }]} multiline={true}
                        numberOfLines={3} />
                </View>
                <TouchableOpacity disabled={
                    !name || !cost || !url || !image || loading
                } style={styles.button} onPress={onCLickAdd}>
                    {loading ? <ActivityIndicator /> :
                        <Text style={{
                            textAlign: "center",
                            fontFamily: "outfit-bold",
                            color: Colors.WHITE
                        }}>Add</Text>
                    }
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default AddNewCategoryItem;

const styles = StyleSheet.create({
    image: {
        width: 150,
        height: 100,
        backgroundColor: Colors.GRAY,
        borderRadius: 15
    },
    textInputContainer: {
        padding: 10,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: Colors.GRAY,
        gap: 10,
        display: "flex",
        alignItems: "center",
        borderRadius: 10,
        marginTop: 10

    },
    input: {
        fontSize: 19,
        width: "100%"

    },
    button: {
        backgroundColor: Colors.PRIMARY,
        padding: 20,
        borderRadius: 99,
        marginTop: 25,

    }
})
