import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { mbtiTypes } from '../../data/mbtiData';

const STORAGE_FRIENDS_KEY = 'friends_list';

const HEADS = [
  require('../../assets/avatarParts/head1.png'),
  require('../../assets/avatarParts/head2.png'),
];

const HAIRS = [
  require('../../assets/avatarParts/hair1.png'),
  require('../../assets/avatarParts/hair2.png'),
];

export default function FriendProfile() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const friendId = params.id;

  const [friend, setFriend] = useState(null);
  const [avatars, setAvatars] = useState({ headIndex: 0, hairIndex: 0 });
  const [notes, setNotes] = useState('');
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(true);
  const [editingType, setEditingType] = useState(false);  // nowy stan edycji typu

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

        const avatarJson = await AsyncStorage.getItem(`friend_avatar_${friendId}`);
        if (avatarJson) {
          setAvatars(JSON.parse(avatarJson));
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

  // Nowa funkcja do zapisu typu MBTI
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

  if (loading) return <Text style={{ padding: 20 }}>Ładowanie profilu...</Text>;

  const mbti = mbtiTypes.find(m => m.type === friend.mbti);

  const renderBar = (leftLabel, rightLabel, value) => {
    const percentage = Math.round(value * 100);
    return (
      <View style={{ marginVertical: 5 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
          <Text style={styles.listItem}>{leftLabel}</Text>
          <Text style={styles.listItem}>{rightLabel}</Text>
        </View>
        <View style={styles.barBackground}>
          <View style={[styles.barFill, { width: `${percentage}%` }]} />
        </View>
      </View>
    );
  };




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

      <TouchableOpacity
        style={styles.avatarPreview}
        onPress={() => router.push(`/friends/${friendId}/edit-avatar`)}
      >
        <Image source={HEADS[avatars.headIndex]} style={styles.layer} />
        <Image source={HAIRS[avatars.hairIndex]} style={styles.layer} />
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
        <TouchableOpacity style={styles.saveButton} onPress={saveNotes}>
          <Text style={styles.saveButtonText}>Zapisz notatki</Text>
        </TouchableOpacity>
      </View>

      {mbti && (
        <View style={{ marginTop: 30 }}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            style={styles.cardContainer}
            contentContainerStyle={{ alignItems: 'center', paddingHorizontal: 10 }}
          >
            {/* Karta 1 – Mocne i słabe strony */}
            <View style={[styles.card, styles.centerContent]}>
              <Text style={[styles.label, styles.centerText]}> Mocne strony</Text>
              {mbti.strengths.map((s, i) => (
                <Text key={i} style={[styles.listItem, styles.centerText]}>• {s}</Text>
              ))}

              <Text style={[styles.label, styles.centerText, { marginTop: 15 }]}> Słabe strony</Text>
              {mbti.weaknesses.map((w, i) => (
                <Text key={i} style={[styles.listItem, styles.centerText]}>• {w}</Text>
              ))}
            </View>

            {/* Karta 2 – Komunikacja */}
            <View style={[styles.card, styles.centerContent]}>
              <Text style={[styles.label, styles.centerText]}>💬 Komunikacja</Text>
              <Text style={[styles.listItem, styles.centerText]}>Rola: {mbti.communicationRole || 'Brak danych'}</Text>
              <Text style={[styles.listItem, styles.centerText]}>Styl: {mbti.communicationStyle || 'Brak danych'}</Text>
              <Text style={[styles.listItem, styles.centerText]}>Grupa: {mbti.communicationGroup || 'Brak danych'}</Text>
            </View>

            {/* Karta 3 – Statystyki */}
            <View style={styles.card}>
              <Text style={styles.label}>📊 Statystyki MBTI</Text>
              {renderBar('Introversion', 'Extraversion', mbti.stats?.ie ?? 0.7)}
              {renderBar('Intuition', 'Sensing', mbti.stats?.ns ?? 0.6)}
              {renderBar('Thinking', 'Feeling', mbti.stats?.tf ?? 0.5)}
              {renderBar('Judging', 'Perceiving', mbti.stats?.jp ?? 0.8)}
            </View>

          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingVertical:42, backgroundColor: '#fff' },
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
    height: 75,           // zmniejszone z 100 na 75
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
  editHint: {
    fontSize: 12,
    color: '#666',
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
  cardContainer: {        // trochę więcej odstępu od reszty
    height: 280,   
    marginTop: -20,       // podniesione z 220 na 280
  },
  card: {
    alignSelf: 'center',
    width: 300,
    marginRight: 20,
    padding: 16,          // zwiększone padding z 8
    backgroundColor: '#fff',
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    minHeight: 240,       // dodane minimum wysokości by pomieścić paski
  },
  barBackground: {
    width: '100%',
    height: 12,           // trochę wyższy pasek
    backgroundColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 10,        // większy odstęp od poprzedniego elementu
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
    marginTop: -24,  // podnosi ikonę płci nieco wyżej
  },
});
