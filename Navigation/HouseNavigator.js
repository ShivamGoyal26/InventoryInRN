import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Houses from '../screens/Houses';
import AddHouse from '../screens/AddHouse';
import Colors from '../constants/Colors';

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
                        // headerLeft: () => (
                        //     <View style={{ marginLeft: 10 }}>
                        //         <TouchableOpacity onPress={() => {
                        //             // navigation.toggleDrawer();
                        //         }}>
                        //             <Ionicons name="menu-outline" size={23} color='white' />
                        //         </TouchableOpacity>
                        //     </View>
                        // ),
                        title: "Add House",
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