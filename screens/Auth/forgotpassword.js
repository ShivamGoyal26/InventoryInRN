import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar, TextInput, TouchableOpacity, Image, Alert
} from 'react-native';
import Toast from 'react-native-simple-toast';
import { getApi } from '../Auth APi/AuthApi'


const Forgotpassword = ({ navigation }) => {
const [email,setemail]=useState("")
const config = {
    endPoint: 'auth/forgotpass',
    bodydata: {
        email: email.toLowerCase(),
    },
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    type: 'POST'
}

const send =()=>{
    console.log(email,)
    if (email == "") {
        Toast.show("Invalid details");
    }

    else {
        getApi(config).then(
            function (json) {
                if (json.status == 200) {
                    console.log("Response====>", json)
                    Toast.show (json.message)
                    navigation.navigate("Login")
                }
                else {
                    Toast.show(json.message);
                  console.log ( "Invalid detail===>" , json )
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
                <View style={{ width: "90%", height: 300, backgroundColor: 'white', borderRadius: 12 }}>
                    <View style={{ height: 95, justifyContent: "center", alignItems: 'center', }}>
                        <Text style={{ fontSize: 28, fontWeight: '600', color: "#343C44" }}> Forgot password </Text>
                    </View>
                    <View style={{ height: 170, paddingHorizontal: 15, justifyContent: "space-around", }}>
                        <TextInput style={{ borderBottomWidth: 2, borderBottomColor: '#3673AB', height: 60, fontSize: 22, paddingHorizontal: 10 }}
                            placeholder={"Email"} placeholderTextColor="#AABBC6"
                            onChangeText={text=>setemail(text)}
                        />
                        <TouchableOpacity style={{ width: 190, height: 50, backgroundColor: '#3673AB', borderRadius: 8, alignSelf: "center", alignItems: "center", justifyContent: "center" }}
                        onPress={()=> send()} >
                            <Text style={{ color: "white", fontSize: 23, fontWeight: "500" }}>  Send</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>

    )
}
export default Forgotpassword