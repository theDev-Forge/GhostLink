import { SearchBar } from '@/components/SearchBar';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, SectionList, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChannelItem } from '../components/ChannelItem';
import { Colors, Spacing, Typography } from '../constants/theme';
import { Channel, fetchChannels } from '../services/api';

interface Section {
    title: string;
    data: Channel[];
}

export default function ChannelsScreen() {
    const { code, countryName } = useLocalSearchParams();
    const [channels, setChannels] = useState<Channel[]>([]);
    const [sections, setSections] = useState<Section[]>([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (code) {
            loadChannels(code as string);
        }
    }, [code]);

    useEffect(() => {
        if (channels.length === 0) return;

        let filtered = channels;
        if (search.trim()) {
            const lowerSearch = search.toLowerCase();
            filtered = channels.filter(c => c.name.toLowerCase().includes(lowerSearch));
        }

        // Group by 'group'
        const groups: Record<string, Channel[]> = {};
        filtered.forEach(c => {
            const groupName = c.group || 'General';
            if (!groups[groupName]) {
                groups[groupName] = [];
            }
            groups[groupName].push(c);
        });

        const sortedSections: Section[] = Object.keys(groups).sort().map(key => ({
            title: key,
            data: groups[key]
        }));

        setSections(sortedSections);

    }, [search, channels]);

    const loadChannels = async (countryCode: string) => {
        setLoading(true);
        const data = await fetchChannels(countryCode);
        setChannels(data);
        setLoading(false);
    };

    const handlePress = (channel: Channel) => {
        router.push({
            pathname: '/player',
            params: { url: channel.url }
        });
    };

    return (
        <SafeAreaView style={styles.container} edges={['bottom']}>
            <Stack.Screen
                options={{
                    title: countryName as string || 'Channels',
                    headerStyle: { backgroundColor: Colors.background },
                    headerTintColor: Colors.text,
                    headerShadowVisible: false,
                }}
            />
            <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
            <View style={styles.header}>
                <SearchBar
                    value={search}
                    onChangeText={setSearch}
                    placeholder="Search channels..."
                />
            </View>

            {loading ? (
                <ActivityIndicator size="large" color={Colors.primary} style={styles.loader} />
            ) : (
                <View style={{ flex: 1 }}>
                    {sections.length === 0 ? (
                        <View style={styles.center}>
                            <Text style={styles.emptyText}>No channels found.</Text>
                        </View>
                    ) : (
                        <SectionList
                            sections={sections}
                            renderItem={({ item }) => <ChannelItem channel={item} onPress={handlePress} />}
                            renderSectionHeader={({ section: { title } }) => (
                                <View style={styles.sectionHeader}>
                                    <Text style={styles.sectionTitle}>{title}</Text>
                                </View>
                            )}
                            keyExtractor={(item, index) => item.url + index}
                            contentContainerStyle={styles.list}
                            stickySectionHeadersEnabled={false}
                        />
                    )}
                </View>
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
        paddingBottom: Spacing.s,
        backgroundColor: Colors.background,
    },
    loader: {
        flex: 1,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyText: {
        color: Colors.textSecondary,
        fontSize: 16,
    },
    list: {
        paddingHorizontal: Spacing.m,
        paddingBottom: Spacing.xl,
    },
    sectionHeader: {
        marginTop: Spacing.m,
        marginBottom: Spacing.s,
    },
    sectionTitle: {
        ...Typography.h3,
        color: Colors.primary,
    }
});
