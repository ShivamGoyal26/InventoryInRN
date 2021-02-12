import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar, TextInput, TouchableOpacity, Image, Alert
} from 'react-native';
import { getApi } from '../Auth APi/AuthApi'
import Toast from 'react-native-simple-toast';


const SignUp = ({ navigation }) => {

    const [UserSignUp, setUserSignUp] = useState({
        firstName: "",
        email: "",
        password: "",
        confirmpassword: ""

    })

    const config = {
        endPoint: 'auth/register',
        bodydata: {
            firstName: UserSignUp.firstName.toLowerCase(),
            email: UserSignUp.email.toLowerCase(),
            password: UserSignUp.password.toLowerCase()
        },
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        type: 'POST'
    }

    const SignUp = () => {
        console.log(UserSignUp)
        if (UserSignUp.firstName ==""  || UserSignUp.email=="" &&
            UserSignUp.password=="" || UserSignUp.confirmpassword=="" ) {
            Toast.show("Invalid details");
        }

        else if (UserSignUp.password == UserSignUp.confirmpassword) {
            getApi(config).then(
                function (json) { console.log("Response====>", json) },
            );
            navigation.navigate("Login")
        }
        else {
            Toast.show("password didn't match");
        }

    }
   

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1, backgroundColor: '#254260', justifyContent: 'center', alignItems: "center" }}>
                <View style={{ width: "90%", height: 490, backgroundColor: 'white', borderRadius: 12 }}>
                    <View style={{ height: 95, justifyContent: "center", alignItems: 'center', }}>
                        <Text style={{ fontSize: 28, fontWeight: '600' }}> Sign Up  </Text>
                    </View>
                    <View style={{ height: 280, paddingHorizontal: 15, justifyContent: "space-around", bottom: 5, }}>
                        <TextInput style={{ borderBottomWidth: 2, borderBottomColor: '#3673AB', height: 60, fontSize: 22, paddingHorizontal: 10 }}
                            placeholder={"Name"} placeholderTextColor="#AABBC6"
                            onChangeText={text => setUserSignUp({ ...UserSignUp, firstName: text })}
                        />
                        <TextInput style={{ borderBottomWidth: 2, borderBottomColor: '#3673AB', height: 60, fontSize: 22, paddingHorizontal: 10 }}
                            placeholder={"Email"} placeholderTextColor="#AABBC6" 
                            onChangeText={text => setUserSignUp({ ...UserSignUp, email: text  })}
                        />
                        <TextInput style={{ borderBottomWidth: 2, borderBottomColor: '#3673AB', height: 60, fontSize: 22, paddingHorizontal: 10 }}
                            placeholder={"Password"} placeholderTextColor="#AABBC6" 
                            onChangeText={(text) => setUserSignUp({ ...UserSignUp, password: (text) })}
                        />
                        <TextInput style={{ borderBottomWidth: 2, borderBottomColor: '#3673AB', height: 60, fontSize: 22, paddingHorizontal: 10 }}
                            placeholder={"Confirm Password"} placeholderTextColor="#AABBC6"
                            onChangeText={(text) => setUserSignUp({ ...UserSignUp, confirmpassword: (text) })}
                        />
                    </View>
                    <View style={{ height: 110, justifyContent: 'space-around' }}>
                        <TouchableOpacity style={{ width: 190, height: 50, backgroundColor: '#3673AB', borderRadius: 8, alignSelf: "center", alignItems: "center", justifyContent: "center" }}
                            onPress={() => { SignUp() }}>
                            <Text style={{ color: "white", fontSize: 23, fontWeight: "500" }}>  Signup</Text>
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                            <Text style={{ fontWeight: "500", color: "#343C44", fontSize: 15 }}> Already a member?</Text>
                            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                                <Text style={{ fontWeight: "500", color: "#7eddf2", fontSize: 15 }}> Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </View>
        </SafeAreaView>
    )
}
export default SignUp