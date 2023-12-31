import * as React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import authRouts from "../routs/authRouts";
import Intro from "../../../src/screens/auth/Intro";



const Stack = createNativeStackNavigator();

export default AuthStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name={authRouts.intro} component={Intro} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}