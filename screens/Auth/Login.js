import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar, TextInput, TouchableOpacity, Image
} from 'react-native';
import Toast from 'react-native-simple-toast';
import { storeJsonData } from '../asyncStorage/async';
import { getApi } from '../Auth APi/AuthApi'





const Login = ({ navigation }) => {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const config = {
        endPoint: 'auth/login',
        bodydata: {
            email: email.toLowerCase(),
            password: password.toLowerCase()
        },
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        type: 'POST'
    }

    const login = () => {
        console.log(email, password)
        if (email == "" || password == "") {
            Toast.show("Invalid details");
        }

        else {

            getApi(config).then(
                async function (json) {
                    if (json.status == 200) {
                        console.log("Response====>", json)
                        await storeJsonData("tokan", json.data)
                        navigation.navigate("Drawer")
                        Toast.show(json.message);
                    }
                    else {
                        Toast.show(json.message);
                    }
                })
                .catch((error) => {
                    console.log('error', error.message)
                });


        }

    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1, backgroundColor: '#254260', justifyContent: 'center', alignItems: "center" }}>
                <View style={{ width: "90%", height: 470, backgroundColor: 'white', borderRadius: 12 }}>
                    <View style={{ height: 95, justifyContent: "center", alignItems: 'center', }}>
                        <Text style={{ fontSize: 28, fontWeight: '700', color: "#343C44" }}> Login  </Text>
                    </View>
                    <View style={{ height: 145, padding: 20, justifyContent: "space-around", }}>
                        <TextInput style={{ borderBottomWidth: 2, borderBottomColor: '#3673AB', height: 60, fontSize: 22, paddingHorizontal: 10 }}
                            placeholder={"Email"} placeholderTextColor="#AABBC6"
                            onChangeText={text => setemail(text)}
                        />
                        <TextInput style={{ borderBottomWidth: 2, borderBottomColor: '#3673AB', height: 60, fontSize: 22, paddingHorizontal: 10 }}
                            placeholder={"Password"} placeholderTextColor="#AABBC6"
                            onChangeText={text => setpassword(text)}
                        />
                    </View>

                    <TouchableOpacity onPress={() => navigation.navigate("Forgotpassword")}>
                        <Text style={{ alignSelf: 'flex-end', paddingHorizontal: 15, fontWeight: "400", color: '#343C44' }}>  Forgot Password ?</Text>
                    </TouchableOpacity>

                    <View style={{ height: 80, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                        <Image source={require("../../Assets/facebook.jpg")}
                            style={{ width: 50, height: 50 }} />
                        <Image source={require("../../Assets/google.png")}
                            style={{ width: 40, height: 40 }} />
                    </View>

                    <TouchableOpacity style={{ width: 190, height: 50, backgroundColor: '#3673AB', borderRadius: 8, alignSelf: "center", alignItems: "center", justifyContent: "center" }}
                        onPress={() => login()}>
                        <Text style={{ color: "white", fontSize: 23, fontWeight: "500" }}>Login</Text>
                    </TouchableOpacity>
                    <View style={{ height: 80, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                        <Text style={{ fontWeight: "500", color: "#343C44", fontSize: 15 }}>  No account yet?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                            <Text style={{ fontWeight: "500", color: "#7eddf2", fontSize: 15 }}> SignUp</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>


    )

}
export default Login