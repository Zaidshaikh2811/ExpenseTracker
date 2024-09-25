import { Link, useRouter } from 'expo-router';
import React, { useEffect } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import services from '../../utils/services';
import { client } from '../../utils/KindConfig';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../../utils/SupaBaseConfig';
import Header from '../../components/Header';
import Colors from '../../utils/Colors';
import CircularChart from '../../components/CircularChart';
import { Ionicons } from "@expo/vector-icons"

const Home = () => {
    const router = useRouter();
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
        const user = await client.getUserDetails();
        const { data, error } = await supabase.from('Category').select('*')
            .eq('createdBy', user.email)



    }

    return (
        <SafeAreaView style={{
            flex: 1
        }}>
            <View style={{

                padding: 20,
                backgroundColor: Colors.PRIMARY,
                height: 100,
                justifyContent: "center"
            }}>

                <Header />
            </View>
            <CircularChart />
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

