import React, { useState } from 'react';
import { StyleSheet, Platform, StatusBar, SafeAreaView, View, Image, TouchableOpacity, LogBox } from 'react-native';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

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

const PlayButton = ({ playing, onPress }: { playing: boolean; onPress: () => void }) => {
    return (
        <TouchableOpacity style={styles.playButton} onPress={onPress}>
            <Image
                source={playing ? require('../assets/pause.png') : require('../assets/play.png')}
                style={{ height: 90, width: 90 }}
            />
        </TouchableOpacity>
    );
};

function DetailsScreen({ route }) {
    const [isFavorite, setIsFavorite] = useState(route.params.isFavorite);
    const [localRating, setLocalRating] = useState(route.params.rating);
    const [playing, setPlaying] = useState(false);
    const [sound, setSound] = useState(route.params.song.audio);

    const { title, cover, audio, totalDurationMs } = route.params.song;

    async function playSound() {
        setPlaying(true);
        const { sound } = await Audio.Sound.createAsync({ uri: audio });
        setSound(sound);
        await sound.playAsync();
    }

    async function pauseSound() {
        setPlaying(false);
        await sound.pauseAsync();
    }

    const handleFavoritePress = () => {
        if (!isFavorite) {
            setIsFavorite(true);
            route.params.setFavorite(title);
        } else {
            setIsFavorite(false);
            route.params.setFavorite('');
        }
    };

    const handleRatingPressed = (rating: number) => {
        setLocalRating(rating);
        route.params.setRating({ title, rating });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Image source={{ uri: cover }} style={styles.cover} />
                <FavoriteHeart filled={isFavorite} size={64} onPress={handleFavoritePress} style={styles.heart} />
                <PlayButton playing={playing} onPress={playing ? pauseSound : playSound} />
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
    playButton: {
        backgroundColor: 'white',
        position: 'absolute',
        top: 112,
        left: 112,
        height: 80,
        width: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
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
