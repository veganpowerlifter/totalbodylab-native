import { Platform, View, StyleSheet, Text, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import Constants from 'expo-constants';
import { createStackNavigator } from '@react-navigation/stack';
import DirectoryScreen from './DirectoryScreen';
import CoachInfoScreen from "./CoachInfoScreen";
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import HomeScreen from './HomeScreen';
import AboutScreen from './AboutScreen';
import ContactScreen from './ContactScreen';
import logo from '../assets/img/logo.png';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchPrograms } from '../features/programs/programsSlice';
import { fetchCoaches } from '../features/coaches/coachesSlice';
// import { fetchPromotions } from '../features/promotions/promotionsSlice';
// import { fetchComments } from '../features/comments/commentsSlice';
import ReservationScreen from './ReservationScreen';
import FavoritesScreen from './FavoritesScreen';

const Drawer = createDrawerNavigator();

const screenOptions = {
    headerTintColor: '#fff',
    headerStyle: { backgroundColor: '#5637DD' }
};

const HomeNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator
            screenOptions={screenOptions}
        >
            <Stack.Screen
                name='Home'
                component={HomeScreen}
                options={({ navigation }) => ({
                    title: 'Home',
                    headerLeft: () => (
                        <Icon
                            name='home'
                            type='font-awesome'
                            iconStyle={styles.stackIcon}
                            onPress={() => navigation.toggleDrawer()}
                        />
                    )
                })}
            />
        </Stack.Navigator>
    );
};

const AboutNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator
            screenOptions={screenOptions}
        >
            <Stack.Screen
                name='About'
                component={AboutScreen}
                options={({ navigation }) => ({

                    headerLeft: () => (
                        <Icon
                            name='info-circle'
                            type='font-awesome'
                            iconStyle={styles.stackIcon}
                            onPress={() => navigation.toggleDrawer()}
                        />
                    )
                })}
            />

        </Stack.Navigator>
    );
};

const ContactNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen
                name='Contact'
                component={ContactScreen}
                options={({ navigation }) => ({
                    title: 'Contact Us',
                    headerLeft: () => (
                        <Icon
                            name='address-card'
                            type='font-awesome'
                            iconStyle={styles.stackIcon}
                            onPress={() => navigation.toggleDrawer()}
                        />
                    )
                })}
            />
        </Stack.Navigator >
    );
};

const ReservationNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen
                name='Reservation'
                component={ReservationScreen}
                options={({ navigation }) => ({
                    title: 'Reservation Search',
                    headerLeft: () => (
                        <Icon
                            name='tree'
                            type='font-awesome'
                            iconStyle={styles.stackIcon}
                            onPress={() => navigation.toggleDrawer()}
                        />
                    )
                })}
            />
        </Stack.Navigator>
    );
};

const FavoritesNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen
                name='Favorites'
                component={FavoritesScreen}
                options={({ navigation }) => ({
                    title: 'Favorite Campsites',
                    headerLeft: () => (
                        <Icon
                            name='heart'
                            type='font-awesome'
                            iconStyle={styles.stackIcon}
                            onPress={() => navigation.toggleDrawer()}
                        />
                    )
                })}
            />
        </Stack.Navigator>
    );
};


const DirectoryNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator
            initialRouteName='Directory'
            screenOptions={screenOptions}
        >
            <Stack.Screen
                name='Directory'
                component={DirectoryScreen}
                options={({ navigation }) => ({
                    title: 'Coach Directory',
                    headerLeft: () => (
                        <Icon
                            name='list'
                            type='font-awesome'
                            iconStyle={styles.stackIcon}
                            onPress={() => navigation.toggleDrawer()}
                        />
                    )
                })}
            />
            <Stack.Screen
                name='CoachesInfo'
                component={CoachInfoScreen}
                options={({ route }) => ({
                    title: route.params.coach.name
                })}
            />
        </Stack.Navigator>
    );
};

