import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const EditRoom = props => {
    return (
        <View style={styles.screen}>


            <TouchableOpacity
                style={styles.buttonWrapper}
                onPress={() => {
                    // props.navigation.navigate("AddHouse");
                }}
            >
                <View style={styles.edit}>
                    <AntDesign name="pluscircleo" size={20} color='white' />
                    <Text style={{ color: 'white' }}>
                        Items
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

    buttonWrapper: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 10,
        right: 20,
    },
    edit: {
        width: 100,
        padding: 6,
        borderRadius: 10,
        borderWidth: 2,
        backgroundColor: '#3673AB',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',

    },
});

export default EditRoom;