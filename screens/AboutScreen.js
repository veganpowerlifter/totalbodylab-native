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
                For the most of my life, I thought I didn't have the metabolism to stay lean or genetics to be strong. I was jealous of the "naturally lean" people, convinced that regular folks like us can never get there no matter how hard we try. Turns out, it is not necessary to try hard. Throughout my journey of preparing for powerlifting and bodybuilding competitions as well as training others, I have learnt that with an individualized plan, paying close attention to one's body responses and support - most can achieve a lean, strong, healthy body.

                I'm eager to share this knowledge and the tools that have helped many of my clients and friends to get stronger, improve body composition as well learn how to maintain it.

                Unfortunately, our economy and health systems are built to make money off of sick people who get addicted to treating symptoms instead of real illness causes. It is alarming that obesity and related diseases are much of a greater concern than hunger in the US. My goal is to bridge the nutrition and exercise knowledge gap for as many people as possible using a science-based approach to long-term health and wellness.
            </Text>
        </Card>
    );
};

function SponsorMission() {
    return (
        <Card>
            <Card.Title>
                Thanks to Our Sponsors
            </Card.Title>
            <Card.Divider />
            <Text style={{ margin: 10 }}>
                We have been able to provide excelent services thanks to our partners and sponsors. Here are some of them.
            </Text>
        </Card>
    );
};

const AboutScreen = () => {
    const programs = useSelector((state) => state.programs); // was partners and sponsors in NuCamp
    // our partners and sponsors are 2 diff slices
    // Mission statement is placed within if, if and return separates the code to make code more readable

    // JAMES PUT EXPLANATION HERE

        if (programs.isLoading) { // if programs are loading - the mission statement will render
        return (
            <ScrollView>
                <Mission />
                <Card>
                    <Card.Title>Our Programs!</Card.Title>
                    <Card.Divider />
                    <Loading />
                </Card>
            </ScrollView>
        );
    }

    if (programs.errMess) { // if programs don't load - this still makes mission statement
        return (
            <ScrollView>
                <Animatable.View
                    animation='fadeInDown'
                    duration={2000}
                    delay={1000}
                >
                    <Mission />
                    <Card>
                        <Card.Title>Our Programs!</Card.Title>
                        <Card.Divider />
                        <Text>{programs.errMess}</Text>
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
                        Our Programs
                    </Card.Title>
                    <Card.Divider />
                    {programs.programsArray.map((program) => (
                        <ListItem key={program.id}>
                            <Avatar rounded source={{ uri: baseUrl + program.image }} />
                            <ListItem.Content>
                                <ListItem.Title>{program.name}</ListItem.Title>
                                <ListItem.Subtitle>
                                    {program.description}
                                </ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    ))}
                </Card>
            </Animatable.View>
        </ScrollView>
    )
    
}; // this should close at the bottom of the file? we have the "return outside of function" now, but when we put it into function - the code beneath it stays greyed out and "unutilized"

// if (sponsors.isLoading) {
//     return (
//         <ScrollView>
//             <SponsorMission />
//             <Card>
//                 <Card.Title>Our Sponsors!</Card.Title>
//                 <Card.Divider />
//                 <Loading />
//             </Card>
//         </ScrollView>
//     );
// }
// if (sponsors.errMess) {
//     return (
//         <ScrollView>
//             <Animatable.View
//                 animation='fadeInDown'
//                 duration={2000}
//                 delay={1000}
//             >
//                 <SponsorMission />
//                 <Card>
//                     <Card.Title>Our Sponsors!</Card.Title>
//                     <Card.Divider />
//                     <Text>{sponsors.errMess}</Text>
//                 </Card>
//             </Animatable.View >
//         </ScrollView>
//     );
// }

// return (
//     <ScrollView>
//         <Animatable.View
//             animation='fadeInDown'
//             duration={2000}
//             delay={1000}
//         >
//             <SponsorMission />
//             <Card>
//                 <Card.Title>
//                     Our Sponsors
//                 </Card.Title>
//                 <Card.Divider />
//                 {sponsors.sponsorsArray.map((sponsor) => (
//                     <ListItem key={partner.id}>
//                         <Avatar rounded source={{ uri: baseUrl + sponsor.image }} />
//                         <ListItem.Content>
//                             <ListItem.Title>{sponsors.name}</ListItem.Title>
//                             <ListItem.Subtitle>
//                                 {sponsors.description}
//                             </ListItem.Subtitle>
//                         </ListItem.Content>
//                     </ListItem>
//                 ))}
//             </Card>
//         </Animatable.View>
//     </ScrollView>
// )
                
export default AboutScreen;