import * as React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import authRouts from "../routs/authRouts";
import Intro from "../../screens/onboarding/Intro";
import { AuthContext } from "../../../context/AuthContext";
import SignUp from "../../screens/auth/SignUp";
import Login from "../../screens/auth/Login";
import OtpVerification from "../../screens/auth/OtpVerification";
import ForgetPassword from "../../screens/auth/ForgetPassword";
import ResetPassword from "../../screens/auth/ResetPassword";


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
            <Stack.Screen name={authRouts.login} component={Login} options={{ headerShown: false }} />
            <Stack.Screen name={authRouts.otpVerification} component={OtpVerification} options={{ headerShown: false }} />
            <Stack.Screen name={authRouts.forgotPassword} component={ForgetPassword} options={{ headerShown: false }} />
            <Stack.Screen name={authRouts.resetPassword} component={ResetPassword} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}