import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';

const Room = props => {
    return (
        <View style={styles.screen}>
            <TouchableOpacity
                style={styles.buttonWrapper}
                onPress={() => {
                    props.navigation.navigate("AddHouse");
                }}
            >
                <View style={styles.addHouse}>
                    <Text style={{ color: 'white' }}>
                        Add Room
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
    addHouse: {
        width: 140,
        padding: 6,
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',

    },
    buttonWrapper: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 10,
        right: 20,
    }
});

export default Room;