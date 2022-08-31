import React, { useEffect, useState } from 'react';
import {
    Text,
    StyleSheet,
    Platform,
    StatusBar,
    SafeAreaView,
    View,
    Image,
    TouchableOpacity,
    LogBox,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

import FavoriteHeart from '../components/FavoriteHeart';

const getTimer = (currentPosition: number) => {
    const seconds = Math.round(currentPosition / 1000);
    const minutes = Math.round(seconds / 60);

    if (seconds < 10) {
        return `${minutes || 0}:0${seconds || 0}`;
    }

    return `${minutes || 0}:${seconds || 0}`;
};

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

const PlayButton = ({ isPlaying, onPress }: { isPlaying: boolean; onPress: () => void }) => {
    return (
        <TouchableOpacity style={styles.playButton} onPress={onPress}>
            <Image
                source={isPlaying ? require('../assets/pause.png') : require('../assets/play.png')}
                style={{ height: 90, width: 90 }}
            />
        </TouchableOpacity>
    );
};

function DetailsScreen({ route }) {
    const [isFavorite, setIsFavorite] = useState(route.params.isFavorite);
    const [localRating, setLocalRating] = useState(route.params.rating);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentPosition, setCurrentPosition] = useState(0);
    const [sound, setSound] = useState(undefined);

    const { title, cover, audio, totalDurationMs } = route.params.song;

    const totalDurationSeconds = Math.round(totalDurationMs / 1000);
    const totalDurationMinutes = Math.round(totalDurationSeconds / 60);

    const onPlaybackStatusUpdate = (status) => {
        if (status.isPlaying) {
            setIsPlaying(true);
            setCurrentPosition(status.positionMillis);
        } else {
            setIsPlaying(false);
        }
        if (status.didJustFinish) {
            setIsPlaying(false);
            setCurrentPosition(0);
        }
    };

    async function playSound() {
        try {
            const { sound } = await Audio.Sound.createAsync(
                { uri: audio },
                { positionMillis: currentPosition },
                onPlaybackStatusUpdate
            );
            setSound(sound);
            sound.playAsync();
        } catch (error) {
            console.log('error', error);
        }
    }

    async function pauseSound() {
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
                <PlayButton isPlaying={isPlaying} onPress={isPlaying ? pauseSound : playSound} />
            </View>
            <Slider value={currentPosition} minimumValue={0} maximumValue={totalDurationMs} style={styles.slider} />
            <Text>{`${getTimer(currentPosition)} / ${totalDurationMinutes}:${totalDurationSeconds}`}</Text>
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
