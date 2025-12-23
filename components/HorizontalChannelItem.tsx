import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors, Spacing } from '../constants/theme';
import { Channel } from '../services/api';

interface HorizontalChannelItemProps {
    channel: Channel;
    onPress: (channel: Channel) => void;
}

export const HorizontalChannelItem: React.FC<HorizontalChannelItemProps> = ({ channel, onPress }) => {
    const [imageError, setImageError] = useState(false);

    return (
        <Pressable
            style={({ pressed }) => [styles.container, pressed && styles.pressed]}
            onPress={() => onPress(channel)}
        >
            <View style={styles.logoContainer}>
                {channel.logo && !imageError ? (
                    <Image
                        source={{ uri: channel.logo }}
                        style={styles.logo}
                        resizeMode="contain"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <View style={styles.placeholderLogo}>
                        <Text style={styles.placeholderText}>{channel.name.substring(0, 1)}</Text>
                    </View>
                )}
            </View>
            <Text style={styles.name} numberOfLines={2}>{channel.name}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 140, // Fixed width card
        marginRight: Spacing.m,
        alignItems: 'center',
    },
    pressed: {
        opacity: 0.8,
    },
    logoContainer: {
        width: 140,
        height: 80,
        backgroundColor: Colors.surface,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        borderWidth: 1,
        borderColor: Colors.border,
        padding: 10,
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
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.textSecondary,
    },
    name: {
        color: Colors.text,
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
    },
});
