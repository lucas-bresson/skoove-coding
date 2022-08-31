import React, { useState } from 'react';
import { FlatList, StyleSheet, Platform, StatusBar, View } from 'react-native';

import manifest from '../data/manifest.json';
import Tile from '../components/Tile';

interface Props {
    navigation: any;
}

function HomeScreen({ navigation }: Props) {
    const [favorite, setFavorite] = useState('');
    const [ratings, setRatings] = useState({});

    const setRating = ({ title, rating }: { title: string; rating: number }) => {
        setRatings((prevState) => ({
            ...prevState,
            [title]: rating,
        }));
    };

    const renderItem = ({ item }) => {
        const handlePress = () =>
            navigation.navigate('Details', {
                title: item.title,
                song: item,
                isFavorite: item.title === favorite,
                setFavorite,
                rating: ratings[item.title],
                setRating,
            });

        const handleFavoritePress = () => {
            if (item.title !== favorite) {
                setFavorite(item.title);
            } else {
                setFavorite('');
            }
        };

        return (
            <Tile
                title={item.title}
                cover={item.cover}
                isFavorite={item.title === favorite}
                onPress={handlePress}
                onFavoritePress={handleFavoritePress}
                rating={ratings[item.title]}
            />
        );
    };

    return (
        <View style={styles.container}>
            <FlatList data={manifest.data} renderItem={renderItem} />
        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 32,
        color: '#000',
        marginTop: 24,
        marginBottom: 24,
    },
});
