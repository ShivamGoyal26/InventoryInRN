import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar, TextInput, TouchableOpacity, Image
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'

const MainHeader = ({ props, HeaderText, lefticon,onPress }) => {
    return (
    
            <View style={{
                height: 56,
                backgroundColor: '#254260',
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 15,
                borderBottomLeftRadius: 12,
                borderBottomRightRadius: 12,
                width:390,
            }}>
                <Ionicons name={lefticon}
                    color="#D5E3F0" size={38} 
                    onPress={onPress}/>
                <Text style={{ color: '#D5E3F0', fontSize: 24, fontWeight: '500', marginLeft: 28 }}> {HeaderText} </Text>
            </View>
    )
}
export default MainHeader
