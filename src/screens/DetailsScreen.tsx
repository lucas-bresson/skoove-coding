import React from 'react';
import { Text, StyleSheet, Platform, StatusBar, SafeAreaView, TouchableOpacity, View, Image } from 'react-native';
import Slider from '@react-native-community/slider';
import FavoriteHeart from '../components/FavoriteHeart';
import Rating from '../components/Rating';

function DetailsScreen({ navigation, route }) {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Image source={{ uri: route.params.cover }} style={styles.cover} />
                <FavoriteHeart filled={false} size={64} style={styles.heart} />
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
