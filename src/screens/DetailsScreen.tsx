import React, { useState } from 'react';
import { Text, StyleSheet, Platform, StatusBar, SafeAreaView, TouchableOpacity, View, Image } from 'react-native';
import Slider from '@react-native-community/slider';
import FavoriteHeart from '../components/FavoriteHeart';
import Rating from '../components/Rating';

function DetailsScreen({ route }) {
    const [isFavorite, setIsFavorite] = useState(route.params.isFavorite);

    const handleFavoritePress = () => {
        if (!isFavorite) {
            setIsFavorite(true);
            route.params.setFavorite(route.params.title);
        } else {
            setIsFavorite(false);
            route.params.setFavorite('');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Image source={{ uri: route.params.cover }} style={styles.cover} />
                <FavoriteHeart filled={isFavorite} size={64} onPress={handleFavoritePress} style={styles.heart} />
            </View>
            <Slider minimumValue={0} maximumValue={100} step={1} style={styles.slider} />
            <Rating value={3} size={40} style={styles.rating} />
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
        marginTop: 24,
    },
});
