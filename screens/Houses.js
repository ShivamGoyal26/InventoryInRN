import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';

const Houses = props => {
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
                        Add House
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#87CEFA'
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

export default Houses;