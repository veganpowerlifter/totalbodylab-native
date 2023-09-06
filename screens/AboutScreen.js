import { Text, View, ScrollView } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { useSelector } from 'react-redux';
import * as Animatable from 'react-native-animatable'
import { baseUrl } from '../shared/baseUrl';
import Loading from '../components/LoadingComponent';

function Mission() {
    return (
        <Card>
            <Card.Title>
                Claim Your Strength
            </Card.Title>
            <Card.Divider />
            <Text style={{ margin: 10 }}>
                Paragraph about our gym
            </Text>
        </Card>
    );
};

const AboutScreen = () => {
    const partners = useSelector((state) => state.partners);

    if (partners.isLoading) {
        return (
            <ScrollView>
                <Mission />
                <Card>
                    <Card.Title>Our Sponsers!</Card.Title>
                    <Card.Divider />
                    <Loading />
                </Card>
            </ScrollView>
        );
    }
    // Why is this needed? ^

    if (partners.errMess) {
        return (
            <ScrollView>
                <Animatable.View
                    animation='fadeInDown'
                    duration={2000}
                    delay={1000}
                >
                    <Mission />
                    <Card>
                        <Card.Title>Our Sponsers!</Card.Title>
                        <Card.Divider />
                        <Text>{partners.errMess}</Text>
                    </Card>
                </Animatable.View >
            </ScrollView>
        );
    }

    return (
        <ScrollView>
            <Animatable.View
                animation='fadeInDown'
                duration={2000}
                delay={1000}
            >
                <Mission />
                <Card>
                    <Card.Title>
                        Our Sponsers
                    </Card.Title>
                    <Card.Divider />
                    {partners.partnersArray.map((partner) => (
                        <ListItem key={partner.id}>
                            <Avatar rounded source={{ uri: baseUrl + partner.image }} />
                            <ListItem.Content>
                                <ListItem.Title>{partners.name}</ListItem.Title>
                                <ListItem.Subtitle>
                                    {partners.description}
                                </ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    ))}
                </Card>
            </Animatable.View>
        </ScrollView>
    )
};

export default AboutScreen;