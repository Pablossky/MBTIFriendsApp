import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Modal,
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

  const [friends, setFriends] = useState([]);
  const [avatars, setAvatars] = useState({});

  const [gender, setGender] = useState('other');
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [mbti, setMbti] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Ładowanie znajomych
  useEffect(() => {
    const loadFriends = async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_FRIENDS_KEY);
        if (json !== null) {
          setFriends(JSON.parse(json));
        }
      } catch {
        Alert.alert('Błąd ładowania listy znajomych');
      }
    };
    loadFriends();
  }, []);

  // Zapisywanie znajomych
  useEffect(() => {
    const saveFriends = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_FRIENDS_KEY, JSON.stringify(friends));
      } catch {
        Alert.alert('Błąd zapisu listy znajomych');
      }
    };
    saveFriends();
  }, [friends]);

  // Ładowanie awatarów
  useEffect(() => {
    const loadAvatars = async () => {
      const newAvatars = {};
      for (const friend of friends) {
        try {
          const json = await AsyncStorage.getItem(`@friend_avatar_${friend.id}`);
          newAvatars[friend.id] = json
            ? JSON.parse(json)
            : {
              selectedHeadType: 0,
              selectedHeadColor: 0,
              selectedHairStyle: 0,
              selectedHairColor: 0,
              eyeIndex: 0,
              browIndex: 0,
              noseIndex: 0,
              mouthIndex: 0,
            };
        } catch {
          newAvatars[friend.id] = {
            selectedHeadType: 0,
            selectedHeadColor: 0,
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
      gender,
    };

    setFriends((prev) => [...prev, newFriend]);
    setName('');
    setMbti('');
    setGender('Mężczyzna');
    setModalVisible(false);
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
        <Image 
          source={HEADS[avatar.selectedHeadType]?.colors?.[avatar.selectedHeadColor]}
          style={styles.avatarLayer}
        />
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
        {`${item.name} - ${item.mbti}`}
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

        <View style={styles.addButtonWrapper}>
          <TouchableOpacity
            style={styles.addFriendButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.addFriendButtonText}>Dodaj nowego znajomego</Text>
          </TouchableOpacity>
        </View>

        {/* MODAL */}
        <Modal visible={modalVisible} animationType="slide" transparent>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.title}>Nowy znajomy</Text>

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

              <View style={styles.genderSelector}>
                {['Mężczyzna', 'Kobieta'].map((g) => (
                  <TouchableOpacity
                    key={g}
                    style={[
                      styles.genderOption,
                      gender === g && styles.genderOptionSelected,
                    ]}
                    onPress={() => setGender(g)}
                  >
                    <Text style={{ color: gender === g ? 'white' : '#4B2E05' }}>
                      {g === 'Mężczyzna' ? 'Mężczyzna' : 'Kobieta'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>


              <TouchableOpacity style={styles.addFriendButton} onPress={addFriend}>
                <Text style={styles.addFriendButtonText}>Dodaj znajomego</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.addFriendButton, { backgroundColor: '#888' }]}
                onPress={() => {
                  setModalVisible(false);
                  setName('');
                  setMbti('');
                  setGender('other');
                }}
              >
                <Text style={[styles.addFriendButtonText, { color: '#eee' }]}>Anuluj</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F5E1C9' },
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
    color: '#C1440E',
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D9A441',
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
    backgroundColor: '#C1440E',  // bardzo jasne, prawie białe tło
    color: '#4B2E05',            // ciemny, kontrastujący tekst
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
    color: '#4B2E05',
  },
  deleteBtn: {
    backgroundColor: '#C1440E',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    marginLeft: 10,
  },
  addButtonWrapper: {
    marginBottom: 20,
  },
  addFriendButton: {
    backgroundColor: '#C1440E',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#F5E1C9',
    padding: 20,
    borderRadius: 12,
    width: '100%',
  },
  genderSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  genderOption: {
    flex: 1,
    backgroundColor: '#fff9e6',
    padding: 10,
    borderRadius: 6,
    marginHorizontal: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D9A441',
  },
  genderOptionSelected: {
    backgroundColor: '#C1440E',
  },
});
