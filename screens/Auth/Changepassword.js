import React, { useState,useEffect} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar, TextInput, TouchableOpacity, Image,
} from 'react-native';
import MainHeader from '../../components/Header'
import Toast from 'react-native-simple-toast';
import { getApi } from '../Auth APi/AuthApi'
import { getJsonData } from '../asyncStorage/async';

const ChangePassword = ({ navigation }) => {
    const [token,setToken]=useState("")
    useEffect(()=>{
        getJsonData("tokan").then(Token =>{setToken(Token.token) })
    },[])


        const [oldpassword, setoldpassword] = useState("")
        const [newpassword, setnewpassword] = useState("")
        const config = {
            endPoint: 'auth/changePassword',
            bodydata: {
                oldPassword: oldpassword.toLowerCase(),
                newpassword: newpassword.toLowerCase()
            },
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            type: 'POST'
        }
        const changepassword = () => {
            console.log (token)
            if (oldpassword == "" || newpassword == "") {
                Toast.show("invalid details");
            }

            else {
                getApi(config).then(
                    function (json) {
                        if (json.status == 200) {
                            console.log("Response====>", json)
                            Toast.show(json.message)
                            navigation.navigate("Settings")
                        }
                        else {
                            Toast.show(json.message);
                            console.log("Invalid detail===>", json)
                        }
                    })
                    .catch((error) => {
                        console.log('error', error.message)
                    });
            }
        }

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ backgroundColor: '#ADD4F1', }}>
                    <MainHeader
                        lefticon={"arrow-back"}
                        onPress={() => navigation.navigate("Settings")}
                        HeaderText={"Change Password"} />
                </View>
                <View style={{ flex: 1, backgroundColor: "#ADD4F1", alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: "90%", height: 340, backgroundColor: 'white', borderRadius: 12, }}>
                        <View style={{ height: 85, justifyContent: "center", alignItems: 'center', }}>
                            <Text style={{ fontSize: 28, fontWeight: '600', color: "#343C44" }}> Change Password </Text>
                        </View>
                        <View style={{ height: 150, paddingHorizontal: 15, justifyContent: "space-around", }}>
                            <TextInput style={{ borderBottomWidth: 2, borderBottomColor: '#3673AB', height: 60, fontSize: 22, paddingHorizontal: 10 }}
                                placeholder={"Old Password"} placeholderTextColor="#AABBC6"
                                onChangeText={text => setoldpassword(text)}
                            />
                            <TextInput style={{ borderBottomWidth: 2, borderBottomColor: '#3673AB', height: 60, fontSize: 22, paddingHorizontal: 10 }}
                                placeholder={"New Password"} placeholderTextColor="#AABBC6"
                                onChangeText={text => setnewpassword(text)}
                            />
                        </View>
                        <TouchableOpacity style={{ width: 230, height: 50, backgroundColor: '#3673AB', borderRadius: 8, alignSelf: "center", alignItems: "center", justifyContent: "center", top: 15 }}
                            onPress={() => {
                                changepassword()
                            }}>
                            <Text style={{ color: "white", fontSize: 23, fontWeight: "500" }}>  Change Password</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>

        )

    }
    export default ChangePassword