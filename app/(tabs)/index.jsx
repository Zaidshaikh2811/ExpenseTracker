import { Link, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react'
import { Button, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import services from '../../utils/services';
import { client } from '../../utils/KindConfig';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../../utils/SupaBaseConfig';
import Header from '../../components/Header';
import Colors from '../../utils/Colors';
import CircularChart from '../../components/CircularChart';
import { Ionicons } from "@expo/vector-icons"
import CategoryList from '../../components/CategoryList';

const Home = () => {
    const router = useRouter();
    const [categoryList, setCategoryList] = useState();
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        checkUserAuth();
        getCategoryList()
    }, [])

    const handleLogout = async () => {
        const logout = await client.logout();
        if (logout) {
            const result = await services.storeData('login', "false")

            if (result !== "true") {


                router.replace('/login')
            }
        }
    }

    const checkUserAuth = async () => {
        const result = await services.getData('login');
        if (result) {

        } else {
            router.replace('/login')

        }

    }


    const getCategoryList = async () => {
        setLoading(true)
        const user = await client.getUserDetails();
        const { data, error } = await supabase.from('Category').select('*,CategoryItems(*)')
            .eq('createdBy', user.email)


        setCategoryList(data)
        setLoading(false)

    }

    return (
        <SafeAreaView style={{
            flex: 1
        }}>
            <ScrollView refreshControl={
                <RefreshControl onRefresh={() => getCategoryList()} refreshing={loading} />
            }>

                <View style={{

                    padding: 20,
                    backgroundColor: Colors.PRIMARY,
                    height: 150,
                    justifyContent: "center"
                }}>

                    <Header />
                </View>
                <View style={{

                    padding: 20,
                    marginTop: -75
                }}>

                    <CircularChart categoryList={categoryList} />
                    {
                        categoryList &&
                        <CategoryList categoryList={categoryList} />
                    }
                </View>
            </ScrollView>

            <Link href={'/add-new-category'} style={styles.adBtnContainer}>
                <Ionicons name='add-circle' size={54} color={Colors.PRIMARY} />
            </Link>
        </SafeAreaView>
    )
}

export default Home;

const styles = StyleSheet.create({
    adBtnContainer: {
        position: "absolute",
        bottom: 10,
        right: 10
    }
})

