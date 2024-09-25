import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Colors from '../../utils/Colors';
import { TouchableOpacity } from 'react-native';
import { client } from '../../utils/KindConfig';
import services from '../../utils/services';
import { useRouter } from 'expo-router';

const LoginScreen = () => {
    const router = useRouter()

    const handleSignIn = async () => {
        const token = await client.login();
        if (token) {
            await services.storeData("login", 'true')
            router.replace('/')
        }
    }



    return (
        <View style={{
            display: "flex",
            alignItems: "center",
            marginTop: 20

        }}>
            <Image style={styles.bgImage} />
            <View style={{
                backgroundColor: Colors.PRIMARY,
                width: "100%",
                height: "100%",
                borderRadius: 30,
                padding: 20,
                marginTop: -30
            }}>
                <Text style={{
                    fontSize: 35,
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "white",
                    marginTop: 20,

                }}>Personal Budget Plan</Text>
                <Text style={{
                    fontSize: 18,
                    textAlign: "center",
                    color: "white",
                    marginTop: 20,

                    paddingHorizontal: 10,



                }}>
                    Personal Budget Plan is an app that helps you keep track of your expenses.
                </Text>
                <TouchableOpacity style={styles.button}
                    onPress={handleSignIn}>
                    <Text style={{
                        color: Colors.PRIMARY,
                        textAlign: "center",
                        fontSize: 15,
                        fontWeight: "bold",


                    }}>Login/SignUp</Text>
                </TouchableOpacity>
                <Text style={{
                    fontSize: 15,
                    textAlign: "center",
                    color: Colors.GRAY,
                    marginTop: 20,

                }}>By Login And SignUp you Will Agree To Our Terms and Conditions</Text>
            </View>
        </View>
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    bgImage: {
        width: 200,
        height: 400,
        marginTop: 30,
        borderWidth: 5,
        borderRadius: 20,
        borderColor: Colors.BLACK
    },
    button: {
        backgroundColor: "white",
        padding: 15,
        paddingHorizontal: 5,
        borderRadius: 50,
        marginTop: 20
    }
})
