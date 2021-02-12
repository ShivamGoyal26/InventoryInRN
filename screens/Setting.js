
import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar, TextInput, TouchableOpacity, Image,
} from 'react-native';
import MainHeader from '../components/Header';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { removeValue } from './asyncStorage/async';


const Setting = ({ navigation }) => {
    const logout = async () => {
        await removeValue("tokan").then(removetokan => {
            console.log(removetokan)
            if (removetokan == null){
                navigation.goBack()
                navigation.navigate("Login")
             }
        })
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ backgroundColor: '#ADD4F1', }}>
                <MainHeader
                    lefticon={"arrow-back"}
                    HeaderText={"Settings"}
                    onPress={() => navigation.navigate("Houses")} />
            </View>
            <View style={{ flex: 1, backgroundColor: "#ADD4F1", }}>
                <TouchableOpacity style={{ height: 90, width: 400, flexDirection: 'row', alignItems: 'center', paddingStart: 28 }}
                    onPress={() => navigation.navigate("ChangePassword")}>
                    <FontAwesome name={"lock"} size={28} color={"#254260"} />
                    <Text style={{ fontSize: 23, fontWeight: '700', marginLeft: 10, color: '#343C44' }}> Change Password</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ height: 60, width: 400, flexDirection: 'row', alignItems: 'center', paddingStart: 28 }}
                    onPress={() => logout()}>
                    <MaterialCommunityIcons name={"logout"} size={28} color={"#254260"} />
                    <Text style={{ fontSize: 23, fontWeight: '700', marginLeft: 10, color: '#343C44' }}> Logout</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
}

export default Setting;