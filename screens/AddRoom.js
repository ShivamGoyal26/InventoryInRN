import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons'

const AddRoom = props => {
    return (
        <View style={styles.screen}>

            <View style={styles.text}>
                <Text style={{ fontSize: 19, }}>
                    Room Name
            </Text>
            </View>

            <View style={styles.textInput}>
                <TextInput placeholder="Add name" />
            </View>

            <View style={styles.camera}>
                <Text>Photos</Text>
                <TouchableOpacity onPress={() => {}}>
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
        backgroundColor: 'green',
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

export default AddRoom;