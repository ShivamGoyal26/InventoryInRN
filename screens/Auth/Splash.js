import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar, TextInput, TouchableOpacity, Image, Alert
} from 'react-native';
import Toast from 'react-native-simple-toast';
import { getJsonData } from '../asyncStorage/async';

const Splash=({navigation})=>{

 const Getdata =async () =>{

 await  getJsonData("tokan").then(getdata =>{
     console.log("Getdata==>",   getdata) 
     if (getdata == null){
        navigation.navigate("Login")
     }
     else {
         navigation.navigate("Drawer")
     }
    })
 }  

useEffect(() => {   
         Getdata()  
  
},[]);


    return (
        <View style={{flex:1}}>

        </View>
    )
}
export default Splash