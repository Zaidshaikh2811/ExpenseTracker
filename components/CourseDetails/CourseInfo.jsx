import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Ionicons } from "@expo/vector-icons"
import Colors from '../../utils/Colors'


const CourseInfo = ({ categoryData }) => {

    const [totalCost, setTotalCost] = useState();
    const [percTotal, setPercTotal] = useState(0);



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
                <Ionicons name='trash' size={30} color="red" />
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

