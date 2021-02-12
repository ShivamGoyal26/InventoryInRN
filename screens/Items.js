import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Image } from 'react-native';
import Colors from '../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ITEMS from '../data/Item';
import HouseItem from '../components/HouseItem';
import { api, mediaBaseUrl } from '../API/api';

const EditRoom = ({ route, navigation }) => {

    const imageData = route.params.image.images[0];
    const houseId = route.params.houseId;
    const roomId = route.params.roomId;
    const roomName = route.params.roomName;
    const houseName = route.params.houseName;

    const [loading, setLoading] = useState(true);
    const [response, setResponse] = useState([]);
    const [status, setStatus] = useState(true);

    useEffect(() => {
        console.log("Houses are runing")
        fetchData();
    });

    const fetchData = async () => {

        try {
            data = await api({
                method: 'POST',
                endpoint: 'item/get',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjAxZDJiYjRmMmY2M2UxODQxZTM1NTQ2IiwiaWF0IjoxNjEzMDI4NzgyLCJleHAiOjE2MTQ3NTY3ODJ9.Gu5x05j4NEFMb6dYefaeFAx2AneZPTJmpPcZAr6P2pY`
                },
                data: {
                    "houseId": houseId,
                    'roomId': roomId,
                }
            });
        }
        catch (error) {
            Alert.alert(
                "Network Error!",
                "Please check your internet connection",

                [{ text: "OK", onPress: () => navigation.navigate('Login') }]
            );
        }
        setResponse(data)
        setStatus(data.message)
        setLoading(false)
    }



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

    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    return (
        response.data.totalCount ?
            <View style={styles.screen}>
                <View style={styles.image}>
                    <Image
                        style={{ width: 100, height: 100, borderRadius: 10}}
                        source={{ uri: mediaBaseUrl + imageData }}
                    />
                </View>
                <View style={{ margin: 15, }}>
                    <Text style={{ left: 15 }}>Items ({response.data.totalCount})</Text>
                </View>

                <View style={{ backgroundColor: 'white', margin: 15, borderRadius: 10 }}>

                    <FlatList
                        data={response.data.data}
                        keyExtractor={item => item.created_on}
                        ItemSeparatorComponent={FlatListItemSeparator}
                        renderItem={itemData => {
                            return (
                                <HouseItem
                                    title={itemData.item.itemName}
                                    onAction={() => {
                                        navigation.navigate("EditItem", {
                                            name: itemData.item.itemName,
                                            description: itemData.item.description,
                                            houseName: houseName,
                                            roomName: roomName,
                                            houseId: houseId,
                                            roomId: roomId,
                                            itemName: itemData.item.itemName,
                                            image: itemData.item,
                                        })
                                    }}
                                />
                            );
                        }}
                    />
                </View>
                <TouchableOpacity
                    style={styles.buttonWrapper}
                    onPress={() => {
                        navigation.navigate("AddItems", {
                            roomId: roomId,
                            houseId: houseId,
                            houseName: houseName,
                            roomName: roomName,
                        });
                    }}
                >
                    <View style={styles.edit}>
                        <AntDesign name="pluscircleo" size={20} color='white' />
                        <Text style={{ color: 'white' }}>
                            Items
                    </Text>
                    </View>
                </TouchableOpacity>
            </View> :
            <View style={styles.screen}>
                <View style={styles.image}>
                    <Image
                        style={{ width: 100, height: 100, borderRadius: 10 }}
                        source={{ uri: mediaBaseUrl + imageData }}
                    />
                </View>
                <View style={[styles.screen, { justifyContent: 'center', alignItems: 'center' }]}>
                    <Text>No Items Yet!</Text>
                    <View style={styles.buttonWrapper}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("AddItems", { roomId: roomId, houseId: houseId, setData: fetchData.bind(this) });
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
                </View>
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
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.accent,
    },
    image: {
        padding: 10,
        width: 120,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        left: 40,
    },
});

export default EditRoom;