import React, { useState } from 'react';
import { Image, Linking, StyleSheet, Text, View } from 'react-native';
import Colors from '../../utils/Colors';
import { EvilIcons } from "@expo/vector-icons";
import { TouchableOpacity } from 'react-native';
import { supabase } from '../../utils/SupaBaseConfig';

const placeholderImage = "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg";

const CourseItemList = ({ categoryData }) => {
    const [expandItem, setExpandItem] = useState(null); // Initialize expandItem to null
    const [imageErrors, setImageErrors] = useState(Array(categoryData?.CategoryItems?.length).fill(false)); // Track image load errors

    const handleToggleExpand = (index) => {
        // Toggle between expanding and collapsing the same item
        setExpandItem(expandItem === index ? null : index);
    };

    const onDeleteItem = async (id) => {
        const { error } = await supabase.from("CategoryItems").delete().eq('id', id);
        if (error) {
            console.error("Error deleting item:", error);
        } else {
            // Optionally refresh or update the state here after deletion
        }
    };

    const handleImageError = (index) => {
        const newImageErrors = [...imageErrors];
        newImageErrors[index] = true; // Set error flag for the specific index
        setImageErrors(newImageErrors);
    };


    const openURL = (url) => {
        if (url) {
            Linking.openURL(url);
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Item List</Text>
            <View>
                {categoryData?.CategoryItems && categoryData.CategoryItems.length > 0 ? (
                    categoryData.CategoryItems.map((item, index) => (
                        <View key={index}>
                            <TouchableOpacity onPress={() => handleToggleExpand(index)} style={styles.imageContainer}>
                                <Image
                                    source={{ uri: imageErrors[index] || !item.image ? placeholderImage : item.image }}
                                    style={styles.image}
                                    onError={() => handleImageError(index)} // Set error flag if image load fails
                                />
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.name}>{item.name}</Text>
                                    <Text style={styles.url}>{item.url}</Text>
                                </View>
                                <Text style={styles.cost}>Rs: {item.cost}</Text>
                            </TouchableOpacity>

                            {expandItem === index && (
                                <View style={styles.actionItemContainer}>
                                    <TouchableOpacity onPress={() => onDeleteItem(item.id)}>
                                        <EvilIcons name="trash" size={34} color="red" />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => openURL(item.url)}>
                                        <EvilIcons name="external-link" size={34} color="blue" />
                                    </TouchableOpacity>
                                </View>
                            )}

                            {categoryData.CategoryItems.length - 1 !== index && (
                                <View style={styles.separator} />
                            )}
                        </View>
                    ))
                ) : (
                    <Text style={styles.noItemsText}>No Items Available</Text>
                )}
            </View>
        </View>
    );
};

export default CourseItemList;

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    heading: {
        fontFamily: "outfit-bold",
        fontSize: 20,
    },
    image: {
        width: 100,
        height: 80,
    },
    imageContainer: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    name: {
        fontSize: 16,
        fontFamily: "outfit-bold",
    },
    url: {
        fontSize: 14,
        fontFamily: "outfit-regular",
        color: 'black',
    },
    cost: {
        fontSize: 16,
        fontFamily: "outfit-bold",
    },
    actionItemContainer: {
        display: "flex",
        flexDirection: "row",
        gap: 10,
        justifyContent: "flex-end",
        marginTop: 10,
    },
    separator: {
        borderWidth: 1,
        marginTop: 10,
        borderColor: Colors.GRAY,
    },
    noItemsText: {
        fontFamily: "outfit-bold",
        fontSize: 25,
        color: Colors.GRAY,
    },
});