const CustomDrawerContent = (props) => (

    <DrawerContentScrollView {...props}>
        <View style={styles.drawerHeader}>
            <View style={{ flex: 1 }}>
                <Image source={logo} style={styles.drawerImage} />
            </View>
            <View style={{ flex: 2 }}>
                <Text style={styles.drawerHeaderText}>TotalBodyLab</Text>
            </View>
        </View>
        <DrawerItemList {...props} labelStyle={{ fontWeight: 'bold' }} />
    </DrawerContentScrollView>
);

const Main = () => {
const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCoaches());
        // dispatch(fetchPromotions());
        dispatch(fetchPrograms());
        // dispatch(fetchComments());
    }, [dispatch]);

    return (
        <View
            style={{
                flex: 1,
                paddingTop:
                    Platform.OS === 'ios' ? 0 : Constants.statusBarHeight
            }}
        >
            <Drawer.Navigator
                initialRouteName='Home'
                drawerStyle={{ backgroundColor: '#CEC8FF' }}
                drawerContent={CustomDrawerContent}
            >
                <Drawer.Screen
                    name='Home'
                    component={HomeNavigator}
                    options={{
                        title: 'Home',
                        drawerIcon: ({ color }) => (
                            <Icon
                                name='home'
                                type='font-awesome'
                                size={24}
                                iconStyle={{ width: 24 }}
                                color={color}
                            />
                        )
                    }}
                />
                <Drawer.Screen
                    name='Directory'
                    component={DirectoryNavigator}
                    options={{
                        title: 'Directory',
                        drawerIcon: ({ color }) => (
                            <Icon
                                name='list'
                                type='font-awesome'
                                size={24}
                                iconStyle={{ width: 24 }}
                                color={color}
                            />
                        )
                    }}
                />
                <Drawer.Screen
                    name='ReserveProgram' //original was campsite but we need to make sure this goes to programs (coaches=campsite while programs=partners in NUCAMPSITE)
                    component={ReservationNavigator}
                    options={{
                        title: 'Reserve Program',
                        drawerIcon: ({ color }) => (
                            <Icon
                                name='tree'
                                type='font-awesome'
                                size={24}
                                iconStyle={{ width: 24 }}
                                color={color}
                            />
                        )
                    }}
                />
                {/* <Drawer.Screen
                    name='Favorites'
                    component={FavoritesNavigator}
                    options={{
                        title: 'My Favorites',
                        drawerIcon: ({ color }) => (
                            <Icon
                                name='heart'
                                type='font-awesome'
                                size={24}
                                iconStyle={{ width: 24 }}
                                color={color}
                            />
                        )
                    }}
                /> */}
                <Drawer.Screen
                    name='About'
                    component={AboutNavigator}
                    options={{
                        title: 'About',
                        drawerIcon: ({ color }) => (
                            <Icon
                                name='info-circle'
                                type='font-awesome'
                                size={24}
                                iconStyle={{ width: 24 }}
                                color={color}
                            />
                        )
                    }}
                />
                <Drawer.Screen
                    name='Contact'
                    component={ContactNavigator}
                    options={{
                        title: 'Contact Us',
                        drawerIcon: ({ color }) => (
                            <Icon
                                name='address-card'
                                type='font-awesome'
                                size={24}
                                iconStyle={{ width: 24 }}
                                color={color}
                            />
                        )
                    }}
                />
            </Drawer.Navigator>
        </View>
    );
};

const styles = StyleSheet.create({
    stackIcon: {
        marginLeft: 10,
        color: '#fff',
        fontSize: 24,
        drawerHeader: {
            backgroundColor: '#5637DD',
            height: 140,
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            flexDirection: 'row'
        },
        drawerHeaderText: {
            color: '#fff',
            fontSize: 24,
            fontWeight: 'bold'
        },
        drawerImage: {
            margin: 10,
            height: 60,
            width: 60
        }
    }
});

export default Main;

//refer to MainComponent.js nucampsite
