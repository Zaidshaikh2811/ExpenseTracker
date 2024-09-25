import { Link, useRouter } from 'expo-router';
import React, { useEffect } from 'react'
import { Button, Text, View } from 'react-native'
import services from '../../utils/services';
import { client } from '../../utils/KindConfig';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../../utils/SupaBaseConfig';
import Header from '../../components/Header';
import Colors from '../../utils/Colors';

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
        <SafeAreaView>
            <View style={{
                padding: 20,
                backgroundColor: Colors.PRIMARY,
                height: 100,
                justifyContent: "center"
            }}>

                <Header />
            </View>
        </SafeAreaView>
    )
}

export default Home;

