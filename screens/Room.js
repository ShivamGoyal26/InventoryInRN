import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Colors from '../constants/Colors';
import ROOMS from '../data/Rooms';
import HouseItem from '../components/HouseItem';

const Room = props => {

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
                    data={ROOMS}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={FlatListItemSeparator}
                    renderItem={itemData => {
                        return (
                            <HouseItem
                                title={itemData.item.name}
                                onAction={() => {
                                    props.navigation.navigate("EditRoom", { name: itemData.item.name })
                                }}
                            />
                        );
                    }}
                />
            </View>

            <TouchableOpacity
                style={styles.buttonWrapper}
                onPress={() => {
                    props.navigation.navigate("AddRoom");
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