import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { mbtiTypes } from '../../data/mbtiData';

export default function MbtiListScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {mbtiTypes.map(({ type, shortDesc }) => (
        <Link key={type} href={`/mbti/${type}`} asChild>
          <TouchableOpacity style={styles.card}>
            <Text style={styles.type}>{type}</Text>
            <Text style={styles.desc}>{shortDesc}</Text>
          </TouchableOpacity>
        </Link>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  card: {
    backgroundColor: '#222',
    padding: 20,
    marginBottom: 16,
    borderRadius: 10,
  },
  type: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  desc: {
    fontSize: 16,
    color: '#ccc',
    marginTop: 4,
  },
});
