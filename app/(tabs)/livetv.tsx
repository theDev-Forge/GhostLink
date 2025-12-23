import { ChannelItem } from '@/components/ChannelItem';
import { Colors, Spacing, Typography } from '@/constants/theme';
import { Channel, fetchFeaturedChannels } from '@/services/api';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LiveTVScreen() {
    const [channels, setChannels] = useState<Channel[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const channelData = await fetchFeaturedChannels();
            setChannels(channelData);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleChannelPress = (channel: Channel) => {
        router.push({ pathname: '/player', params: { url: channel.url } });
    };

    const renderItem = ({ item }: { item: Channel }) => (
        <ChannelItem channel={item} onPress={handleChannelPress} />
    );

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <StatusBar barStyle="light-content" backgroundColor={Colors.background} />

            <View style={styles.header}>
                <Text style={styles.headerTitle}>Live TV</Text>
            </View>

            {loading ? (
                <ActivityIndicator size="large" color={Colors.primary} style={styles.loader} />
            ) : (
                <FlatList
                    data={channels}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => item.url + index}
                    contentContainerStyle={styles.list}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        paddingHorizontal: Spacing.m,
        paddingVertical: Spacing.s,
        backgroundColor: Colors.background,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    headerTitle: {
        ...Typography.h1,
        color: Colors.primary,
    },
    loader: {
        flex: 1,
    },
    list: {
        padding: Spacing.s,
        paddingBottom: 120,
    },
});
