import React from 'react';
import { View, ViewStyle, StyleSheet, Image } from 'react-native';

const Star = ({ value, treshold, size }: { treshold: number; value: number; size: number }) => {
    return (
        <Image
            source={
                value < treshold ? require('../assets/star-line-black.png') : require('../assets/star-filled-black.png')
            }
            style={{ width: size, height: size }}
        />
    );
};

interface Props {
    value: number;
    size: number;
    style?: ViewStyle | ViewStyle[];
}

function Rating({ value, size, style }: Props) {
    return (
        <View style={[styles.container, style]}>
            <Star treshold={1} value={value} size={size} />
            <Star treshold={2} value={value} size={size} />
            <Star treshold={3} value={value} size={size} />
            <Star treshold={4} value={value} size={size} />
            <Star treshold={5} value={value} size={size} />
        </View>
    );
}

export default Rating;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    star: {
        width: 18,
        height: 18,
    },
});
