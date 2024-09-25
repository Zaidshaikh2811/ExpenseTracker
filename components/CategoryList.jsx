import { useRouter } from 'expo-router';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, Touchable, View } from 'react-native';

const CategoryList = ({ categoryList }) => {
    const router = useRouter();
    const onCategoryClick = (category) => {
        router.push({
            pathname: "/category-detail",
            params: {
                categoryId: category.id
            }
        })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Latest Budget</Text>
            <View>
                {categoryList.map((category, index) => {
                    return (
                        <TouchableOpacity onPress={() => onCategoryClick(category)} key={index} style={styles.details}>
                            <View style={styles.iconContainer}>
                                <Text style={[styles.iconText, { backgroundColor: category?.color }]}>
                                    {category.icon}
                                </Text>
                            </View>
                            <View style={styles.categoryInfo}>
                                <View>
                                    <Text style={styles.categoryName}>{category.name}</Text>
                                    <Text style={styles.itemCount}>
                                        {category?.CategoryItems?.length ?? 0} items
                                    </Text>
                                </View>
                                <Text style={styles.budgetText}>$50,000</Text>
                                {/* You can dynamically replace "$50,000" with actual budget if available */}
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

export default CategoryList;

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        width: '90%',
        alignSelf: 'center',
    },
    title: {
        fontFamily: 'outfit-bold',
        fontSize: 20,
        marginBottom: 10,
    },
    details: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#f9f9f9',

    },
    iconText: {
        fontSize: 35,
        padding: 16,
        borderRadius: 15, // Circular icon
        color: 'white',
        textAlign: 'center',
        overflow: "hidden"
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    categoryInfo: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-between',

    },
    categoryName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemCount: {
        fontSize: 14,
        color: 'gray',
        marginTop: 4,
    },
    budgetText: {
        fontSize: 17,
        color: '#333',
        marginTop: 6,
        fontFamily: "outfit-bold"
    },
});
