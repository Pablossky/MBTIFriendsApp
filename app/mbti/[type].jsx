import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { mbtiTypes } from '../../data/mbtiData';

export default function MbtiTypeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const type = params.type;

  const mbti = mbtiTypes.find(m => m.type === type);
  const btnColor = mbti?.backgroundColor || '#4682B4';

  return (
    <View style={styles.container}>
      {type ? (
        <>
          <Text style={styles.type}>{type}</Text>
          <Text style={styles.desc}>{mbti?.fullDesc || 'Opis niedostępny'}</Text>

          <Text style={styles.subTitle}>Mocne strony:</Text>
          {mbti?.strengths?.map((s, i) => (
            <Text key={i} style={styles.listItem}>• {s}</Text>
          ))}

          <Text style={styles.subTitle}>Słabe strony:</Text>
          {mbti?.weaknesses?.map((w, i) => (
            <Text key={i} style={styles.listItem}>• {w}</Text>
          ))}

          <Text style={styles.subTitle}>Informacje o komunikacji:</Text>
          <Text style={styles.listItem}>Rola komunikacji: {mbti?.communicationRole || 'Brak danych'}</Text>
          <Text style={styles.listItem}>Styl komunikacji: {mbti?.communicationStyle || 'Brak danych'}</Text>
          <Text style={styles.listItem}>Grupa komunikacji: {mbti?.communicationGroup || 'Brak danych'}</Text>

          <Text style={styles.text}>
            Tutaj możesz dodać więcej informacji o typie {type}, jego cechach, mocnych stronach, idealnych zawodach itd.
          </Text>
        </>
      ) : (
        <Text style={styles.text}>Nie wybrano typu MBTI.</Text>
      )}

      {/* Przyciskowy panel na dole */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: btnColor }]}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>Wróć</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: btnColor }]}
          onPress={() => alert('Więcej informacji w budowie')}
        >
          <Text style={styles.buttonText}>Więcej info</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#111', justifyContent: 'space-between' },
  type: { fontSize: 32, fontWeight: 'bold', color: '#fff', marginBottom: 10 },
  desc: { fontSize: 20, marginBottom: 20, color: '#aaa' },
  subTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 10, color: '#eee' },
  listItem: { fontSize: 16, color: '#ccc', marginLeft: 10, marginBottom: 2 },
  text: { fontSize: 16, color: '#ccc', marginTop: 20 },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
