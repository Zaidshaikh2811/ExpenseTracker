

import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { supabase } from '../utils/SupaBaseConfig';
import { Ionicons } from "@expo/vector-icons"
import { Text } from 'react-native-web';
import CourseInfo from '../components/CourseDetails/CourseInfo';

const CategoryDetails = () => {
    const { categoryId } = useLocalSearchParams();
    const [categoryData, setCategoryData] = useState([])


    useEffect(() => {

        categoryId && getCategoryDetails()
    }, [categoryId])

    const getCategoryDetails = async () => {
        try {

            const { data, error } = await supabase.from("Category").select("*,CategoryItems(*)")
                .eq("id", categoryId)

            setCategoryData(data[0]);

        }
        catch (error) {
            console.log(error)
        }


    }

    return (
        <View style={{
            padding: 20,
            marginTop: 20
        }}>

            <Ionicons name='arrow-back-circle' size={44} color="black" />

            <CourseInfo categoryData={categoryData} />


        </View >
    )
}

export default CategoryDetails;
