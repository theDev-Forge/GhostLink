import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors, Spacing, Typography } from '../constants/theme';
import { Channel } from '../services/api';

interface ChannelItemProps {
    channel: Channel;
    onPress: (channel: Channel) => void;
}

export const ChannelItem: React.FC<ChannelItemProps> = ({ channel, onPress }) => {
    return (
        <Pressable style={({ pressed }) => [styles.container, pressed && styles.pressed]} onPress={() => onPress(channel)}>
            <View style={styles.logoContainer}>
                {channel.logo ? (
                    <Image source={{ uri: channel.logo }} style={styles.logo} resizeMode="contain" />
                ) : (
                    <View style={styles.placeholderLogo}>
                        <Text style={styles.placeholderText}>{channel.name.substring(0, 1)}</Text>
                    </View>
                )}
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.name} numberOfLines={1}>{channel.name}</Text>
                <View style={styles.metaContainer}>
                    {channel.group && <Text style={styles.group}>{channel.group}</Text>}
                    <Ionicons name="play-circle-outline" size={16} color={Colors.primary} style={styles.playIcon} />
                </View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: Spacing.m,
        marginBottom: Spacing.xs,
        alignItems: 'center',
        backgroundColor: Colors.surface,
        borderRadius: 8,
    },
    pressed: {
        backgroundColor: Colors.surfaceHighlight,
    },
    logoContainer: {
        width: 60,
        height: 40,
        marginRight: Spacing.m,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 4,
    },
    logo: {
        width: '100%',
        height: '100%',
    },
    placeholderLogo: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.surfaceHighlight,
        borderRadius: 4,
    },
    placeholderText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.textSecondary,
    },
    infoContainer: {
        flex: 1,
    },
    name: {
        ...Typography.body,
        fontWeight: '600',
        marginBottom: 4,
    },
    metaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    group: {
        ...Typography.caption,
        backgroundColor: Colors.background,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        overflow: 'hidden',
    },
    playIcon: {
        opacity: 0.8,
    }
});
