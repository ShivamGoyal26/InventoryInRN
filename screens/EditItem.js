import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import Colors from '../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { api, mediaBaseUrl } from '../API/api';
import Toast from 'react-native-simple-toast';

const EditItem = ({ route, navigation }) => {
    const imageData = route.params.image.images[0];
    console.log("This is the image Data", imageData)
    const houseName = route.params.houseName;
    const roomName = route.params.roomName;
    const houseId = route.params.houseId;
    const roomId = route.params.roomId;
    const description = route.params.description;

    const [itemName, setItemName] = useState(description);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState('');

    const editIem = async () => {

        try {
            setLoading(true)
            data = await api({
                method: 'POST',
                endpoint: 'item/update',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjAxZDJiYjRmMmY2M2UxODQxZTM1NTQ2IiwiaWF0IjoxNjEzMDI4NzgyLCJleHAiOjE2MTQ3NTY3ODJ9.Gu5x05j4NEFMb6dYefaeFAx2AneZPTJmpPcZAr6P2pY`
                },
                data: {
                    "_id": roomId,
                    'itemName': itemName,
                    "status": 2,

                }
            });
            Toast.show('ROOM UPDATED SUCCESFULLY', Toast.LONG);
            navigation.pop();
        }
        catch (error) {
            setLoading(false)
            Alert.alert(
                "Network Error!",
                "Please check your internet connection",

                [{ text: "OK", onPress: () => { } }]
            );
        }
        setResponse(data)
        setLoading(false)
    }

    const checkDescription = () => {
        if (roomName) {
            return true;
        }
        Toast.show('Please Enter the Room Name!', Toast.LONG);
    }

    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }


    return (
        <View style={styles.screen}>
            <View style={styles.image}>
                <Image
                    style={{ width: 100, height: 100, borderRadius: 10 }}
                    source={{ uri: mediaBaseUrl + imageData }}
                />
            </View>
            <View style={{ margin: 15 }}>
                <Text>Location: {houseName}, {roomName}</Text>
            </View>

            <View style={{ marginHorizontal: 15 }}>
                <Text>
                    Description
            </Text>
            </View>

            <View style={styles.textInput}>
                <TextInput placeholder="Add name" value={itemName} onChangeText={text => setItemName(text)} />
            </View>

            <View style={styles.buttonWrapper}>

                <TouchableOpacity
                    onPress={() => {
                        if (checkDescription()) {
                            EditItem();
                        }
                    }}
                >

                    <View style={styles.save}>
                        <Text style={{ color: 'white' }}>
                            Save
                    </Text>
                    </View>
                </TouchableOpacity>

            </View>

        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.accent,
    },
    text: {
        marginHorizontal: 20,
        marginVertical: 30,
    },
    textInput: {
        marginVertical: 20,
        backgroundColor: 'white',
        marginHorizontal: 15,
        borderRadius: 10,
        paddingHorizontal: 15,
    },
    buttonWrapper: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 10,
        right: 20,
    },
    save: {
        width: 100,
        padding: 6,
        borderRadius: 10,
        borderWidth: 2,
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',

    },
    camera: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20,
        top: 10,
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
});

export default EditItem;