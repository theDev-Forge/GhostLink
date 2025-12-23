import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors, Spacing, Typography } from '../constants/theme';

interface HeroBannerProps {
    title: string;
    subtitle: string;
    imageUrl?: string;
    onPress?: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ title, subtitle, imageUrl, onPress }) => {
    // Fallback image if none provided
    const imageSource = imageUrl ? { uri: imageUrl } : { uri: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2605&auto=format&fit=crop' };

    return (
        <View style={styles.container}>
            <ImageBackground source={imageSource} style={styles.image} imageStyle={styles.imageConfig}>
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.9)']}
                    style={styles.gradient}
                >
                    <View style={styles.content}>
                        <Text style={styles.tag}>FEATURED</Text>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.subtitle}>{subtitle}</Text>

                        <Pressable style={styles.button} onPress={onPress}>
                            <Text style={styles.buttonText}>Watch Now</Text>
                        </Pressable>
                    </View>
                </LinearGradient>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 220,
        width: '100%',
        marginBottom: Spacing.m,
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: Colors.surfaceHighlight,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    imageConfig: {
        borderRadius: 16,
    },
    gradient: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: Spacing.m,
    },
    content: {
        alignItems: 'flex-start',
    },
    tag: {
        color: Colors.primary,
        fontWeight: 'bold',
        fontSize: 12,
        marginBottom: 4,
        backgroundColor: 'rgba(0,0,0,0.6)',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    title: {
        ...Typography.h2,
        marginBottom: 4,
    },
    subtitle: {
        color: Colors.textSecondary,
        fontSize: 14,
        marginBottom: Spacing.m,
    },
    button: {
        backgroundColor: Colors.primary,
        paddingHorizontal: Spacing.l,
        paddingVertical: 6,
        borderRadius: 20,
    },
    buttonText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 14,
    }
});
