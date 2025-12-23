import { ChannelItem } from '@/components/ChannelItem'; // Added for search results
import { CountryCard } from '@/components/CountryCard';
import { HeroBanner } from '@/components/HeroBanner';
import { HorizontalChannelItem } from '@/components/HorizontalChannelItem';
import { SearchBar } from '@/components/SearchBar';
import { SectionHeader } from '@/components/SectionHeader';
import { Colors, Spacing, Typography } from '@/constants/theme';
import { Channel, Country, fetchCountries, fetchFeaturedChannels } from '@/services/api';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [channels, setChannels] = useState<Channel[]>([]);

  // Content Categories
  const [newsChannels, setNewsChannels] = useState<Channel[]>([]);
  const [sportsChannels, setSportsChannels] = useState<Channel[]>([]);
  const [movieChannels, setMovieChannels] = useState<Channel[]>([]);
  const [musicChannels, setMusicChannels] = useState<Channel[]>([]);

  // Search State
  const [search, setSearch] = useState('');
  const [filteredChannels, setFilteredChannels] = useState<Channel[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);

  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadData();
  }, []);

  // Filter Logic
  useEffect(() => {
    if (search.trim() === '') {
      setFilteredChannels([]);
      setFilteredCountries([]);
      return;
    }
    const lower = search.toLowerCase();
    setFilteredChannels(channels.filter(c =>
      c.name.toLowerCase().includes(lower) ||
      c.group?.toLowerCase().includes(lower)
    ));
    setFilteredCountries(countries.filter(c => c.name.toLowerCase().includes(lower)));
  }, [search, channels, countries]);

  const loadData = async () => {
    setLoading(true);
    try {
      const countryData = await fetchCountries();
      setCountries(countryData);

      const channelData = await fetchFeaturedChannels();
      setChannels(channelData);

      // Categorize Channels
      const news = channelData.filter(c => c.group?.toLowerCase().includes('news') || c.name.toLowerCase().includes('news'));
      const sports = channelData.filter(c => c.group?.toLowerCase().includes('sport') || c.name.toLowerCase().includes('sport'));
      const movies = channelData.filter(c => c.group?.toLowerCase().includes('movie') || c.name.toLowerCase().includes('cinema') || c.name.toLowerCase().includes('film'));
      const music = channelData.filter(c => c.group?.toLowerCase().includes('music') || c.name.toLowerCase().includes('music'));

      setNewsChannels(news);
      setSportsChannels(sports);
      setMovieChannels(movies);
      setMusicChannels(music);

    } catch (e) {
      console.error("Error loading data", e);
    } finally {
      setLoading(false);
    }
  };

  const handleChannelPress = (channel: Channel) => {
    router.push({ pathname: '/player', params: { url: channel.url } });
  };

  const handleCountryPress = (country: Country) => {
    router.push({ pathname: '/channels', params: { code: country.code, countryName: country.name } });
  };

  const renderSearchResult = ({ item }: { item: Channel | Country }) => {
    if ('url' in item) {
      return <ChannelItem channel={item as Channel} onPress={handleChannelPress} />;
    } else {
      // Small row for country
      return (
        <Pressable style={styles.countryResult} onPress={() => handleCountryPress(item as Country)}>
          <Text style={styles.countryResultText}>{item.flag} {item.name}</Text>
        </Pressable>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />

      <View style={styles.header}>
        <SearchBar value={search} onChangeText={setSearch} placeholder="Search channels, countries..." />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={Colors.primary} style={styles.loader} />
      ) : search.length > 0 ? (
        // SEARCH RESULTS VIEW
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Search Results</Text>
          <FlatList
            data={[...filteredCountries, ...filteredChannels]}
            keyExtractor={(item, index) => ('url' in item ? item.url : item.code) + index}
            renderItem={renderSearchResult}
            contentContainerStyle={[styles.list, { paddingBottom: 100 }]} // Add padding for Fab/Tab
          />
        </View>
      ) : (
        // DASHBOARD VIEW
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

          <View style={styles.heroContainer}>
            {channels.length > 0 ? (
              <HeroBanner
                title={channels[0].name}
                subtitle="Featured Channel • Live Now"
                imageUrl={channels[0].logo || undefined}
                onPress={() => handleChannelPress(channels[0])}
              />
            ) : null}
          </View>

          {/* NEWS Section */}
          {newsChannels.length > 0 && (
            <>
              <SectionHeader title="News" onPressMore={() => { }} />
              <FlatList
                horizontal
                data={newsChannels}
                renderItem={({ item }) => <HorizontalChannelItem channel={item} onPress={handleChannelPress} />}
                keyExtractor={(item, index) => 'news-' + index}
                contentContainerStyle={styles.horizontalList}
                showsHorizontalScrollIndicator={false}
              />
            </>
          )}

          {/* SPORTS Section */}
          {sportsChannels.length > 0 && (
            <>
              <SectionHeader title="Sports" onPressMore={() => { }} />
              <FlatList
                horizontal
                data={sportsChannels}
                renderItem={({ item }) => <HorizontalChannelItem channel={item} onPress={handleChannelPress} />}
                keyExtractor={(item, index) => 'sports-' + index}
                contentContainerStyle={styles.horizontalList}
                showsHorizontalScrollIndicator={false}
              />
            </>
          )}

          {/* MOVIES Section */}
          {movieChannels.length > 0 && (
            <>
              <SectionHeader title="Movies" onPressMore={() => { }} />
              <FlatList
                horizontal
                data={movieChannels}
                renderItem={({ item }) => <HorizontalChannelItem channel={item} onPress={handleChannelPress} />}
                keyExtractor={(item, index) => 'movies-' + index}
                contentContainerStyle={styles.horizontalList}
                showsHorizontalScrollIndicator={false}
              />
            </>
          )}

          {/* MUSIC Section */}
          {musicChannels.length > 0 && (
            <>
              <SectionHeader title="Music" onPressMore={() => { }} />
              <FlatList
                horizontal
                data={musicChannels}
                renderItem={({ item }) => <HorizontalChannelItem channel={item} onPress={handleChannelPress} />}
                keyExtractor={(item, index) => 'music-' + index}
                contentContainerStyle={styles.horizontalList}
                showsHorizontalScrollIndicator={false}
              />
            </>
          )}

          {/* Countries Section */}
          <SectionHeader title="Explore Countries" onPressMore={() => { }} />
          <FlatList
            horizontal
            data={countries.slice(0, 15)}
            renderItem={({ item }) => (
              <View style={{ width: 140, marginRight: Spacing.m }}>
                <CountryCard country={item} onPress={handleCountryPress} />
              </View>
            )}
            keyExtractor={(item) => item.code}
            contentContainerStyle={styles.horizontalList}
            showsHorizontalScrollIndicator={false}
          />

          <View style={{ height: 100 }} />
        </ScrollView>
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
  content: {
    flex: 1,
  },
  list: {
    padding: Spacing.s,
    paddingBottom: 120, // Added extra padding for Tab Bar
  },
  scrollContent: {
    paddingBottom: 120, // Added extra padding for Tab Bar
  },
  heroContainer: {
    paddingHorizontal: Spacing.m,
  },
  horizontalList: {
    paddingHorizontal: Spacing.m,
  },
  sectionTitle: {
    ...Typography.h2,
    paddingHorizontal: Spacing.m,
    marginBottom: Spacing.s,
    marginTop: Spacing.s,
  },
  countryResult: {
    padding: Spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceHighlight,
  },
  countryResultText: {
    color: Colors.text,
    fontSize: 16,
  }
});
