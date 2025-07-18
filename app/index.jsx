import { Link } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Witaj w aplikacji MBTI Friends!</Text>
      <Text style={styles.subtitle}>Poznaj typy i prowadź listę znajomych</Text>

      <View style={styles.buttonsContainer}>
        <Link href="/friends" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Lista znajomych</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/mbti" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Zobacz typy MBTI</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 60, paddingHorizontal: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#666' },
  buttonsContainer: { marginTop: 40 },
  button: {
    backgroundColor: '#4682B4',
    paddingVertical: 20,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
