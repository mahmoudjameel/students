import React, { useEffect } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import DrawerHome from '../DrawerScreens/DrawerHome';
import Products from '../DrawerScreens/Products';
import MyCart from '../DrawerScreens/MyCart';
import OrderDetail from '../DrawerScreens/OrderDetail';
import AboutUs from '../DrawerScreens/AboutUs';
import CustomDrawer from '../DrawerScreens/CustomDrawer';
import UserAccount from '../DrawerScreens/UserAccount'
import { CommonActions } from '@react-navigation/native'
import { firebase } from '../config';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();

export default function Home(navigation) {

    const isFocused = useIsFocused();
    
    function Logout({ navigation }) {
        useEffect(() => {
            firebase.auth().signOut();

            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Login' }]
                })
            )
        }, [isFocused])

        clear();

    }

    const clear = async () => {
        try {
            AsyncStorage.clear()
        } catch (e) {
            console.warn(e)
        }
    }


    return (
        <Drawer.Navigator initialRouteName="DrawerHome"
            drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{
                //drawerActiveBackgroundColor: "#00bfff",
               // drawerActiveTintColor: '#fff',
                drawerInactiveTintColor: '#333',
            }} >
            <Drawer.Screen
                name="DrawerHome"
                component={DrawerHome}
                options={({ navigation }) => ({
                    //headerShown: false,
                    title: 'Home',
                    drawerIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={'#1e90ff'} size={30} />
                    ),
                    headerTintColor: '#fff',
                    headerStyle: {
                        backgroundColor: '#1e90ff'
                    },
                    headerRight: () => (
                        <MaterialCommunityIcons
                            name="cart"
                            style={{
                                fontSize: 30,
                                color: '#1e90ff',
                                margin: 10,
                            }}
                            onPress={() => navigation.navigate('MyCart')}
                        />
                    ),
                    
                })}
            />
            <Drawer.Screen
                name="Products"
                component={Products}
                options={({ navigation }) => ({
                    title: 'Inquiries',
                    drawerIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="clipboard-list" color={'#1e90ff'} size={30} />
                    ), headerTintColor: '#fff',
                    headerStyle: {
                        backgroundColor: '#1e90ff'
                    },
                    headerRight: () => (
                        <MaterialCommunityIcons
                            name="cart"
                            style={{
                                fontSize: 30,
                                color: '#1e90ff',
                                margin: 10,
                            }}
                            onPress={() => navigation.navigate('MyCart')}
                        />
                    ),
                })}
            />
            
            <Drawer.Screen
                name="OrderDetail"
                component={OrderDetail}
                options={{
                    title: 'Discussions',
                    drawerIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="clipboard-list-outline" color={'#1e90ff'} size={30} />
                    ), headerTintColor: '#fff',
                    headerStyle: {
                        backgroundColor: '#1e90ff'
                    },
                }}
            />
            <Drawer.Screen
                name="UserAccount"
                component={UserAccount}
                options={{
                    title: 'Profile',
                    drawerIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account" color={'#1e90ff'} size={30} />
                    ), headerTintColor: '#fff',
                    headerStyle: {
                        backgroundColor: '#1e90ff'
                    },

                }}
            />

            <Drawer.Screen
                name="AboutUs"
                component={AboutUs}
                options={{
                    title: 'About Us',
                    drawerIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="information-outline" color={'#1e90ff'} size={30} />
                    ), headerTintColor: '#fff',
                    headerStyle: {
                        backgroundColor: '#1e90ff'
                    },

                }}
            />
            <Drawer.Screen
                name="Logout"
                component={Logout}
                options={{
                    title: 'Logout',
                    drawerIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="logout" color={'#1e90ff'} size={30} />
                    )
                }}
            />

        </Drawer.Navigator>
    );
}
