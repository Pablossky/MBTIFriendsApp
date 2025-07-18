import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const HEADS = [
  require('../../assets/avatarParts/head1.png'),
  require('../../assets/avatarParts/head2.png'),
];

const HAIRS = [
  require('../../assets/avatarParts/hair1.png'),
  require('../../assets/avatarParts/hair2.png'),
];

export default function FriendsList() {
  const router = useRouter();

  const [showAddPanel, setShowAddPanel] = useState(false);

  // Znajomi
  const [friends, setFriends] = useState([
    { id: '1', name: 'Paweł', mbti: 'INFP' },
    { id: '2', name: 'Anna', mbti: 'ENTJ' },
  ]);

  const [avatars, setAvatars] = useState({}); // { [id]: {headIndex, hairIndex} }

  const [name, setName] = useState('');
  const [mbti, setMbti] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadAvatars = async () => {
      const newAvatars = {};
      for (const friend of friends) {
        try {
          const json = await AsyncStorage.getItem(`friend_avatar_${friend.id}`);
          if (json) {
            newAvatars[friend.id] = JSON.parse(json);
          } else {
            newAvatars[friend.id] = { headIndex: 0, hairIndex: 0 };
          }
        } catch {
          newAvatars[friend.id] = { headIndex: 0, hairIndex: 0 };
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
        <Image source={HAIRS[avatar.hairIndex]} style={styles.avatarLayer} />
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
        {item.name} — {item.mbti}
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
            <Button title="Dodaj nowego znajomego" onPress={() => setShowAddPanel(true)} />
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
            <Button title="Dodaj znajomego" onPress={addFriend} />
            <Button
              title="Anuluj"
              onPress={() => {
                setShowAddPanel(false);
                setName('');
                setMbti('');
              }}
              color="#888"
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
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
  friendText: { fontSize: 18, flex: 1 },
  deleteBtn: {
    backgroundColor: '#ff5555',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    marginLeft: 10,
  },
  addButtonWrapper: {
    marginBottom: 20,  // podnosi trochę przycisk do góry
  },
});
