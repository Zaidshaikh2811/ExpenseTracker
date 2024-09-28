import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import PieChart from 'react-native-pie-chart';
import Colors from '../utils/Colors';
import { StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CircularChart = ({ categoryList = [] }) => {  // Default value added
    const widthAndHeight = 150;
    const [values, setValues] = useState([1]);
    const [sliceColor, setSliceColor] = useState([Colors.GRAY]);

    useEffect(() => {
        if (Array.isArray(categoryList) && categoryList.length > 0) {
            updateCircularChart();
        }
    }, [categoryList]);

    const updateCircularChart = () => {
        let newSliceColor = [];
        let newValues = [];
        let otherCost = 0;

        categoryList.forEach((item, index) => {
            let itemTotalCost = 0;
            if (index < 4) {
                item?.CategoryItems?.forEach((categoryItem) => {
                    itemTotalCost += categoryItem?.cost || 0;  // Added safeguard for cost
                });
                newSliceColor.push(Colors.COLOR_LIST[index]);
                newValues.push(itemTotalCost);
            } else {
                item?.CategoryItems?.forEach((categoryItem) => {
                    otherCost += categoryItem?.cost || 0;  // Added safeguard for cost
                });
            }
        });

        // Adding "Other" category
        if (otherCost > 0) {
            newSliceColor.push(Colors.COLOR_LIST[4]);
            newValues.push(otherCost);
        }

        // Update state at once
        setSliceColor(newSliceColor.length ? newSliceColor : [Colors.GRAY]);
        setValues(newValues.length ? newValues : [1]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>
                Total Estimate: <Text style={styles.boldText}> Rs</Text>
            </Text>
            <View style={styles.subContainer}>
                <PieChart
                    widthAndHeight={widthAndHeight}
                    series={values}
                    sliceColor={sliceColor}
                    coverRadius={0.65}
                    coverFill={'#FFF'}
                />
                <View style={styles.charContainer}>
                    {categoryList.length === 0 ? (
                        <View style={styles.noDataContainer}>
                            <MaterialCommunityIcons name='checkbox-blank-circle' size={24} color={Colors.GRAY} />
                            <Text> N/A</Text>
                        </View>
                    ) : (
                        categoryList.map((category, index) =>
                            index < 4 ? (
                                <View key={index} style={styles.charContainer}>
                                    <MaterialCommunityIcons name='checkbox-blank-circle' size={24} color={Colors.COLOR_LIST[index]} />
                                    <Text> {category.name}</Text>
                                </View>
                            ) : null
                        )
                    )}
                    {categoryList.length > 4 && (
                        <View style={styles.charContainer}>
                            <MaterialCommunityIcons name='checkbox-blank-circle' size={24} color={Colors.COLOR_LIST[4]} />
                            <Text> Other</Text>
                        </View>
                    )}
                </View>
            </View>
        </View>
    );
};

export default CircularChart;

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        backgroundColor: Colors.WHITE,
        padding: 20,
        width: '90%',
        marginHorizontal: 'auto',
        borderRadius: 15,
        elevation: 1,
    },
    titleText: {
        fontSize: 20,
        fontFamily: 'outfit',
    },
    boldText: {
        fontWeight: 'bold',
        fontFamily: 'outfit-bold',
    },
    subContainer: {
        display: 'flex',
        marginTop: 10,
        flexDirection: 'row',
        gap: 20,
    },
    charContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
    },
    noDataContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
    },
});
