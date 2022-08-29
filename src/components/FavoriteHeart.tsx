import React from 'react';
import { ViewStyle, Image, TouchableOpacity } from 'react-native';

interface Props {
    filled: boolean;
    size: number;
    onPress: () => void;
    style?: ViewStyle | ViewStyle[];
}

function FavoriteHeart({ filled, size, onPress, style }: Props) {
    return (
        <TouchableOpacity onPress={onPress} style={style}>
            <Image
                source={
                    filled ? require('../assets/heart-filled-black.png') : require('../assets/heart-line-black.png')
                }
                style={{ width: size, height: size }}
            />
        </TouchableOpacity>
    );
}

export default FavoriteHeart;
