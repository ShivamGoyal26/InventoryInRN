import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Image } from 'react-native';
import Colors from '../constants/Colors';
import ROOMS from '../data/Rooms';
import HouseItem from '../components/HouseItem';
import { api, mediaBaseUrl } from '../API/api';
import Entypo from 'react-native-vector-icons/Entypo';

const Room = ({ route, navigation }) => {
    const imageData = route.params.image.images[0];
    const houseName = route.params.name;
    const houseId = route.params.id;
    console.log("this is the house id", houseId)

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
                endpoint: 'room/get',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjAxZDJiYjRmMmY2M2UxODQxZTM1NTQ2IiwiaWF0IjoxNjEzMDI4NzgyLCJleHAiOjE2MTQ3NTY3ODJ9.Gu5x05j4NEFMb6dYefaeFAx2AneZPTJmpPcZAr6P2pY`
                },
                data: {
                    "houseId": houseId,
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
                        style={{ width: 100, height: 100, borderRadius: 10 }}
                        source={{ uri: mediaBaseUrl + imageData }}
                    />
                </View>
                <View style={{ backgroundColor: 'white', margin: 15, borderRadius: 10 }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        data={response.data.data}
                        keyExtractor={item => item._id}
                        ItemSeparatorComponent={FlatListItemSeparator}
                        renderItem={itemData => {
                            return (
                                <HouseItem
                                    title={itemData.item.roomName}
                                    onAction={() => {
                                        navigation.navigate("Items", {
                                            roomId: itemData.item._id,
                                            houseId: houseId,
                                            houseName: houseName,
                                            roomName: itemData.item.roomName,
                                            image: itemData.item
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
                        navigation.navigate("AddRoom", { houseid: houseId, setData: fetchData.bind(this)});
                      
                    }}
                >
                    <View style={styles.addHouse}>
                        <Text style={{ color: 'white' }}>
                            Add Room
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
                    <Text>No Rooms Yet!</Text>
                    <View style={styles.buttonWrapper}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("AddRoom", { houseid: houseId });
                            }}
                        >
                            <View style={styles.addHouse}>
                                <Text style={{ color: 'white' }}>
                                    Add Room
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

export default Room;