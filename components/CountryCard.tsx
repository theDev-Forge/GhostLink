import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors, Spacing } from '../constants/theme';
import { Country } from '../services/api';

interface CountryCardProps {
    country: Country;
    onPress: (country: Country) => void;
}

export const CountryCard: React.FC<CountryCardProps> = ({ country, onPress }) => {
    return (
        <Pressable
            style={({ pressed }) => [styles.container, pressed && styles.pressed]}
            onPress={() => onPress(country)}
        >
            <View style={styles.flagContainer}>
                <Text style={styles.flag}>{country.flag}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.name} numberOfLines={1}>{country.name}</Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, // Expand to fill grid cell
        backgroundColor: Colors.surface,
        borderRadius: 12,
        margin: Spacing.xs,
        overflow: 'hidden',
        height: 120,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    pressed: {
        opacity: 0.8,
        transform: [{ scale: 0.98 }],
    },
    flagContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.surfaceHighlight, // Slightly lighter top
    },
    flag: {
        fontSize: 48,
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: Spacing.s,
        backgroundColor: Colors.surface,
    },
    name: {
        color: Colors.text,
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
    },
});
