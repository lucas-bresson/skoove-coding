import React from 'react';
import { View, ViewStyle, Image } from 'react-native';

interface Props {
    filled: boolean;
    size: number;
    style?: ViewStyle | ViewStyle[];
}

function FavoriteHeart({ filled, size, style }: Props) {
    return (
        <View style={style}>
            <Image
                source={
                    filled ? require('../assets/heart-filled-black.png') : require('../assets/heart-line-black.png')
                }
                style={{ width: size, height: size }}
            />
        </View>
    );
}

export default FavoriteHeart;
