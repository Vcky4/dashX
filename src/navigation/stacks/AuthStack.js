import * as React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import authRouts from "../routs/authRouts";
import Intro from "../../screens/onboarding/Intro";
import { AuthContext } from "../../../context/AuthContext";
import SignUp from "../../screens/auth/SignUp";


const Stack = createNativeStackNavigator();

export default AuthStack = () => {
    const { isOnboarded } = React.useContext(AuthContext)
    return (
        <Stack.Navigator>
            {
                isOnboarded
                    ? <Stack.Screen name={authRouts.signUp} component={SignUp} options={{ headerShown: false }} />
                    : <Stack.Screen name={authRouts.intro} component={Intro} options={{ headerShown: false }} />
            }
        </Stack.Navigator>
    );
}