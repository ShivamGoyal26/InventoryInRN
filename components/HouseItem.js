import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HouseItem = props => {
    return (
        <TouchableOpacity onPress={props.onAction}>
            <View style={styles.screen}>
                <Text>{props.title}</Text>
                <Ionicons name="home-outline" size={30} />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    screen: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 15,
    }
});

export default HouseItem;