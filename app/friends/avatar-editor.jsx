import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Alert, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { BROWS } from '../../assets/avatarParts/browsData';
import { EYES } from '../../assets/avatarParts/eyesData';
import { HAIRSTYLES } from '../../assets/avatarParts/hairData';
import { HEADS } from '../../assets/avatarParts/headData';
import { MOUTHS } from '../../assets/avatarParts/mouthData';
import { NOSES } from '../../assets/avatarParts/noseData';

const screenWidth = Dimensions.get('window').width;
const STORAGE_KEY_PREFIX = '@friend_avatar_';

export default function AvatarEditor({ friendId, onAvatarChange }) {
  const [headIndex, setHeadIndex] = useState(0);
  const [selectedHairStyle, setSelectedHairStyle] = useState(0);
  const [selectedHairColor, setSelectedHairColor] = useState(0);
  const [eyeIndex, setEyeIndex] = useState(0);
  const [browIndex, setBrowIndex] = useState(0);
  const [noseIndex, setNoseIndex] = useState(0);
  const [mouthIndex, setMouthIndex] = useState(0);

  useEffect(() => {
    if (!friendId) return;
    console.log('Ładuję awatar dla friendId:', friendId);
    loadAvatar();
  }, [friendId]);

  const saveAvatar = async () => {
    try {
      const data = {
        headIndex,
        selectedHairStyle,
        selectedHairColor,
        eyeIndex,
        browIndex,
        noseIndex,
        mouthIndex,
      };
      const key = `${STORAGE_KEY_PREFIX}${friendId}`;
      await AsyncStorage.setItem(key, JSON.stringify(data));
      onAvatarChange?.(data);
      Alert.alert('Awatar zapisany!');
    } catch (e) {
      Alert.alert('Błąd zapisu awatara');
      console.error(e);
    }
  };

  const loadAvatar = async () => {
    try {
      const key = `${STORAGE_KEY_PREFIX}${friendId}`;
      const data = await AsyncStorage.getItem(key);
      if (data) {
        const parsed = JSON.parse(data);
        setHeadIndex(parsed.headIndex ?? 0);
        setSelectedHairStyle(parsed.selectedHairStyle ?? 0);
        setSelectedHairColor(parsed.selectedHairColor ?? 0);
        setEyeIndex(parsed.eyeIndex ?? 0);
        setBrowIndex(parsed.browIndex ?? 0);
        setNoseIndex(parsed.noseIndex ?? 0);
        setMouthIndex(parsed.mouthIndex ?? 0);
      }
    } catch (e) {
      Alert.alert('Błąd ładowania awatara');
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarPreview}>
        <Image source={HEADS[headIndex]} style={styles.layer} />
        <Image source={HAIRSTYLES[selectedHairStyle]?.colors[selectedHairColor]} style={styles.layer} />
        <Image source={EYES[eyeIndex]} style={styles.layer} />
        <Image source={BROWS[browIndex]} style={styles.layer} />
        <Image source={NOSES[noseIndex]} style={styles.layer} />
        <Image source={MOUTHS[mouthIndex]} style={styles.layer} />
      </View>

      <View style={styles.cardBackground}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        >
          {/* GŁOWA */}
          <View style={styles.page}>
            <Text style={styles.label}>Głowa</Text>
            <View style={styles.optionsRow}>
              {HEADS.map((h, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => setHeadIndex(i)}
                  style={[styles.optionButton, headIndex === i && styles.selected]}
                >
                  <Image source={h} style={styles.optionImage} />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* FRYZURA */}
          <View style={styles.page}>
            <Text style={styles.label}>Fryzura</Text>
            <View style={styles.optionsRow}>
              {HAIRSTYLES.map((h, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => {
                    setSelectedHairStyle(i);
                    setSelectedHairColor(0);
                  }}
                  style={[styles.optionButton, selectedHairStyle === i && styles.selected]}
                >
                  <Image source={h.preview} style={styles.optionImage} />
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Kolor włosów</Text>
            <View style={styles.optionsRow}>
              {HAIRSTYLES[selectedHairStyle]?.colors.map((c, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => setSelectedHairColor(i)}
                  style={[styles.optionButton, selectedHairColor === i && styles.selected]}
                >
                  <Image source={c} style={styles.optionImage} />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* OCZY */}
          <View style={styles.page}>
            <Text style={styles.label}>Oczy</Text>
            <View style={styles.optionsRow}>
              {EYES.map((img, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => setEyeIndex(i)}
                  style={[styles.optionButton, eyeIndex === i && styles.selected]}
                >
                  <Image source={img} style={styles.optionImage} />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* BRWI */}
          <View style={styles.page}>
            <Text style={styles.label}>Brwi</Text>
            <View style={styles.optionsRow}>
              {BROWS.map((img, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => setBrowIndex(i)}
                  style={[styles.optionButton, browIndex === i && styles.selected]}
                >
                  <Image source={img} style={styles.optionImage} />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* NOS */}
          <View style={styles.page}>
            <Text style={styles.label}>Nos</Text>
            <View style={styles.optionsRow}>
              {NOSES.map((img, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => setNoseIndex(i)}
                  style={[styles.optionButton, noseIndex === i && styles.selected]}
                >
                  <Image source={img} style={styles.optionImage} />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* USTA */}
          <View style={styles.page}>
            <Text style={styles.label}>Usta</Text>
            <View style={styles.optionsRow}>
              {MOUTHS.map((img, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => setMouthIndex(i)}
                  style={[styles.optionButton, mouthIndex === i && styles.selected]}
                >
                  <Image source={img} style={styles.optionImage} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>

      <TouchableOpacity onPress={saveAvatar} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Zapisz Awatar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 60,
    paddingVertical: 60,
    backgroundColor: '#F5E1C9', // ciepły beż tła
    flex: 1,
  },
  avatarPreview: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 20,
  },
  layer: {
    position: 'absolute',
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  label: {
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 10,
    fontSize: 16,
    color: '#8B4513', // rdzawy brąz - spójny z buttonami
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 0,    // Usuń margin, albo zredukuj do 0 lub bardzo małego
    paddingHorizontal: 10,  // Jeśli chcesz odstęp, daj padding do środka
  },
  optionButton: {
    margin: 4,
    padding: 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: '#D9A441', // musztardowy, jasne tło dla opcji
  },
  selected: {
    borderColor: '#C1440E', // ceglany akcent na obramowaniu
    backgroundColor: '#8B4513', // rdzawy brąz na zaznaczone
  },
  optionImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  saveButton: {
    backgroundColor: '#8B4513', // rdzawy brąz zgodny z buttonem z drugiego stylu
    padding: 12,
    marginTop: 20,
    borderRadius: 12,
    alignSelf: 'center',
    shadowColor: '#6B3E07', // cień ciepły
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 7,
  },
  saveButtonText: {
    color: '#F5E1C9', // jasny tekst na ciemnym tle
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 18,
  },
  page: {
    width: screenWidth,
    paddingVertical: 10,
  },

  cardBackground: {
    backgroundColor: '#F5E1C9', // ciepłe tło karty
    borderRadius: 16,
    paddingVertical: 10,
    // iOS shadow
    shadowColor: '#6B3E07',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    // Android shadow
    elevation: 7,
  },
});
