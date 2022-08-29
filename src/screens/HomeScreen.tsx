import React from 'react';
import { FlatList, StyleSheet, Platform, StatusBar, View } from 'react-native';

import manifest from '../data/manifest.json';
import Tile from '../components/Tile';

interface Props {
    navigation: any;
}

function HomeScreen({ navigation }: Props) {
    const renderItem = ({ item }) => {
        return (
            <Tile
                onPress={() =>
                    navigation.navigate('Details', { title: item.title, cover: item.cover, isFavorite: false })
                }
                title={item.title}
                cover={item.cover}
                isFavorite={false}
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
