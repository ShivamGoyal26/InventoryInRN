import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Alert } from 'react-native';
import Colors from '../constants/Colors';
import { api, } from '../API/api';
import HouseItem from '../components/HouseItem';
import { getJsonData } from './asyncStorage/async';
import { useFocusEffect } from '@react-navigation/native';


const Houses = props => {
    // const token  =
    const [loading, setLoading] = useState(true);
    const [response, setResponse] = useState(null);
    const [status, setStatus] = useState(true);
    const [token,setToken]=useState("")
    
    useEffect(()=>{
        setLoading(true)
    },[])
    useFocusEffect(React.useCallback(()=>{
        getJsonData("tokan").then(Token =>{setToken(Token.token) })
        // return setResponse(null)
    },[]))
    useEffect(() => {
<<<<<<< HEAD
        console.log("Houses are runing")
        fetchData();
    });
=======
        if(token!==""){
            fetchData();
        }
    }, [token]);
>>>>>>> ad73582360a181d5f29f4f5312bf08c0689cc7e3

    const fetchData = async () => {
        try {
            data = await api({
                method: 'POST',
                endpoint: 'house/get',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
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
                        props.navigation.navigate("AddHouse", { setData: fetchData  })
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
                            props.navigation.navigate("AddHouse", { setData: fetchData  })
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