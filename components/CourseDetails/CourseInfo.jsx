import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from "@expo/vector-icons"
import Colors from '../../utils/Colors'
import { TouchableOpacity } from 'react-native'
import { supabase } from '../../utils/SupaBaseConfig'
import { useRouter } from 'expo-router'


const CourseInfo = ({ categoryData }) => {

    const [totalCost, setTotalCost] = useState();
    const [percTotal, setPercTotal] = useState(0);
    const router = useRouter()


    useEffect(() => {
        calculateTotalPerc()
    }, [categoryData])
    const calculateTotalPerc = () => {
        let total = 0
        categoryData?.CategoryItems?.forEach(item => {
            total += item.cost;
        })
        setTotalCost(total);
        let perc = (total / categoryData.assigned_Budget) * 100;
        if (perc > 100) {
            perc = 100
        }


        setPercTotal(perc);



    }



    const deleteCategory = async () => {
        const { error } = await supabase.from("CategoryItems").delete()
            .eq("category_id", categoryData.id);
        console.log(error);


        await supabase.from("Category").delete()
            .eq("id", categoryData.id);
        router.replace('/(tabs)')

    }

    const onDeleteCategory = () => {
        Alert.alert(
            "Are You Sure?", // Title
            "Do you really want to delete?", // Message
            [
                {
                    text: "Cancel", // Button label
                    style: "cancel", // Button style
                },
                {
                    text: "Yes", // Button label
                    onPress: async () => {
                        await deleteCategory(); // Call your delete function
                    },
                    style: "default" // Button style
                }
            ],
            { cancelable: true } // Makes alert dismissable by tapping outside
        );
    }

    return (
        <View>

            <View style={styles.container}>

                <View style={styles.iconContainer}>

                    <Text style={[styles.textIcon, { backgroundColor: categoryData?.color }]}>{categoryData.icon}</Text>
                </View>
                <View style={{ flex: 1, marginLeft: 20 }}>
                    <Text style={styles.categoryName}>{categoryData.name}</Text>
                    <Text style={styles.categoryItem}>{categoryData?.CategoryItems?.length} Item</Text>
                </View>
                <TouchableOpacity onPress={() => onDeleteCategory()}>

                    <Ionicons name='trash' size={30} color="red" />
                </TouchableOpacity>
            </View>
            <View style={styles.amountContainer}>
                <Text style={{ fontFamily: "outfit" }}>Rs {totalCost}</Text>
                <Text style={{ fontFamily: "outfit" }}>Total Budget: {categoryData.assigned_Budget} Rs</Text>
            </View>
            <View style={styles.progressBarMainContainer}>
                <View style={[styles.progressBarSubContainer, { width: percTotal + "%" }]}>

                </View>
            </View>
        </View >
    )
}

export default CourseInfo

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    textIcon: {
        fontSize: 35,
        padding: 20,
        borderRadius: 15,
        overflow: "hidden"
    },
    iconContainer: {
        justifyContent: "center",
        alignItems: "baseline",

    },
    categoryName: {
        fontFamily: "outfit-bold",
        fontSize: 24

    },
    categoryItem: {
        fontFamily: "outfit",
        fontSize: 16
    },
    amountContainer: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        marginTop: 15
    },
    progressBarMainContainer: {
        width: "100%",
        height: 10,
        backgroundColor: Colors.GRAY,
        borderRadius: 99,
        marginTop: 10,
        height: 15

    },
    progressBarSubContainer: {

        backgroundColor: Colors.PRIMARY,
        borderRadius: 99,
        height: 15
    }
})

