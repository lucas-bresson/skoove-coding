import React, { useState } from 'react';
import { StyleSheet, Platform, StatusBar, SafeAreaView, View, Image, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import FavoriteHeart from '../components/FavoriteHeart';

const Star = ({ value, treshold, onPress }: { treshold: number; value: number; onPress: (rating: number) => void }) => {
    return (
        <TouchableOpacity onPress={() => onPress(treshold)}>
            <Image
                source={
                    value < treshold
                        ? require('../assets/star-line-black.png')
                        : require('../assets/star-filled-black.png')
                }
                style={styles.star}
            />
        </TouchableOpacity>
    );
};

function DetailsScreen({ route }) {
    const [isFavorite, setIsFavorite] = useState(route.params.isFavorite);
    const [localRating, setLocalRating] = useState(route.params.rating);

    const handleFavoritePress = () => {
        if (!isFavorite) {
            setIsFavorite(true);
            route.params.setFavorite(route.params.title);
        } else {
            setIsFavorite(false);
            route.params.setFavorite('');
        }
    };

    const handleRatingPressed = (rating: number) => {
        setLocalRating(rating);
        route.params.setRating({ title: route.params.title, rating });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Image source={{ uri: route.params.cover }} style={styles.cover} />
                <FavoriteHeart filled={isFavorite} size={64} onPress={handleFavoritePress} style={styles.heart} />
            </View>
            <Slider minimumValue={0} maximumValue={100} step={1} style={styles.slider} />
            <View style={styles.rating}>
                <Star treshold={1} value={localRating || -1} onPress={() => handleRatingPressed(1)} />
                <Star treshold={2} value={localRating || -1} onPress={() => handleRatingPressed(2)} />
                <Star treshold={3} value={localRating || -1} onPress={() => handleRatingPressed(3)} />
                <Star treshold={4} value={localRating || -1} onPress={() => handleRatingPressed(4)} />
                <Star treshold={5} value={localRating || -1} onPress={() => handleRatingPressed(5)} />
            </View>
        </SafeAreaView>
    );
}

export default DetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        alignItems: 'center',
    },
    cover: {
        width: 300,
        height: 300,
        opacity: 0.8,
    },
    heart: {
        position: 'absolute',
        bottom: 8,
        right: 8,
        zIndex: 1,
    },
    slider: {
        marginTop: 24,
        width: 300,
    },
    rating: {
        flexDirection: 'row',
        marginTop: 24,
    },
    star: {
        width: 32,
        height: 32,
    },
});
