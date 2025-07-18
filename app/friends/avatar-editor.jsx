import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
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

export default function AvatarEditor({ friendId, initialAvatar = null, onAvatarChange }) {
  const STORAGE_KEY = `friend_avatar_${friendId}`;

  const [headIndex, setHeadIndex] = useState(initialAvatar?.headIndex ?? 0);
  const [hairIndex, setHairIndex] = useState(initialAvatar?.hairIndex ?? 0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAvatar = async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (json) {
          const data = JSON.parse(json);
          setHeadIndex(data.headIndex ?? 0);
          setHairIndex(data.hairIndex ?? 0);
          if (onAvatarChange) onAvatarChange(data);
        } else if (initialAvatar) {
          setHeadIndex(initialAvatar.headIndex);
          setHairIndex(initialAvatar.hairIndex);
        }
      } catch (e) {
        Alert.alert('Błąd ładowania awatara');
      } finally {
        setLoading(false);
      }
    };
    loadAvatar();
  }, [STORAGE_KEY]);

  const saveAvatar = async () => {
    try {
      const data = { headIndex, hairIndex };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      if (onAvatarChange) onAvatarChange(data);
      Alert.alert('Awatar zapisany');
    } catch (e) {
      Alert.alert('Błąd zapisu awatara');
    }
  };

  if (loading) return <Text style={{ padding: 20 }}>Ładowanie awatara...</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Edytor awatara (128x128)</Text>

      <View style={styles.avatarPreview}>
        <Image source={HEADS[headIndex]} style={styles.layer} />
        <Image source={HAIRS[hairIndex]} style={styles.layer} />
      </View>

      <Text style={styles.label}>Kształt głowy:</Text>
      <View style={styles.optionsRow}>
        {HEADS.map((img, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => setHeadIndex(i)}
            style={[styles.optionButton, headIndex === i && styles.selectedOption]}
          >
            <Image source={img} style={styles.optionImage} />
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Włosy:</Text>
      <View style={styles.optionsRow}>
        {HAIRS.map((img, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => setHairIndex(i)}
            style={[styles.optionButton, hairIndex === i && styles.selectedOption]}
          >
            <Image source={img} style={styles.optionImage} />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={saveAvatar}>
        <Text style={styles.saveButtonText}>Zapisz awatar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20 },
  avatarPreview: {
    width: 128,
    height: 128,
    marginBottom: 20,
    position: 'relative',
  },
  layer: {
    position: 'absolute',
    width: 128,
    height: 128,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  optionsRow: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    marginRight: 10,
    padding: 3,
  },
  selectedOption: {
    borderColor: '#4682B4',
    backgroundColor: '#d0e4ff',
  },
  optionImage: {
    width: 50,
    height: 50,
  },
  saveButton: {
    marginTop: 30,
    backgroundColor: '#4682B4',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
