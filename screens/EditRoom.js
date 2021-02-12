import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import Colors from '../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'react-native-image-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import { api, baseUrl, mediaBaseUrl } from '../API/api';
import Toast from 'react-native-simple-toast';

const EditRoom = ({ route, navigation }) => {

    const roomData = route.params.roomName;
    const roomId = route.params.roomId;

    const [roomName, setRoomName] = useState(roomData);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState('');
    const [status, setStatus] = useState(true);
    const [image, setImage] = useState([]);
    const [fileUri, setFileUri] = useState('');
    const [crossIcon, setCrossIcon] = useState(false)
    const [imageName, setImageName] = useState('');
    const [type, setType] = useState('');




    const uploadImage = async () => {
        return new Promise((resolve, reject) => {
            console.log("Upload image function workign", response)

            var photo = {
                uri: fileUri,
                type: type,
                name: imageName,
            };

            console.log(photo)

            const formdata = new FormData();
            formdata.append("image", photo);

            var requestOptions = {
                method: 'POST',
                body: formdata,
            };

            fetch("https://imvptest.herokuapp.com/api/v1/auth/uploadImage", requestOptions)
                .then(response => response.json())
                .then(result => {
                    resolve(result.data.images[0])
                })
                .catch(error => { reject({ "error": error, "Message": 'Erorr Occured', }) });
        })
    }

    const updateRoom = async () => {
        imageUrl = await uploadImage()
        try {
            console.log("Now try is goinig on")
            setLoading(true)
            data = await api({
                method: 'POST',
                endpoint: 'room/update',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjAxZDJiYjRmMmY2M2UxODQxZTM1NTQ2IiwiaWF0IjoxNjEzMDI4NzgyLCJleHAiOjE2MTQ3NTY3ODJ9.Gu5x05j4NEFMb6dYefaeFAx2AneZPTJmpPcZAr6P2pY`
                },
                data: {
                    "_id": roomId,
                    'roomName': roomName,
                    "status": 1,
                    "image": imageUrl

                }
            });
            Toast.show('ROOM UPDATED SUCCESFULLY', Toast.LONG);
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
        setResponse(data)
        setStatus(data.message)
        setLoading(false)
        console.log(response)
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
                setType(response.type);
                setImageName(response.fileName);
            }
        });

    }

    const checkText = () => {
        if (roomName) {
            return true;
        }
        Toast.show('Please Enter the Room Name!', Toast.LONG);
    }

    const checkImage = () => {
        if (fileUri) {
            return true;
        }
        Toast.show('Please Pick Aleast One Image!', Toast.LONG);
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

            <View style={styles.text}>
                <Text style={{ fontSize: 19, }}>
                    Edit Room
            </Text>
            </View>

            <View style={styles.textInput}>
                <TextInput placeholder="Edit Room Name" value={roomName} onChangeText={text => setRoomName(text)} />
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
                    source={fileUri ? { uri: fileUri } : <View style={styles.loading}>
                        <ActivityIndicator size="large" color={Colors.primary} />
                    </View>} //else show random
                />
            </View>
            <TouchableOpacity
                style={styles.buttonWrapper}
                onPress={() => {
                    if (checkText() && checkImage()) {
                        updateRoom();
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

export default EditRoom;