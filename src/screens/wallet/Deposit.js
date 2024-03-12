import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import colors from "../../../assets/colors/colors";
import { AuthContext } from "../../../context/AuthContext";
import mainRouts from "../../navigation/routs/mainRouts";
import endpoints from "../../../assets/endpoints/endpoints";
import Button from "../../component/Button";
import InputField from "../../component/InputField";

const Deposit = ({ navigation }) => {
    const { colorScheme, user, token } = useContext(AuthContext);

    const validationSchema = Yup.object().shape({
        amount: Yup.number()
            .required('Amount is required')
            .positive('Amount must be a positive number')
            .integer('Amount must be an integer')
    });

    const deposit = (amount) => {
        fetch(endpoints.baseUrl + endpoints.fundwallet, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                dispatchid: user?.id,
                amount: parseInt(amount),
                email: user?.email,
                usertype: "dispatch"
            }),
        }).then(res => res.json())
            .then(resJson => {
                console.log('resJson', resJson);
                if (resJson.status) {
                    navigation.navigate(mainRouts.browser, {
                        url: resJson.data,
                        title: 'Deposit'
                    });
                }
            })
            .catch(err => {
                console.log('err', err);
            });
    };

    return (
        <View style={{
            flex: 1,
            backgroundColor: colors[colorScheme].background,
        }}>
            <Formik
                initialValues={{ amount: '' }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    deposit(values.amount);
                    setSubmitting(false);
                }}
            >
                {({ values, handleChange,isSubmitting, isValid, handleSubmit, errors, touched }) => (
                    <>
                        <View style={{
                            backgroundColor: colors[colorScheme].primary,
                            padding: 20,
                            paddingBottom: 30,
                            borderBottomLeftRadius: 30,
                            borderBottomRightRadius: 30,
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                width: '100%',
                                justifyContent: 'center',
                            }}>
                                <TouchableOpacity style={{
                                    position: 'absolute',
                                    left: 0,
                                }}
                                    onPress={() => navigation.goBack()}>
                                    <Image
                                        source={require('../../../assets/images/back.png')}
                                        style={{
                                            width: 24,
                                            height: 24,
                                            resizeMode: "contain",
                                            tintColor: colors[colorScheme].white,
                                        }}
                                    />
                                </TouchableOpacity>
                                <Text style={{
                                    color: colors[colorScheme].white,
                                    fontSize: 24,
                                    fontFamily: 'Inter-Bold',
                                }}>Deposit</Text>
                            </View>
                        </View>

                        <View style={{
                            flex: 1,
                            justifyContent: 'space-between'
                        }}>
                            <View>
                                <Text style={{
                                    color: colors[colorScheme].textDark,
                                    fontSize: 18,
                                    fontFamily: 'Inter-Bold',
                                    marginHorizontal: 20,
                                    marginTop: 50,
                                }}>Enter amount to deposit</Text>

                                <Field
                                    name="amount"
                                >
                                    {({ field }) => (
                                        <InputField
                                            theme={colorScheme}
                                            value={field.value}
                                            onChangeText={field.onChange('amount')}
                                            onBlur={field.onBlur('amount')}
                                            placeholder="Enter amount"
                                            containerStyle={styles.input}
                                            keyboardType="number-pad"
                                        />
                                    )}
                                </Field>
                            </View>

                            <Button
                                title={`Proceed`}
                                buttonStyle={{
                                    marginTop: 30,
                                    marginHorizontal: 20,
                                    borderRadius: 30,
                                    marginBottom: 50,
                                }}
                                loading={isSubmitting}
                                enabled={isValid && !isSubmitting}
                                textColor={colors[colorScheme].textDark}
                                buttonColor={colors[colorScheme].primary}
                                onPress={handleSubmit}
                            />
                        </View>
                    </>
                )}
            </Formik>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        marginTop: 20,
        marginHorizontal: 20,
    }
});

export default Deposit;
