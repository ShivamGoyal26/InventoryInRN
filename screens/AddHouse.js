import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons'

import Colors from '../constants/Colors';

const AddHouse = props => {

    const [houseName, setHouseName] = useState('');
    console.log(houseName)

    const DismissKeyboard = ({ children }) => (
        <TouchableWithoutFeedback
            onPress={() => Keyboard.dismiss()}> {children}
        </TouchableWithoutFeedback>
    );

    return (
        // <DismissKeyboard>
            <View style={styles.screen}>
                <View style={styles.text}>
                    <Text style={{ fontSize: 19, }}>House Name</Text>
                </View>

                <View style={styles.textInput}>
                    <TextInput placeholder="Add name" onChangeText={text => setHouseName(text)} />
                </View>

                <View style={styles.camera}>
                    <Text>Photos</Text>
                    <TouchableOpacity onPress={() => { }}>
                        <Ionicons name="camera-outline" size={24} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.buttonWrapper}
                    onPress={() => {
                        props.navigation.navigate("AddHouse");
                    }}
                >

                    <View style={styles.save}>
                        <Text style={{ color: 'white' }}>
                            Save
                    </Text>
                    </View>
                </TouchableOpacity>
            </View>
        // </DismissKeyboard>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.accent,
    },
    text: {
        marginHorizontal: 20,
        marginVertical: 30,
    },
    textInput: {
        backgroundColor: 'white',
        marginHorizontal: 15,
        borderRadius: 10,
        paddingHorizontal: 15,
    },
    buttonWrapper: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 10,
        right: 20,
    },
    save: {
        width: 100,
        padding: 6,
        borderRadius: 10,
        borderWidth: 2,
        backgroundColor: '#00C03A',
        alignItems: 'center',
        justifyContent: 'center',

    },
    camera: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20,
        top: 10,
    }
});

export default AddHouse;