import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { BROWS } from '../../assets/avatarParts/browsData';
import { EYES } from '../../assets/avatarParts/eyesData';
import { HAIRSTYLES } from '../../assets/avatarParts/hairData';
import { HEADS } from '../../assets/avatarParts/headData';
import { MOUTHS } from '../../assets/avatarParts/mouthData';
import { NOSES } from '../../assets/avatarParts/noseData';

const STORAGE_FRIENDS_KEY = 'friends_list';

export default function FriendsList() {
  const router = useRouter();

  const [showAddPanel, setShowAddPanel] = useState(false);

  // Znajomi
  const [friends, setFriends] = useState([
    { id: '1', name: 'Paweł', mbti: 'INFP' },
    { id: '2', name: 'Anna', mbti: 'ENTJ' },
  ]);

  const [avatars, setAvatars] = useState({}); // { [id]: {headIndex, selectedHairStyle, selectedHairColor, eyeIndex, browIndex, noseIndex, mouthIndex} }

  const [name, setName] = useState('');
  const [mbti, setMbti] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Ładowanie znajomych z AsyncStorage na start
  useEffect(() => {
    const loadFriends = async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_FRIENDS_KEY);
        if (json !== null) {
          setFriends(JSON.parse(json));
        }
      } catch (e) {
        Alert.alert('Błąd ładowania listy znajomych');
      }
    };
    loadFriends();
  }, []);

  // Zapis znajomych do AsyncStorage za każdym razem gdy się zmieniają
  useEffect(() => {
    const saveFriends = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_FRIENDS_KEY, JSON.stringify(friends));
      } catch (e) {
        Alert.alert('Błąd zapisu listy znajomych');
      }
    };
    saveFriends();
  }, [friends]);

  // Ładowanie awatarów dla znajomych zgodnie z AvatarEditor
  useEffect(() => {
    const loadAvatars = async () => {
      const newAvatars = {};
      for (const friend of friends) {
        try {
          const json = await AsyncStorage.getItem(`@friend_avatar_${friend.id}`);
          if (json) {
            newAvatars[friend.id] = JSON.parse(json);
          } else {
            // Domyślne wartości pasujące do AvatarEditor
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
    loadAvatars();
  }, [friends]);

  const addFriend = () => {
    if (!name.trim() || !mbti.trim()) {
      Alert.alert('Uzupełnij oba pola');
      return;
    }
    const newFriend = {
      id: Date.now().toString(),
      name: name.trim(),
      mbti: mbti.trim().toUpperCase(),
    };
    setFriends((prev) => [...prev, newFriend]);
    setName('');
    setMbti('');
    setShowAddPanel(false);
  };

  const deleteFriend = (id) => {
    Alert.alert(
      'Usuń znajomego',
      'Na pewno chcesz usunąć tego znajomego?',
      [
        { text: 'Anuluj', style: 'cancel' },
        {
          text: 'Usuń',
          style: 'destructive',
          onPress: () => setFriends((prev) => prev.filter((f) => f.id !== id)),
        },
      ]
    );
  };

  const filteredFriends = friends.filter((f) =>
    f.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderAvatar = (id) => {
    const avatar = avatars[id];
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

  const renderFriend = ({ item }) => (
    <TouchableOpacity
      style={styles.friendItem}
      onPress={() => router.push(`/friends/${item.id}`)}
    >
      {renderAvatar(item.id)}
      <Text style={styles.friendText}>
        {`${item?.name || 'Nieznany'} - ${item?.mbti || 'Brak typu'}`}
      </Text>

      <TouchableOpacity onPress={() => deleteFriend(item.id)} style={styles.deleteBtn}>
        <Text style={{ color: 'white' }}>Usuń</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Lista znajomych</Text>

        <TextInput
          style={styles.input}
          placeholder="Szukaj znajomego po imieniu..."
          value={searchTerm}
          onChangeText={setSearchTerm}
        />

        <FlatList
          data={filteredFriends}
          keyExtractor={(item) => item.id}
          renderItem={renderFriend}
          style={{ marginTop: 10 }}
          ListEmptyComponent={<Text>Brak znajomych do wyświetlenia.</Text>}
          contentContainerStyle={{ flexGrow: 1 }}
        />

        {!showAddPanel && (
          <View style={styles.addButtonWrapper}>
            <TouchableOpacity
              style={styles.addFriendButton}
              onPress={() => setShowAddPanel(true)}
            >
              <Text style={styles.addFriendButtonText}>Dodaj nowego znajomego</Text>
            </TouchableOpacity>
          </View>
        )}

        {showAddPanel && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Imię"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Typ MBTI"
              value={mbti}
              onChangeText={setMbti}
              autoCapitalize="characters"
            />
            <TouchableOpacity style={styles.addFriendButton} onPress={addFriend}>
              <Text style={styles.addFriendButtonText}>Dodaj znajomego</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.addFriendButton, { backgroundColor: '#888', marginBottom: 0 }]}
              onPress={() => {
                setShowAddPanel(false);
                setName('');
                setMbti('');
              }}
            >
              <Text style={[styles.addFriendButtonText, { color: '#eee' }]}>Anuluj</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F5E1C9' }, // ciepły beż
  container: {
    flex: 1,
    paddingVertical: 32,
    paddingHorizontal: 20,
    backgroundColor: '#F5E1C9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#C1440E', // ceglasty tytuł
  },
  input: {
    borderWidth: 1,
    borderColor: '#D9A441', // musztardowy obramowanie
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
    backgroundColor: '#fff9e6', // bardzo jasny musztardowy jako tło inputa
    color: '#444',
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#D9A441',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    marginRight: 12,
    position: 'relative',
  },
  avatarLayer: {
    position: 'absolute',
    width: 40,
    height: 40,
  },
  friendText: {
    fontSize: 18,
    flex: 1,
    color: '#4B2E05', // ciemny brąz tekstu
  },
  deleteBtn: {
    backgroundColor: '#C1440E', // ceglasty przycisk usuń
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    marginLeft: 10,
  },
  addButtonWrapper: {
    marginBottom: 20,
  },
  addFriendButton: {
    backgroundColor: '#C1440E', // ceglasty kolor
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  addFriendButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
