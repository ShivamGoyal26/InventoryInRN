import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Alert } from 'react-native';
import Colors from '../constants/Colors';
import { api, } from '../API/api';

import HouseItem from '../components/HouseItem';

const Houses = props => {

    const [loading, setLoading] = useState(true);
    const [response, setResponse] = useState(null);
    const [status, setStatus] = useState(true);


    useEffect(() => {
        console.log("Houses are runing")
        fetchData();
    });

    const fetchData = async () => {

        try {
            data = await api({
                method: 'POST',
                endpoint: 'house/get',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjAxZDJiYjRmMmY2M2UxODQxZTM1NTQ2IiwiaWF0IjoxNjEzMDI4NzgyLCJleHAiOjE2MTQ3NTY3ODJ9.Gu5x05j4NEFMb6dYefaeFAx2AneZPTJmpPcZAr6P2pY`
                },
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

    if (!status) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>
                    Opps! something went wrong!
                    Please Try after sometime
                </Text>
            </View>
        )
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
                                    title={itemData.item.houseName}
                                    onAction={() => {
                                        props.navigation.navigate("Room", {
                                            name: itemData.item.houseName,
                                            id: itemData.item._id,
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
                        props.navigation.navigate("AddHouse", { setData: fetchData.bind(this)  })
                    }}
                >
                    <View style={styles.addHouse} >
                        <Text style={{ color: 'white' }}>
                            Add House
                    </Text>
                    </View>
                </TouchableOpacity>
            </View>
            :
            <View style={[styles.screen, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text>No Houses Yet!</Text>
                <View style={styles.buttonWrapper}>
                    <TouchableOpacity
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
            </View>
    );



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

export default Houses;