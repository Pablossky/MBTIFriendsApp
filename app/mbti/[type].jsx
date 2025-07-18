import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { mbtiTypes } from '../../data/mbtiData';

export default function MbtiTypeScreen() {
  const params = useLocalSearchParams();
  const type = params.type;

  const mbti = mbtiTypes.find(m => m.type === type);

  return (
    <View style={styles.container}>
      {type ? (
        <>
          <Text style={styles.type}>{type}</Text>
          <Text style={styles.desc}>{mbti?.fullDesc || 'Opis niedostępny'}</Text>
          <Text style={styles.text}>
            Tutaj możesz dodać więcej informacji o typie {type}, jego cechach, mocnych stronach, idealnych zawodach itd.
          </Text>
        </>
      ) : (
        <Text style={styles.text}>Nie wybrano typu MBTI.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#111' },
  type: { fontSize: 32, fontWeight: 'bold', color: '#fff' },
  desc: { fontSize: 20, marginBottom: 20, color: '#aaa' },
  text: { fontSize: 16, color: '#ccc' },
});
