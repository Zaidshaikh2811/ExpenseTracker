import { Stack } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'

const HomeLayout = () => {
    return (
        <>
            <Stack screenOptions={{
                headerShown: false
            }} >
                <Stack.Screen name='(tabs)' options={{
                    headerShown: false
                }}></Stack.Screen>
            </Stack>

        </>
    )
}

export default HomeLayout
