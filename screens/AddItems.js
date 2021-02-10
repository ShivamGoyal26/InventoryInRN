import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons'

const AddItems = props => {
    return (
        <View style={styles.screen}>

            <View style={{ margin: 15 }}>
                <Text>Location: </Text>
            </View>

            <View style={{ marginHorizontal: 15 }}>
                <Text>
                    Item Name
            </Text>
            </View>

            <View style={styles.textInput}>
                <TextInput placeholder="Add name" />
            </View>

            <View style={styles.camera}>
                <Text>Photos</Text>
                <TouchableOpacity onPress={() => { }}>
                    <Ionicons name="camera-outline" size={24} />
                </TouchableOpacity>
            </View>

            <View style={{ marginHorizontal: 15, marginVertical: 15 }}>
                <Text>
                    Description
            </Text>
            </View>

            <View style={styles.textInput}>
                <TextInput placeholder="Add name" />
            </View>

            <View style={styles.buttonWrapper}>
                <TouchableOpacity
                    onPress={() => {
                        // props.navigation.navigate("AddHouse");
                    }}
                >

                    <View style={styles.save}>
                        <Text style={{ color: 'white' }}>
                            Save And Add Another
                    </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        props.navigation.pop();
                    }}
                >

                    <View style={styles.save}>
                        <Text style={{ color: 'white' }}>
                            Save
                    </Text>
                    </View>
                </TouchableOpacity>

            </View>

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
        marginVertical: 20,
        backgroundColor: 'white',
        marginHorizontal: 15,
        borderRadius: 10,
        paddingHorizontal: 15,
    },
    buttonWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        position: 'absolute',
        bottom: 25,
        width: '100%'
    },
    save: {
        padding: 6,
        borderRadius: 10,
        borderWidth: 2,
        backgroundColor: "#00C03A",
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

export default AddItems;