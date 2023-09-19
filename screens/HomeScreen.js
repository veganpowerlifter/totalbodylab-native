import { useEffect, useRef } from 'react';
import { Text, View, Animated } from 'react-native';
import { Card } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from '../components/LoadingComponent';

const FeaturedItem = (props) => {
    const { item } = props;

    if (props.isLoading) {
        return <Loading />;
    }
    if (props.errMess) {
        return (
            <View>
                <Text>{props.errMess}</Text>
            </View>
        );
    }
    if (item) {
        return (
            <Card containerStyle={{ padding: 0 }}>
                <Card.Image source={{ uri: baseUrl + item.image }}>
                    <View style={{ justifyContent: 'center', flex: 1 }}>
                        <Text
                            style={{
                                color: 'white',
                                textAlign: 'center',
                                fontSize: 20
                            }}
                        >
                            {item.name}
                        </Text>
                    </View>
                </Card.Image>
                <Text style={{ margin: 20 }}>{item.description}</Text>
            </Card>
        );
    }
    return <View />;
};

const HomeScreen = () => {
    const coaches = useSelector((state) => state.coaches);
    // const promotions = useSelector((state) => state.promotions);
    const programs = useSelector((state) => state.programs);
    const scaleValue = useRef(new Animated.Value(0)).current;
    const scaleAnimation = Animated.timing(scaleValue, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true
    });

    const featCoach = coaches.coachesArray.find((item) => item.featured);
    // // const featPromotion = promotions.promotionsArray.find(
    //     (item) => item.featured
    // );
    const featProgram = programs.programsArray.find((item) => item.featured);

    useEffect(() => {
        scaleAnimation.start();
    }, []);

    return (
        <Animated.ScrollView style={{ transform: [{ scale: scaleValue }] }}>
            <FeaturedItem
                item={featCampsite}
                isLoading={coaches.isLoading}
                errMess={coaches.errMess}
            />
            {/* <FeaturedItem
                item={featPromotion}
                isLoading={promotions.isLoading}
                errMess={promotions.errMess}
            /> */}
            <FeaturedItem
                item={featProgram}
                isLoading={programs.isLoading}
                errMess={programs.errMess}
            />
        </Animated.ScrollView>
    );
};

export default HomeScreen;
