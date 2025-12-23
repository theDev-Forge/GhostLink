import { Colors, Spacing, Typography } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { ResizeMode, Video } from 'expo-av';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

export default function PlayerScreen() {
    const { url } = useLocalSearchParams();
    const video = useRef<Video>(null);
    const [error, setError] = useState<string | null>(null);
    const [status, setStatus] = useState<any>({});
    const [resizeMode, setResizeMode] = useState<ResizeMode>(ResizeMode.CONTAIN);
    const router = useRouter();

    useEffect(() => {
        // Allow landscape orientation
        ScreenOrientation.unlockAsync();
        return () => {
            // Lock back to portrait
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
        };
    }, []);

    const toggleResizeMode = () => {
        setResizeMode(prev => {
            if (prev === ResizeMode.CONTAIN) return ResizeMode.COVER;
            if (prev === ResizeMode.COVER) return ResizeMode.STRETCH;
            return ResizeMode.CONTAIN;
        });
    };

    const handleError = (e: string) => {
        console.log('Video Error:', e);
        setError("Unable to play stream. It might be offline or geo-blocked.");
    };

    return (
        <View style={styles.container}>
            <StatusBar hidden />
            <Stack.Screen options={{ headerShown: false, animation: 'slide_from_bottom' }} />

            <Video
                ref={video}
                style={styles.video}
                source={{
                    uri: url as string,
                }}
                useNativeControls
                resizeMode={resizeMode}
                isLooping={false}
                shouldPlay={true}
                onError={(e) => handleError(e)}
                onPlaybackStatusUpdate={status => setStatus(() => status)}
            />

            {/* Resize Toggle Button */}
            <Pressable style={styles.resizeButton} onPress={toggleResizeMode}>
                <Ionicons
                    name={resizeMode === ResizeMode.CONTAIN ? "expand-outline" : resizeMode === ResizeMode.COVER ? "contract-outline" : "scan-outline"}
                    size={24}
                    color="#fff"
                />
            </Pressable>

            {/* Loading Indicator */}
            {status.isLoaded === false && !error && (
                <View style={[styles.overlay, styles.loadingOverlay]}>
                    <ActivityIndicator size="large" color={Colors.primary} />
                    <Text style={styles.loadingText}>Loading Stream...</Text>
                </View>
            )}

            {/* Error Overlay */}
            {error && (
                <View style={styles.overlay}>
                    <Ionicons name="alert-circle-outline" size={48} color={Colors.error} />
                    <Text style={styles.errorText}>{error}</Text>
                    <Pressable style={styles.button} onPress={() => router.back()}>
                        <Text style={styles.buttonText}>Go Back</Text>
                    </Pressable>
                </View>
            )}

            {/* Back Button (Always visible if controls hidden/error) */}
            <Pressable style={styles.closeButton} onPress={() => router.back()}>
                <Ionicons name="close" size={24} color="#fff" />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    video: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: Spacing.xl,
        zIndex: 2,
    },
    loadingOverlay: {
        backgroundColor: '#000', // Solid black for loading
    },
    loadingText: {
        color: Colors.textSecondary,
        marginTop: Spacing.m,
    },
    errorText: {
        ...Typography.h3,
        color: Colors.text,
        textAlign: 'center',
        marginTop: Spacing.m,
        marginBottom: Spacing.l,
    },
    button: {
        backgroundColor: Colors.surfaceHighlight,
        paddingHorizontal: Spacing.l,
        paddingVertical: Spacing.s,
        borderRadius: 8,
    },
    buttonText: {
        color: Colors.text,
        fontWeight: '600',
    },
    closeButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    resizeButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    }
});
