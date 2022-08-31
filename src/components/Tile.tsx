import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import FavoriteHeart from './FavoriteHeart';

interface Props {
    title: string;
    cover: any;
    isFavorite: boolean;
    onPress: () => void;
    onFavoritePress: () => void;
    rating?: number;
}

const Star = ({ value, treshold }: { treshold: number; value: number }) => (
    <Image
        source={
            value < treshold ? require('../assets/star-line-black.png') : require('../assets/star-filled-black.png')
        }
        style={styles.star}
    />
);

function Tile({ title, cover, isFavorite, onPress, onFavoritePress, rating }: Props) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <View style={styles.ratings}>
                <Star treshold={1} value={rating || -1} />
                <Star treshold={2} value={rating || -1} />
                <Star treshold={3} value={rating || -1} />
                <Star treshold={4} value={rating || -1} />
                <Star treshold={5} value={rating || -1} />
            </View>
            <Image source={{ uri: cover }} style={styles.cover} />
            <View style={styles.details}>
                <Text style={styles.text}>{title}</Text>
                <FavoriteHeart filled={isFavorite} size={32} onPress={onFavoritePress} style={styles.heart} />
            </View>
        </TouchableOpacity>
    );
}

export default Tile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'black',
        margin: 24,
    },
    ratings: {
        position: 'absolute',
        top: 8,
        left: 8,
        flexDirection: 'row',
        zIndex: 1,
    },
    star: {
        height: 18,
        width: 18,
    },
    cover: {
        flex: 1,
        width: 300,
        height: 200,
    },
    details: {
        height: 42,
        justifyContent: 'center',
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
    },
    heart: {
        position: 'absolute',
        bottom: 8,
        right: 8,
    },
});
