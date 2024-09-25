import React, { useEffect, useState } from 'react'
import { Image, Text, View } from 'react-native'
import { client } from '../utils/KindConfig'
import Colors from '../utils/Colors'
import { Ionicons } from "@expo/vector-icons"

const Header = () => {

    const [user, setUser] = useState()

    useEffect(() => {
        getUserData()
    }, [])

    const getUserData = async () => {
        const user = await client.getUserDetails();
        setUser(user)

    }

    return (
        <View style={{
            display: "flex",
            flexDirection: "row",
            gap: 8,
            alignItems: "center"
        }}>
            <Image source={{ uri: user?.picture }} style={{
                width: 50, height: 50, borderRadius: 99
            }} />
            <View style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "85%"
            }}>
                <View>
                    <Text style={{ color: Colors.WHITE, fontSize: 16 }}>Welcome</Text>
                    <Text style={{ color: Colors.WHITE, fontSize: 20, fontWeight: "bold" }}>{user?.given_name}</Text>
                </View>
                <Ionicons name='notifications' size={24} color="white" />
            </View>
        </View>
    )
}

export default Header
