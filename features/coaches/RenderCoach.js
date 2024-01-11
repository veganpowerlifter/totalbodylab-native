import { Text, View, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import { baseUrl } from '../../shared/baseUrl';

const RenderCoach = (props) => { // can the file and the const or function be the same name?
    const { coach } = props;

    if (coach) {
        return (

            <Card containerStyle={styles.cardContainer}>
                <Card.Image source={{ uri: baseUrl + coach.image }}>
                    <View style={{ justifyContent: 'center', flex: 1 }}>
                        <Text
                            style={styles.cardText}
                        >
                            {coach.name}
                        </Text>
                    </View>
                </Card.Image>
                <Text
                    style={{ margin: 20 }}>{coach.description}
                </Text>
                <View
                    style={styles.cardText}
                >
                    
                </View>
            </Card >
        )
    }
    return <View />;
};

const styles = StyleSheet.create({
    cardContainer: {
        padding: 0,
        margin: 0,
        marginBottom: 20
    },
    cardRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    cardText: {
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 20,
        textAlign: 'center',
        color: 'white',
        fontSize: 20
    }
});

export default RenderCoach;