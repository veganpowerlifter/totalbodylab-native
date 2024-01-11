import RenderCoach from '../features/campsites/RenderCampsite';

const CoachInfoScreen = ({ route }) => {
    const { coach } = route.params;

    return (

        <FlatList
            data={coachcard.coachesArray.filter(
                (comment) => comment.coachId === coach.id
            )}
            renderItem={renderCommentItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ marginHorizontal: 20, paddingVertical: 20 }}
            ListHeaderComponent={
                <>
                    <RenderCoach
                        coach={coach}
                        isFavorite={favorites.includes(coach.id)}
                        markFavorite={() => dispatch(toggleFavorite(coach.id))}
                    />
                </>
            }
        />

    );
};

// const styles = StyleSheet.create({
 
//     coachcardItem: {
//         paddingVertical: 10,
//         paddingHorizontal: 20,
//         backgroundColor: '#fff'
//     },

// });

export default CoachInfoScreen;