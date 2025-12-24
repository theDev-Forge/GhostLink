export interface Country {
  name: string;
  code: string;
  languages: string[];
  flag: string;
}

export interface Channel {
  name: string;
  logo: string | null;
  url: string;
  group: string | null;
}

const COUNTRIES_URL = 'https://iptv-org.github.io/api/countries.json';

export const fetchCountries = async (): Promise<Country[]> => {
  try {
    const response = await fetch(COUNTRIES_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch countries');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    return [];
  }
};

export const fetchChannels = async (countryCode: string): Promise<Channel[]> => {
  const url = `https://iptv-org.github.io/iptv/countries/${countryCode.toLowerCase()}.m3u`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`No playlist found for country: ${countryCode}`);
        return [];
      }
      throw new Error('Failed to fetch channels');
    }
    const text = await response.text();
    return parseM3U(text);
  } catch (error) {
    console.error(`Error fetching channels for ${countryCode}:`, error);
    return [];
  }
};

const parseM3U = (content: string): Channel[] => {
  const lines = content.split('\n');
  const channels: Channel[] = [];
  let currentChannel: Partial<Channel> = {};

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    if (trimmed.startsWith('#EXTINF:')) {
      const infoPart = trimmed.substring(8);
      const commaIndex = infoPart.lastIndexOf(',');
      const name = infoPart.substring(commaIndex + 1).trim();
      currentChannel.name = name;
      const logoMatch = trimmed.match(/tvg-logo="([^"]*)"/);
      if (logoMatch && logoMatch[1]) {
        currentChannel.logo = logoMatch[1];
      } else {
        currentChannel.logo = null;
      }

      const groupMatch = trimmed.match(/group-title="([^"]*)"/);
      if (groupMatch && groupMatch[1]) {
        currentChannel.group = groupMatch[1];
      } else {
        currentChannel.group = null;
      }

    } else if (!trimmed.startsWith('#')) {
      // URL line
      if (currentChannel.name) {
        currentChannel.url = trimmed;
        channels.push(currentChannel as Channel);
        currentChannel = {};
      }
    }
  }

  return channels;
};

export const fetchFeaturedChannels = async (): Promise<Channel[]> => {
  return fetchChannels('us');
};
