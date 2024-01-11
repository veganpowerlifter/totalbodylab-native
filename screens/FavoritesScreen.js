import { useSelector, useDispatch } from 'react-redux';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import Loading from '../components/LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
// import * as Animatable from 'react-native-animatable'
import { SwipeRow } from 'react-native-swipe-list-view';
import { toggleFavorite } from '../features/favorites/favoritesSlice';


const FavoritesScreen = ({ navigation }) => {
    const { programsArray, isLoading, errMess } = useSelector(
        (state) => state.programs
    );
    const favorites = useSelector((state) => state.favorites);
    const dispatch = useDispatch();

    const renderFavoriteItem = ({ item: program }) => {
        return (
            <SwipeRow rightOpenValue={-100}>
                <View styles={styles.deleteView}>
                    <TouchableOpacity
                        style={styles.deleteTouchable}
                        onPress={() => Alert.alert(
                            'Delete Favorite?',
                            'Are you sure you wish to delete the favorite program ' +
                            program.name +
                            '?',
                            [
                                {
                                    text: 'Cancel',
                                    onPress: () =>
                                        console.log(
                                            proram.name + 'Not Deleted'
                                        ),
                                    style: 'cancel'
                                },
                                {
                                    text: 'OK',
                                    onPress: () =>
                                        dispatch(
                                            toggleFavorite(program.id)
                                        )
                                }
                            ],
                            { cancelable: false }
                        )}
                    >
                        <Text style={styles.deleteText}>Delete</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <ListItem
                        onPress={() =>
                            navigation.navigate('Directory', {
                                screen: 'ProgramInfo',
                                params: { program }
                            })
                        }
                    >
                        <Avatar
                            rounded
                            source={{ uri: baseUrl + program.image }}
                        />
                        <ListItem.Content>
                            <ListItem.Title>{program.name}</ListItem.Title>
                            <ListItem.Subtitle>
                                {program.description}
                            </ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                </View>
            </SwipeRow>
        )
    }

    if (isLoading) {
        return <Loading />;
    }
    if (errMess) {
        return (
            <View>
                <Text>{errMess}</Text>
            </View>
        );
    }
    return (
         <Animatable.View animation='fadeInRightBig' duration={2000}>
            <FlatList
                data={programsArray.filter((program) =>
                    favorites.includes(program.id)
                )}
                renderItem={renderFavoriteItem}
                keyExtractor={(item) => item.id.toString()}
            />
     </Animatable.View>
    )
};

const styles = StyleSheet.create({
    deleteView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1
    },
    deleteTouchable: {
        backgroundColor: 'red',
        height: '100%',
        justifyContent: 'center'
    },
    deleteText: {
        color: 'white',
        fontWeight: '700',
        textAlign: 'center',
        fontSize: 16,
        width: 100
    }
});

export default FavoritesScreen;