import { useState } from 'react';
import { Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Tylko po 2 nakładki na głowę i włosy
const HEADS = [
  require('../assets/avatarParts/head1.png'),
  require('../assets/avatarParts/head2.png'),
];

const HAIRS = [
  require('../assets/avatarParts/hair1.png'),
  require('../assets/avatarParts/hair2.png'),
];

export default function AvatarEditor() {
  const [selectedHead, setSelectedHead] = useState(0);
  const [selectedHair, setSelectedHair] = useState(0);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Edytor Awatara (128x128 px)</Text>

      <View style={styles.avatarPreview}>
        <Image source={HEADS[selectedHead]} style={styles.layer} />
        <Image source={HAIRS[selectedHair]} style={styles.layer} />
      </View>

      <Text style={styles.label}>Kształt głowy</Text>
      <View style={styles.optionsRow}>
        {HEADS.map((img, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => setSelectedHead(i)}
            style={[styles.optionButton, selectedHead === i && styles.selectedOption]}
          >
            <Image source={img} style={styles.optionImage} />
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Włosy</Text>
      <View style={styles.optionsRow}>
        {HAIRS.map((img, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => setSelectedHair(i)}
            style={[styles.optionButton, selectedHair === i && styles.selectedOption]}
          >
            <Image source={img} style={styles.optionImage} />
          </TouchableOpacity>
        ))}
      </View>

      <Button title="Zapisz awatar (TODO)" onPress={() => alert('Tutaj dodaj zapis awatara')} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
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
  label: { fontWeight: 'bold', fontSize: 18, marginVertical: 10, alignSelf: 'flex-start' },
  optionsRow: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    marginRight: 10,
    padding: 4,
  },
  selectedOption: {
    borderColor: '#4682B4',
    backgroundColor: '#d0e4ff',
  },
  optionImage: {
    width: 50,
    height: 50,
  },
});
