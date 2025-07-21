import { Link } from 'expo-router';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');
const LOGO_SIZE = width * 0.5; // 50% szerokości ekranu

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>

        {/* Logo */}
        <Image
          source={require('../assets/images/icon.png')}
          style={styles.logo}
          resizeMode="contain"
        />

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

          {/* Kontener z dwoma przyciskami obok siebie */}
          <View style={styles.horizontalButtonsContainer}>
            <Link href="/cognitivefunctions" asChild>
              <TouchableOpacity style={styles.smallButton1}>
                <Text style={styles.buttonText}>Funkcje kognitywne</Text>
              </TouchableOpacity>
            </Link>

            <Link href="/communication" asChild>
              <TouchableOpacity style={styles.smallButton}>
                <Text style={styles.buttonText}>Typy komunikacji</Text>
              </TouchableOpacity>
            </Link>
          </View>

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
    alignItems: 'center', // wyśrodkowanie logo i tekstów poziomo
  },
  logo: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    marginBottom: 20,

    shadowColor: '#6B3E07', // cień w ciepłym odcieniu
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 7,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#8B4513', // ceglany
    marginBottom: 60,
    textAlign: 'center',
  },
  buttonsContainer: {
    marginTop: 10,
    width: '100%', // aby przyciski rozciągały się na całą szerokość kontenera
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
  horizontalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 20,
    width: '100%',
  },

  smallButton: {
    backgroundColor: '#8B4513',
    width: '48%',       // około połowa kontenera
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',

    shadowColor: '#6B3E07',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 7,
  },

    smallButton1: {
    backgroundColor: '#8B4513',
    width: '48%',       // około połowa kontenera
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginRight: '4%', // odstęp między przyciskami

    shadowColor: '#6B3E07',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 7,
  },

  buttonText: {
    color: '#F5E1C9', // jasny tekst na ciemnym tle
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
});
