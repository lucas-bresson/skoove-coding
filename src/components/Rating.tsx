import React from 'react';
import { View, ViewStyle, StyleSheet, Image, TouchableOpacity } from 'react-native';

const Star = ({
    value,
    treshold,
    size,
    onPress,
}: {
    treshold: number;
    value: number;
    size: number;
    onPress: (rating: number) => void;
}) => {
    return (
        <TouchableOpacity onPress={() => onPress(treshold)}>
            <Image
                source={
                    value < treshold
                        ? require('../assets/star-line-black.png')
                        : require('../assets/star-filled-black.png')
                }
                style={{ width: size, height: size }}
            />
        </TouchableOpacity>
    );
};

interface Props {
    value: number;
    size: number;
    handleRatingPressed?: (rating: number) => void;
    style?: ViewStyle | ViewStyle[];
}

function Rating({ value, size, handleRatingPressed, style }: Props) {
    return (
        <View style={[styles.container, style]}>
            <Star treshold={1} value={value || -1} size={size} onPress={() => handleRatingPressed(1)} />
            <Star treshold={2} value={value || -1} size={size} onPress={() => handleRatingPressed(2)} />
            <Star treshold={3} value={value || -1} size={size} onPress={() => handleRatingPressed(3)} />
            <Star treshold={4} value={value || -1} size={size} onPress={() => handleRatingPressed(4)} />
            <Star treshold={5} value={value || -1} size={size} onPress={() => handleRatingPressed(5)} />
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
