import { Stack } from 'expo-router'
import React from 'react'
import { useFonts } from 'expo-font';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeLayout = () => {

    const [fontsLoaded, fontError] = useFonts({
        'outfit': require("./../assets/fonts/Outfit-Regular.ttf"),
        'outfit-medium': require("./../assets/fonts/Outfit-Medium.ttf"),
        'outfit-bold': require("./../assets/fonts/Outfit-Bold.ttf")
    })

    return (
        <>
            <Stack screenOptions={{
                headerShown: false
            }} >
                <Stack.Screen name='(tabs)' options={{
                    headerShown: false
                }}></Stack.Screen>
                <Stack.Screen name='add-new-category' options={{
                    title: "Add New Category",
                    headerShown: true,
                    headerTitle: "Add New Category",
                    presentation: "modal"
                }} />
            </Stack>

        </>
    )
}

export default HomeLayout
