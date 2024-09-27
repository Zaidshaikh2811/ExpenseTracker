import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Colors from '../../utils/Colors';

const CourseItemList = ({ categoryData }) => {
    const placeholderImage = "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg";

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Item List</Text>
            <View>
                {categoryData?.CategoryItems?.map((item, index) => {
                    const [imageError, setImageError] = useState(false); // Track image load errors

                    return (
                        <View key={index}>
                            <View style={styles.imageContainer}>
                                <Image
                                    source={{ uri: imageError || !item.image ? placeholderImage : item.image }}
                                    style={styles.image}
                                    onError={() => setImageError(true)} // Set error flag if image load fails
                                />
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.name}>{item.name}</Text>
                                    <Text style={styles.url}>{item.url}</Text>
                                </View>
                                <Text style={styles.cost}>Rs:{item.cost}</Text>
                            </View>
                            {categoryData?.CategoryItems?.length - 1 != index &&
                                <View style={{ borderWidth: 1, marginTop: 10, borderColor: Colors.GRAY }}></View>
                            }

                        </View>
                    );
                })}
            </View>
        </View>
    );
}

export default CourseItemList;

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    heading: {
        fontFamily: "outfit-bold",
        fontSize: 20,
    },
    image: {
        width: 100,
        height: 80,

    },
    noImage: {
        backgroundColor: Colors.GRAY,
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        display: "flex",
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 10
    },
    name: {
        fontSize: 16,
        fontFamily: "outfit-bold",
    },
    url: {
        fontSize: 14,
        fontFamily: "outfit-regular",
        color: "black"
    },
    cost: {
        fontSize: 16,
        fontFamily: "outfit-bold",

    }
});
