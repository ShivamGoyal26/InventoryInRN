import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Houses from '../screens/Houses';
import AddHouse from '../screens/AddHouse';
import Colors from '../constants/Colors';
import Room from '../screens/Room';
import AddRoom from '../screens/AddRoom';
import Items from '../screens/Items'
import AddItems from '../screens/AddItems';
import EditItem from '../screens/EditItem';
import EditRoom from '../screens/EditRoom';
import EditItemView from '../screens/EditItemView';
import Setting from '../screens/Setting'
import Login from '../screens/Auth/Login';
import SignUp from '../screens/Auth/SignUp';
import Forgotpassword from '../screens/Auth/forgotpassword';
import ChangePassword from '../screens/Auth/Changepassword';
import { SafeAreaView } from 'react-native-safe-area-context';
import Splash from '../screens/Auth/Splash';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Auth = createStackNavigator();

const AuthStack = () => {
    return (
      

        <NavigationContainer>
            <Auth.Navigator initialRouteName="Splash">


                <Auth.Screen
                    name="Login"
                    component={Login}
                    options={({ navigation }) => ({
                        headerShown: false,
                    })}
                />
                <Auth.Screen
                    name="SignUp"
                    component={SignUp}
                    options={({ navigation }) => ({
                        headerShown: false,
                    })}
                />
                <Auth.Screen
                    name="Forgotpassword"
                    component={Forgotpassword}
                    options={({ navigation }) => ({
                        headerShown: false,
                    })}
                />
                <Auth.Screen
                    name="ChangePassword"
                    component={ChangePassword}
                    options={({ navigation }) => ({
                        headerShown: false,
                    })}
                />
                <Auth.Screen
                    name="Drawer"
                    component={MainDrawer}
                    options={({ navigation }) => ({
                        headerShown: false,
                    })}
                />
                  <Auth.Screen
                    name="Splash"
                    component={Splash}
                    options={({ navigation }) => ({
                        headerShown: false,
                    })}
                />
            </Auth.Navigator>
        </NavigationContainer>
    )
}

const MainDrawer = () => {
    return (
        <Drawer.Navigator initialRouteName="Home"
            drawerStyle={{
                backgroundColor: Colors.accent,
                width: 220,
            }}>
            <Drawer.Screen
                name="Home"
                component={HouseNavigator}
                options={{
                    drawerIcon: () => <Ionicons name="home" size={20} color={Colors.primary} />,
                    activeTintColor: Colors.primary,
                }}
            />
            <Drawer.Screen
                name="Settings"
                component={Setting}
                options={{
                    drawerIcon: () => <Ionicons name="settings" size={20} color={Colors.primary} />,
                    activeTintColor: Colors.primary,
                }}
            />
        </Drawer.Navigator>
        // </SafeAreaView>


    );
}

const HouseNavigator = () => {
    return (
        <Stack.Navigator >
            <Stack.Screen
                name="Houses"
                component={Houses}
                options={({ navigation }) => ({
                    headerLeft: () => (
                        <View style={{ marginLeft: 10 }}>
                            <TouchableOpacity onPress={() => {
                                navigation.toggleDrawer();
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
                name="EditItemView"
                component={EditItemView}
                options={({ navigation }) => ({
                    title: "Edit Item View",
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
                                navigation.navigate("EditRoom", { roomName: route.params.roomName, roomId: route.params.roomId})
                            }}>
                                <MaterialIcons name="edit" size={23} color='white' />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {
                            }}>
                                <MaterialIcons name="search" size={23} color='white' />
                            </TouchableOpacity>

                        </View>
                    ),
                    title: route.params.roomName,
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
                                navigation.navigate("EditItemView", {itemName: route.params.itemName, description: route.params.description, houseName: route.params.houseName, roomName: route.params.roomName})
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
            <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="ForgotPassword"
                component={Forgotpassword}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="ChangePassword"
                component={ChangePassword} options={{
                    headerShown: false
                }}
            />

        </Stack.Navigator>
    );
}

export default AuthStack;