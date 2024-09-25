import React, { useState } from 'react'
import { Text, View } from 'react-native'
import PieChart from 'react-native-pie-chart'
import Colors from '../utils/Colors';
import { StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons"

const CircularChart = () => {

    const widthAndHeight = 150;
    const [values, setValues] = useState([1])
    const [sliceColor, setSliceColor] = useState([Colors.GRAY])

    return (
        <View style={styles.container}>
            <Text style={{
                fontSize: 20,
                fontFamily: "outfit"

            }}>Total Estimate: <Text style={{
                fontWeight: "bold",
                fontFamily: "outfit-bold"
            }}> Rs</Text></Text>
            <View style={styles.subContainer}>

                <PieChart
                    widthAndHeight={widthAndHeight}
                    series={values}
                    sliceColor={sliceColor}
                    coverRadius={0.65}
                    coverFill={'#FFF'}
                />
                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 5,
                    alignItems: "center"
                }}>
                    <MaterialCommunityIcons
                        name='checkbox-blank-circle'
                        size={24} color={Colors.GRAY} />
                    <Text> N/A</Text>
                </View>
            </View>
        </View>
    )
}

export default CircularChart;

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        backgroundColor: Colors.WHITE,
        padding: 20,
        width: "90%",
        marginHorizontal: "auto",
        borderRadius: 15,
        elevation: 1

    },
    subContainer: {
        display: "flex",
        marginTop: 10,
        flexDirection: "row",
        gap: 40


    }
})
