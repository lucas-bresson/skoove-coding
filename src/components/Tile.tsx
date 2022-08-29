import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Rating from './Rating';
import FavoriteHeart from './FavoriteHeart';

interface Props {
    title: string;
    cover: any;
    isFavorite: boolean;
    onPress: () => void;
    onFavoritePress: () => void;
}

function Tile({ title, cover, isFavorite, onPress, onFavoritePress }: Props) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Rating value={3} size={24} style={styles.rating} />
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
    rating: {
        position: 'absolute',
        top: 8,
        left: 8,
        zIndex: 1,
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
