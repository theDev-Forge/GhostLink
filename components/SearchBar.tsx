import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Colors, Spacing } from '../constants/theme';

interface SearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChangeText, placeholder = 'Search...' }) => {
    return (
        <View style={styles.container}>
            <Ionicons name="search" size={20} color={Colors.textSecondary} style={styles.icon} />
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={Colors.textSecondary}
            />
            {value.length > 0 && (
                <Ionicons
                    name="close-circle"
                    size={20}
                    color={Colors.textSecondary}
                    onPress={() => onChangeText('')}
                    suppressHighlighting
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.surface,
        borderRadius: 8,
        paddingHorizontal: Spacing.s,
        paddingVertical: 8, // Fixed height feel
        marginVertical: Spacing.s,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    icon: {
        marginRight: Spacing.s,
    },
    input: {
        flex: 1,
        color: Colors.text,
        fontSize: 16,
        height: '100%', // ensure it takes height
        paddingVertical: 0, // fix android padding
    },
});
