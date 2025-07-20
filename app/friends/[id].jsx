import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { cognitiveFunctions } from '../../data/functionsData';
import { mbtiTypes } from '../../data/mbtiData';

const STORAGE_FRIENDS_KEY = 'friends_list';
const screenWidth = Dimensions.get('window').width;


import { BROWS } from '../../assets/avatarParts/browsData';
import { EYES } from '../../assets/avatarParts/eyesData';
import { HAIRSTYLES } from '../../assets/avatarParts/hairData';
import { HEADS } from '../../assets/avatarParts/headData';
import { MOUTHS } from '../../assets/avatarParts/mouthData';
import { NOSES } from '../../assets/avatarParts/noseData';

export default function FriendProfile() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const friendId = params.id;

  const defaultAvatar = {
    headIndex: 0,
    selectedHairStyle: 0,
    selectedHairColor: 0,
    eyeIndex: 0,
    browIndex: 0,
    noseIndex: 0,
    mouthIndex: 0,
  };

  const [friend, setFriend] = useState(null);
  const [avatars, setAvatars] = useState(defaultAvatar);
  const [notes, setNotes] = useState('');
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(true);
  const [editingType, setEditingType] = useState(false);

  // Nowy stan do śledzenia aktywnej karty
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const friendsJson = await AsyncStorage.getItem(STORAGE_FRIENDS_KEY);
        const friends = friendsJson ? JSON.parse(friendsJson) : [];
        const f = friends.find((fr) => fr.id === friendId);
        if (!f) {
          Alert.alert('Nie znaleziono znajomego');
          router.back();
          return;
        }
        setFriend(f);

        const avatarJson = await AsyncStorage.getItem(`@friend_avatar_${friendId}`);
        if (avatarJson) {
          const parsed = JSON.parse(avatarJson);
          setAvatars({
            headIndex: parsed.headIndex ?? 0,
            selectedHairStyle: parsed.selectedHairStyle ?? 0,
            selectedHairColor: parsed.selectedHairColor ?? 0,
            eyeIndex: parsed.eyeIndex ?? 0,
            browIndex: parsed.browIndex ?? 0,
            noseIndex: parsed.noseIndex ?? 0,
            mouthIndex: parsed.mouthIndex ?? 0,
          });
        } else {
          setAvatars(defaultAvatar);
        }

        const notesJson = await AsyncStorage.getItem(`friend_notes_${friendId}`);
        if (notesJson) setNotes(notesJson);

        const pointsJson = await AsyncStorage.getItem(`friend_points_${friendId}`);
        if (pointsJson) setPoints(parseInt(pointsJson, 10));
      } catch (e) {
        Alert.alert('Błąd ładowania danych');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [friendId]);

  const saveNotes = async () => {
    try {
      await AsyncStorage.setItem(`friend_notes_${friendId}`, notes);
      Alert.alert('Notatki zapisane');
    } catch {
      Alert.alert('Błąd zapisu notatek');
    }
  };

  const saveType = async (newType) => {
    try {
      const friendsJson = await AsyncStorage.getItem(STORAGE_FRIENDS_KEY);
      const friends = friendsJson ? JSON.parse(friendsJson) : [];
      const idx = friends.findIndex(f => f.id === friendId);
      if (idx !== -1) {
        friends[idx].mbti = newType;
        await AsyncStorage.setItem(STORAGE_FRIENDS_KEY, JSON.stringify(friends));
        setFriend({ ...friend, mbti: newType });
        setEditingType(false);
        Alert.alert('Typ MBTI zapisany');
      }
    } catch (e) {
      Alert.alert('Błąd zapisu typu MBTI');
    }
  };

  // Handler onScroll do aktualizacji activeIndex
  const onScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / screenWidth);
    if (newIndex !== activeIndex) setActiveIndex(newIndex);
  };

  if (loading) return <Text style={{ padding: 20 }}>Ładowanie profilu...</Text>;

  const mbti = mbtiTypes.find(m => m.type === friend.mbti);

  const renderBar = (leftLabel, rightLabel, value, baseColor = '#4a90e2') => {
    const percentage = Math.round(value * 100);
    const fillColor = darkenColor(baseColor, 0.3);

    return (
      <View style={{ marginVertical: 5 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
          <Text style={styles.listItem}>{leftLabel}</Text>
          <Text style={styles.listItem}>{rightLabel}</Text>
        </View>
        <View style={styles.barBackground}>
          <View style={[styles.barFill, { width: `${percentage}%`, backgroundColor: fillColor }]} />
        </View>
      </View>
    );
  };

  // Dodaj funkcję darkenColor przed komponentem
  function darkenColor(hexColor, amount = 0.3) {
    // hexColor w formacie '#rrggbb'
    let color = hexColor.replace('#', '');
    if (color.length === 3) {
      // zamień 'abc' na 'aabbcc'
      color = color.split('').map(c => c + c).join('');
    }
    const num = parseInt(color, 16);

    let r = (num >> 16) & 0xFF;
    let g = (num >> 8) & 0xFF;
    let b = num & 0xFF;

    // Przyciemnij każdy kanał RGB
    r = Math.floor(r * (1 - amount));
    g = Math.floor(g * (1 - amount));
    b = Math.floor(b * (1 - amount));

    // Składamy kolor z powrotem
    const newColor = '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
    return newColor;
  }

  const saveButtonColor = mbti?.backgroundColor
    ? darkenColor(mbti.backgroundColor, 0.3)
    : '#3568b4'; // albo inny ciemniejszy kolor fallback

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: mbti?.backgroundColor || '#fff' }]}>
      <View style={styles.nameRow}>
        <Text style={styles.title}>{friend.name}</Text>
        <TouchableOpacity onPress={async () => {
          const newGender = friend.gender === 'Kobieta' ? 'Mężczyzna' : 'Kobieta';
          try {
            const friendsJson = await AsyncStorage.getItem(STORAGE_FRIENDS_KEY);
            const friends = friendsJson ? JSON.parse(friendsJson) : [];
            const idx = friends.findIndex(f => f.id === friendId);
            if (idx !== -1) {
              friends[idx].gender = newGender;
              await AsyncStorage.setItem(STORAGE_FRIENDS_KEY, JSON.stringify(friends));
              setFriend({ ...friend, gender: newGender });
            }
          } catch {
            Alert.alert('Błąd zapisu płci');
          }
        }}>
          <Text style={[
            styles.genderSymbol,
            { color: friend.gender === 'Kobieta' ? '#e91e63' : '#2196f3' },
          ]}>
            {friend.gender === 'Kobieta' ? '♀' : '♂'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Edycja typu MBTI */}
      <View style={{ marginBottom: 20, alignItems: 'center' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Typ MBTI:</Text>

        {!editingType ? (
          <TouchableOpacity onPress={() => setEditingType(true)} style={styles.mbtiDisplay}>
            <Text style={styles.mbtiText}>{friend.mbti}</Text>
          </TouchableOpacity>
        ) : (
          <ScrollView style={styles.mbtiList} nestedScrollEnabled>
            {mbtiTypes.map((t) => (
              <TouchableOpacity
                key={t.type}
                onPress={() => saveType(t.type)}
                style={styles.mbtiOption}
              >
                <Text style={{ fontSize: 16 }}>{t.type} — {t.shortDesc}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              onPress={() => setEditingType(false)}
              style={[styles.mbtiOption, { backgroundColor: '#ddd', marginTop: 10 }]}
            >
              <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Anuluj</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </View>

      {/* Awatar w okrągłym obramowaniu */}
      <TouchableOpacity
        style={styles.avatarPreview}
        onPress={() => router.push(`/friends/${friendId}/edit-avatar`)}
        activeOpacity={0.8}
      >
        <Image source={HEADS[avatars.headIndex]} style={styles.layer} />
        <Image source={HAIRSTYLES[avatars.selectedHairStyle]?.colors[avatars.selectedHairColor]} style={styles.layer} />
        <Image source={EYES[avatars.eyeIndex]} style={styles.layer} />
        <Image source={BROWS[avatars.browIndex]} style={styles.layer} />
        <Image source={NOSES[avatars.noseIndex]} style={styles.layer} />
        <Image source={MOUTHS[avatars.mouthIndex]} style={styles.layer} />
      </TouchableOpacity>

      <View style={{ marginTop: 20, width: '100%' }}>
        <Text style={styles.label}>Notatki:</Text>
        <TextInput
          style={styles.textArea}
          multiline
          value={notes}
          onChangeText={setNotes}
          placeholder="Dodaj swoje notatki..."
        />
        <TouchableOpacity
          style={[styles.saveButton, { backgroundColor: saveButtonColor }]}
          onPress={saveNotes}
        >
          <Text style={styles.saveButtonText}>Zapisz notatki</Text>
        </TouchableOpacity>
      </View>

      {mbti && (
        <>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            style={styles.cardContainer}
            contentContainerStyle={{ alignItems: 'center', paddingHorizontal: 10 }}
            onScroll={onScroll}
            scrollEventThrottle={16}
            ref={scrollRef}
          >
            {/* Mocne i słabe strony */}
            <View style={[styles.card, styles.centerContent]}>
              <Text style={[styles.label, styles.centerText]}>Mocne strony</Text>
              {mbti.strengths.map((s, i) => (
                <Text key={i} style={[styles.listItem, styles.centerText]}>• {s}</Text>
              ))}

              <Text style={[styles.label, styles.centerText, { marginTop: 15 }]}>Słabe strony</Text>
              {mbti.weaknesses.map((w, i) => (
                <Text key={i} style={[styles.listItem, styles.centerText]}>• {w}</Text>
              ))}
            </View>

            {/* Komunikacja */}
            <View style={[styles.card, styles.centerContent]}>
              <Text style={[styles.label, styles.centerText]}>💬 Komunikacja</Text>
              <Text style={[styles.listItem, styles.centerText]}>Rola: {mbti.communicationRole || 'Brak danych'}</Text>
              <Text style={[styles.listItem, styles.centerText]}>Styl: {mbti.communicationStyle || 'Brak danych'}</Text>
              <Text style={[styles.listItem, styles.centerText]}>Grupa: {mbti.communicationGroup || 'Brak danych'}</Text>
            </View>

            {/* Statystyki */}
            <View style={styles.card}>
              <Text style={styles.label}>📊 Statystyki MBTI</Text>
              {renderBar('Introversion', 'Extraversion', mbti.stats?.ie ?? 0.7, mbti.backgroundColor || '#4a90e2')}
              {renderBar('Intuition', 'Sensing', mbti.stats?.ns ?? 0.6, mbti.backgroundColor || '#4a90e2')}
              {renderBar('Thinking', 'Feeling', mbti.stats?.tf ?? 0.5, mbti.backgroundColor || '#4a90e2')}
              {renderBar('Judging', 'Perceiving', mbti.stats?.jp ?? 0.8, mbti.backgroundColor || '#4a90e2')}
            </View>


            {/* Funkcje poznawcze */}
            <View style={[styles.card, styles.centerContent]}>
              <Text style={[styles.label, styles.centerText]}>🧠 Funkcje poznawcze</Text>
              {mbti.functions?.map((fnId, i) => {
                const fn = cognitiveFunctions.find(f => f.id === fnId);
                if (!fn) return null;

                return (
                  <Link key={fnId} href={`/cognitivefunctions/${fn.id}`} asChild>
                    <TouchableOpacity style={{ marginTop: i > 0 ? 16 : 10 }}>
                      <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#5D4037', textAlign: 'center' }}>
                        {fn.name}
                      </Text>
                      <Text style={{ fontSize: 14, color: '#555', textAlign: 'center', marginTop: 4 }}>
                        {fn.description.slice(0, 100)}...
                      </Text>
                    </TouchableOpacity>
                  </Link>
                );
              })}
            </View>
          </ScrollView>

          {/* Pasek kropek pod kartami */}
          <View style={styles.pagination}>
            {[...Array(4)].map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  i === activeIndex
                    ? { backgroundColor: darkenColor(mbti?.backgroundColor || '#4a90e2', 0.3) }
                    : styles.dotInactive,
                ]}
              />
            ))}
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingVertical: 42, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
  avatarPreview: {
    width: 128,
    height: 128,
    position: 'relative',
    alignSelf: 'center',
    marginBottom: 10,
    borderRadius: 64,
    overflow: 'hidden',
  },
  layer: {
    position: 'absolute',
    width: 128,
    height: 128,
    resizeMode: 'contain',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 6,
    color: '#222',
  },
  listItem: {
    fontSize: 14,
    color: '#444',
  },
  textArea: {
    marginTop: -30,
    borderWidth: 1,
    borderColor: '#ccc',
    height: 75,
    borderRadius: 6,
    padding: 10,
    textAlignVertical: 'top',
    backgroundColor: '#f9f9f9',
  },
  saveButton: {
    marginTop: 10,
    backgroundColor: '#4682B4',
    paddingVertical: 12,
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  mbtiDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mbtiText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 8,
    color: '#000',
  },
  mbtiList: {
    maxHeight: 250,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
  },
  mbtiOption: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  cardContainer: {
    height: 280,
    marginTop: -20,
  },
  card: {
    alignSelf: 'center',
    width: screenWidth-60, // np. 20px padding z każdej strony
    marginRight: 20,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    minHeight: 240,
  },
  barBackground: {
    width: '100%',
    height: 12,
    backgroundColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 10,
  },
  barFill: {
    height: '100%',
    backgroundColor: '#4a90e2',
  },
  centerContent: {
    alignItems: 'center',
  },
  centerText: {
    textAlign: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  genderSymbol: {
    fontSize: 40,
    marginLeft: 8,
    marginTop: -24,
  },

  // Nowe style dla kropek paginacji
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: -16,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 6,
  },
  dotActive: {
    backgroundColor: '#4a90e2',
  },
  dotInactive: {
    backgroundColor: '#bbb',
  },
});
