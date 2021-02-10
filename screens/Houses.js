import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Colors from '../constants/Colors';
import HOUSES from '../data/dummy-data';

import HouseItem from '../components/HouseItem';

const Houses = props => {

    const FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "grey",
                }}
            />
        );
    }

    return (
        <View style={styles.screen}>
            <View style={{ backgroundColor: 'white', margin: 15, borderRadius: 10 }}>
                <FlatList
                    data={HOUSES}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={FlatListItemSeparator}
                    renderItem={itemData => {
                        return (
                            <HouseItem
                                title={itemData.item.name}
                                onAction={() => {
                                    props.navigation.navigate("Room", {name: itemData.item.name})
                                }}
                            />
                        );
                    }}
                />
            </View>

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

export default Houses;