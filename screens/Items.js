import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Colors from '../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ITEMS from '../data/Item';
import HouseItem from '../components/HouseItem';

const EditRoom = props => {

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
            <View style={{margin: 15,}}>
            <Text style = {{left:15}}>Items ({ITEMS.length})</Text>
            </View>
            <View style={{ backgroundColor: 'white', margin: 15, borderRadius: 10 }}>

                <FlatList
                    data={ITEMS}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={FlatListItemSeparator}
                    renderItem={itemData => {
                        return (
                            <HouseItem
                                title={itemData.item.name}
                                onAction={() => {
                                    props.navigation.navigate("EditItem", { name: itemData.item.name, description: itemData.item.description })
                                }}
                            />
                        );
                    }}
                />
            </View>
            <TouchableOpacity
                style={styles.buttonWrapper}
                onPress={() => {
                    props.navigation.navigate("AddItems");
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