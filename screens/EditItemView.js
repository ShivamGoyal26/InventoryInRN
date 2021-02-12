import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import Colors from '../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'react-native-image-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import { api } from '../API/api';
import Toast from 'react-native-simple-toast';

const EditItemView = props => {

    const itemNameData = props.route.params.itemName;
    const descriptionData = props.route.params.description;
    const houseName = props.route.params.houseName;
    const roomName = props.route.params.roomName;

    const [itemName, setItemName] = useState(itemNameData);
    const [description, setDescription] = useState(descriptionData);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState('');
    const [crossIcon, setCrossIcon] = useState(false);
    const [image, setImage] = useState([]);
    const [fileUri, setFileUri] = useState('');

    const editItemView = async () => {

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
                    "description": description,
                    "status": 2,

                }
            });
            Toast.show('ROOM ADDED SUCCESFULLY', Toast.LONG);
            navigation.pop();
        }
        catch (error) {
            setLoading(false)
            console.log("this is the error");
            console.log(error)
            Alert.alert(
                "Network Error!",
                "Please check your internet connection",

                [{ text: "OK", onPress: () => { } }]
            );
        }
        setResponse(data);
        setStatus(data.message);
        setLoading(false);
    }

    const checkText = () => {
        if (itemName) {
            return true;
        }
        Toast.show('Please Enter the Room Name!', Toast.LONG);
    }

    const checkDescription = () => {
        if (description) {
            return true;
        }
        Toast.show('Please Enter the Description Name!', Toast.LONG);
    }

    const checkImage = () => {
        if (fileUri) {
            return true;
        }
        Toast.show('Please Pick Aleast One Image!', Toast.LONG);
    }

    const launchImageLibrary = () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.launchImageLibrary(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                const source = { uri: response.uri };
                setImage(source);
                setFileUri(response.uri);
                setCrossIcon(true);
            }
        });

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
            <ScrollView>
                <View style={{ margin: 15 }}>
                    <Text>Location: {houseName}, {roomName} </Text>
                </View>

                <View style={{ marginHorizontal: 15 }}>
                    <Text>
                        Item Name
            </Text>
                </View>

                <View style={styles.textInput}>
                    <TextInput placeholder="Add name" value={itemName} onChangeText={text => setItemName(text)} />
                </View>

                <View style={styles.camera}>
                    <Text>Photos</Text>
                    <TouchableOpacity onPress={() => { launchImageLibrary() }}>
                        <Ionicons name="camera-outline" size={24} />
                    </TouchableOpacity>
                </View>
                <View style={styles.image}>
                    {crossIcon ? <View style={styles.icon}>
                        <TouchableOpacity onPress={() => {
                            setFileUri("");
                            setImage([]);
                            setCrossIcon(false);
                        }}>
                            <Entypo name="circle-with-cross" size={20} />
                        </TouchableOpacity>
                    </View> : <View></View>}
                    <Image
                        style={{ height: 100, width: 100, borderRadius: 10 }}
                        source={fileUri ? { uri: fileUri } : <View> <Text>No Image</Text> </View>} //else show random
                    />
                </View>
                <View style={{ marginHorizontal: 15, marginVertical: 15 }}>
                    <Text>
                        Description
            </Text>
                </View>

                <View style={styles.textInput}>
                    <TextInput placeholder="Add name" value={description} onChangeText={text => setDescription(text)} />
                </View>
            </ScrollView>
            <View style={styles.buttonWrapper}>
                <TouchableOpacity
                    onPress={() => {
                        if (checkText() && checkDescription() && checkImage()) {
                            editItemView();
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
    image: {
        padding: 10,
        width: 120,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        left: 40,
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.accent,
    },
});

export default EditItemView;