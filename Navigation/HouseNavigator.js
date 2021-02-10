import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Houses from '../screens/Houses';
import AddHouse from '../screens/AddHouse';
import Colors from '../constants/Colors';
import Room from '../screens/Room';
import AddRoom from '../screens/AddRoom';
import Items from '../screens/Items'
import AddItems from '../screens/AddItems';
import EditItem from '../screens/EditItem';
import EditRoom from '../screens/EditRoom';

const Stack = createStackNavigator();

const HouseNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Houses"
                    component={Houses}
                    options={({ navigation }) => ({
                        headerLeft: () => (
                            <View style={{ marginLeft: 10 }}>
                                <TouchableOpacity onPress={() => {
                                    // navigation.toggleDrawer();
                                }}>
                                    <Ionicons name="menu-outline" size={23} color='white' />
                                </TouchableOpacity>
                            </View>
                        ),
                        title: "Houses",
                        headerTintColor: 'white',
                        headerStyle: {
                            backgroundColor: Colors.primary,
                        }
                    })}
                />
                <Stack.Screen
                    name="AddHouse"
                    component={AddHouse}
                    options={({ navigation }) => ({
                        title: "Add House",
                        headerTintColor: 'white',
                        headerStyle: {
                            backgroundColor: Colors.primary,
                        }
                    })}
                />
                <Stack.Screen
                    name="Room"
                    component={Room}
                    options={({ navigation, route }) => ({
                        title: route.params.name,
                        headerTintColor: 'white',
                        headerStyle: {
                            backgroundColor: Colors.primary,
                        }
                    })}
                />
                <Stack.Screen
                    name="AddRoom"
                    component={AddRoom}
                    options={({ navigation }) => ({
                        title: "Add Room",
                        headerTintColor: 'white',
                        headerStyle: {
                            backgroundColor: Colors.primary,
                        }
                    })}
                />
                <Stack.Screen
                    name="Items"
                    component={Items}
                    options={({ navigation, route }) => ({
                        headerRight: () => (
                            <View style={{ marginRight: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: 70 }}>

                                <TouchableOpacity onPress={() => {
                                     navigation.navigate("EditRoom")
                                }}>
                                    <MaterialIcons name="edit" size={23} color='white' />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => {
                                }}>
                                    <MaterialIcons name="search" size={23} color='white' />
                                </TouchableOpacity>

                            </View>
                        ),
                        title: route.params.name,
                        headerTintColor: 'white',
                        headerStyle: {
                            backgroundColor: Colors.primary,
                        }
                    })}
                />
                <Stack.Screen
                    name="AddItems"
                    component={AddItems}
                    options={({ navigation }) => ({
                        title: "Item Name",
                        headerTintColor: 'white',
                        headerStyle: {
                            backgroundColor: Colors.primary,
                        }
                    })}
                />
                <Stack.Screen
                    name="EditItem"
                    component={EditItem}
                    options={({ navigation, route }) => ({
                        headerRight: () => (
                            <View style={{ marginRight: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: 70 }}>

                                <TouchableOpacity onPress={() => {
                                    navigation.navigate("EditRoom")
                                }}>
                                    <MaterialIcons name="edit" size={23} color='white' />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => {
                                }}>
                                    <MaterialIcons name="search" size={23} color='white' />
                                </TouchableOpacity>

                            </View>
                        ),
                        title: route.params.name,
                        headerTintColor: 'white',
                        headerStyle: {
                            backgroundColor: Colors.primary,
                        }
                    })}
                />
                 <Stack.Screen
                    name="EditRoom"
                    component={EditRoom}
                    options={({ navigation }) => ({
                        title: "Edit Room",
                        headerTintColor: 'white',
                        headerStyle: {
                            backgroundColor: Colors.primary,
                        }
                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default HouseNavigator;