import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors, Spacing, Typography } from '../constants/theme';

interface SectionHeaderProps {
    title: string;
    onPressMore?: () => void;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, onPressMore }) => {
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>

                <Text style={styles.title}>{title}</Text>
            </View>
            <Pressable onPress={onPressMore} style={styles.moreContainer}>
                <Text style={styles.more}>More</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Spacing.m,
        marginBottom: Spacing.s,
        marginTop: Spacing.m,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        ...Typography.h3,
        fontSize: 18,
    },
    moreContainer: {
        padding: 4,
    },
    more: {
        color: Colors.textSecondary,
        fontSize: 12,
    }
});
