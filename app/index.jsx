import { Link } from 'expo-router';
import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" /> {/* lepszy kontrast na jasnym tle */}
      <View style={styles.container}>
        <Text style={styles.title}>Witaj w MBTI Friends!</Text>

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

          <Link href="/stats" asChild>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Statystyki</Text>
            </TouchableOpacity>
          </Link>

        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5E1C9', // ciepły beż - tło
    paddingTop: StatusBar.currentHeight || 0,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#C1440E', // ceglany
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#D9A441', // musztardowy
    marginBottom: 40,
    textAlign: 'center',
  },
  buttonsContainer: {
    marginTop: 10,
  },
  button: {
    backgroundColor: '#8B4513', // rdzawy brąz
    paddingVertical: 18,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',

    shadowColor: '#6B3E07', // cień w ciepłym odcieniu
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 7,
  },
  buttonText: {
    color: '#F5E1C9', // jasny tekst na ciemnym tle
    fontSize: 20,
    fontWeight: '600',
  },
});
