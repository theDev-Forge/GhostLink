import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors, Spacing, Typography } from '../constants/theme';

interface SegmentedControlProps {
    options: string[];
    selectedIndex: number;
    onChange: (index: number) => void;
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({ options, selectedIndex, onChange }) => {
    return (
        <View style={styles.container}>
            {options.map((option, index) => {
                const isSelected = index === selectedIndex;
                return (
                    <Pressable
                        key={index}
                        style={[styles.segment, isSelected && styles.selectedSegment]}
                        onPress={() => onChange(index)}
                    >
                        <Text style={[styles.text, isSelected && styles.selectedText]}>
                            {option}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: Colors.surface,
        padding: 2,
        borderRadius: 8,
        marginVertical: Spacing.s,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    segment: {
        flex: 1,
        paddingVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
    },
    selectedSegment: {
        backgroundColor: Colors.surfaceHighlight,
    },
    text: {
        ...Typography.body,
        fontSize: 14,
        fontWeight: '500',
        color: Colors.textSecondary,
    },
    selectedText: {
        color: Colors.text,
        fontWeight: '600',
    },
});
