import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { BROWS } from '../../assets/avatarParts/browsData';
import { EYES } from '../../assets/avatarParts/eyesData';
import { HAIRSTYLES } from '../../assets/avatarParts/hairData';
import { HEADS } from '../../assets/avatarParts/headData';
import { MOUTHS } from '../../assets/avatarParts/mouthData';
import { NOSES } from '../../assets/avatarParts/noseData';

import { mbtiTypes } from '../../data/mbtiData';

const FRIENDS_STORAGE_KEY = 'friends_list';

export default function MbtiTypeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const type = Array.isArray(params.type) ? params.type[0] : params.type;

  const mbti = mbtiTypes.find(m => m.type === type);
  const btnColor = mbti?.backgroundColor || '#4682B4';

  const [friends, setFriends] = useState([]);
  const [avatars, setAvatars] = useState({}); // { [friendId]: avatarObj }

  useEffect(() => {
    const loadFriends = async () => {
      try {
        const json = await AsyncStorage.getItem(FRIENDS_STORAGE_KEY);
        const allFriends = json ? JSON.parse(json) : [];
        const filtered = allFriends.filter(f => f.mbti === type);
        setFriends(filtered);
      } catch (e) {
        console.warn('Błąd ładowania znajomych:', e);
      }
    };
    if (type) loadFriends();
  }, [type]);

  useEffect(() => {
    const loadAvatars = async () => {
      const newAvatars = {};
      for (const friend of friends) {
        try {
          const json = await AsyncStorage.getItem(`@friend_avatar_${friend.id}`);
          if (json) {
            newAvatars[friend.id] = JSON.parse(json);
          } else {
            newAvatars[friend.id] = {
              headIndex: 0,
              selectedHairStyle: 0,
              selectedHairColor: 0,
              eyeIndex: 0,
              browIndex: 0,
              noseIndex: 0,
              mouthIndex: 0,
            };
          }
        } catch {
          newAvatars[friend.id] = {
            headIndex: 0,
            selectedHairStyle: 0,
            selectedHairColor: 0,
            eyeIndex: 0,
            browIndex: 0,
            noseIndex: 0,
            mouthIndex: 0,
          };
        }
      }
      setAvatars(newAvatars);
    };

    if (friends.length) loadAvatars();
  }, [friends]);

  // Funkcja renderująca warstwowo awatar
  const renderAvatar = (friendId) => {
    const avatar = avatars[friendId];
    if (!avatar) return null;

    return (
      <View style={styles.avatarContainer}>
        <Image source={HEADS[avatar.headIndex]} style={styles.avatarLayer} />
        <Image
          source={HAIRSTYLES[avatar.selectedHairStyle]?.colors[avatar.selectedHairColor]}
          style={styles.avatarLayer}
        />
        <Image source={EYES[avatar.eyeIndex]} style={styles.avatarLayer} />
        <Image source={BROWS[avatar.browIndex]} style={styles.avatarLayer} />
        <Image source={NOSES[avatar.noseIndex]} style={styles.avatarLayer} />
        <Image source={MOUTHS[avatar.mouthIndex]} style={styles.avatarLayer} />
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: btnColor }]}>
      {type ? (
        <>
          <Text style={styles.type}>{type}</Text>

          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {/* Opis */}
            <View style={styles.sectionBox}>
              <Text style={styles.sectionText}>{mbti?.fullDesc || 'Opis niedostępny'}</Text>
            </View>

            {/* Mocne i słabe strony */}
            <View style={styles.row}>
              <View style={styles.columnBox}>
                <Text style={styles.subTitle}>Mocne strony</Text>
                {mbti?.strengths?.map((s, i) => (
                  <Text key={i} style={styles.listItem}>• {s}</Text>
                ))}
              </View>

              <View style={styles.columnBox}>
                <Text style={styles.subTitle}>Słabe strony</Text>
                {mbti?.weaknesses?.map((w, i) => (
                  <Text key={i} style={styles.listItem}>• {w}</Text>
                ))}
              </View>
            </View>

            {/* Komunikacja */}
            <View style={styles.sectionBox}>
              <Text style={styles.subTitle}>Informacje o komunikacji</Text>
              <Text style={styles.listItem}>Rola: {mbti?.communicationRole || 'Brak danych'}</Text>
              <Text style={styles.listItem}>Styl: {mbti?.communicationStyle || 'Brak danych'}</Text>
              <Text style={styles.listItem}>Grupa: {mbti?.communicationGroup || 'Brak danych'}</Text>
            </View>

            {/* Znajomi z tym typem MBTI */}
            <View style={styles.sectionBox}>
              <Text style={styles.subTitle}>Znajomi z tym typem</Text>
              {friends.length === 0 ? (
                <Text style={styles.listItem}>Brak znajomych z tym typem MBTI.</Text>
              ) : (
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
                  {friends.map(friend => (
                    <TouchableOpacity
                      key={friend.id}
                      style={styles.friendCard}
                      onPress={() => router.push(`/friends/${friend.id}`)}
                    >
                      {/* Tu zamiast avatarUri wywołaj renderAvatar */}
                      {renderAvatar(friend.id)}
                      <Text style={styles.friendName} numberOfLines={1}>
                        {friend.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}
            </View>
          </ScrollView>
        </>
      ) : (
        <Text style={styles.text}>Nie wybrano typu MBTI.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  type: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  sectionBox: {
    backgroundColor: '#ffffffcc',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#B36B00',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  sectionText: {
    fontSize: 18,
    color: '#000',
    lineHeight: 24,
    
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#000',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 20,
  },
  columnBox: {
    flex: 1,
    backgroundColor: '#ffffffcc',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#B36B00',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  listItem: {
    fontSize: 16,
    color: '#000',
    marginBottom: 4,
  },
  text: {
    fontSize: 16,
    color: '#000',
    marginTop: 20,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#999',
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },

  // Nowe style dla znajomych
  friendCard: {
    width: 80,
    marginRight: 12,
    alignItems: 'center',
  },
  friendAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#ccc',
  },
  friendName: {
    marginTop: 6,
    fontSize: 14,
    color: '#000',
    maxWidth: 80,
    textAlign: 'center',
  },

  avatarContainer: {
    width: 64,
    height: 64,
    position: 'relative',
  },
  avatarLayer: {
    position: 'absolute',
    width: 64,
    height: 64,
  },
});
