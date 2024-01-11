import { FlatList } from 'react-native';
import { useState } from 'react';
import { COACHES } from '../shared/coaches'

const DirectoryScreen = ({ navigation }) => {
    const [coaches, setCoaches] = useState(COACHES);

    const renderDirectoryItem = ({ item: coach }) => {
        return (
            <Tile
                title={coach.name}
                caption={coach.description}
                featured
                onPress={() =>
                    navigation.navigate('CoachInfo', { coach })
                }
                imageSrc={{ uri: baseUrl + coach.image }}
            />
        );
    }

    return (
        <FlatList
            data={props.coaches}
            renderItem={renderDirectoryItem}
            keyExtractor={(item) => item.id.toString()}
        />
    )
};

export default DirectoryScreen;