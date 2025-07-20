import { Link } from 'expo-router';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { cognitiveFunctions } from '../../data/functionsData';

export default function CognitiveFunctionsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Funkcje poznawcze MBTI</Text>

        {/* 📘 Panel z wprowadzeniem */}
        <View style={styles.infoPanel}>
          <Text style={styles.infoText}>
            W teorii MBTI, każda osoba korzysta z czterech funkcji poznawczych,
            które wpływają na sposób, w jaki postrzega świat i podejmuje decyzje.
          </Text>

          <Text style={styles.infoText}>
            Funkcje dzielą się na: Percepcyjne (Sensing, Intuition) i Decyzyjne
            (Thinking, Feeling), a także na formy: Ekstrawertyczna (e) i
            Introwertyczna (i).
          </Text>

          <Text style={styles.infoText}>
            Przykład: Typ INFJ korzysta z funkcji Ni (intuicja introwertyczna)
            jako dominującej, a Fe (uczucia ekstrawertyczne) jako pomocniczej.
          </Text>
        </View>

        {/* 🧠 Karty z funkcjami poznawczymi */}
        {cognitiveFunctions.map((func) => (
          <Link key={func.id} href={`/cognitivefunctions/${func.id}`} asChild>
            <TouchableOpacity style={styles.card}>
              <Text style={styles.cardText}>{func.name}</Text>
            </TouchableOpacity>
          </Link>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5E1C9', // ciepły beż
  },
  container: {
    padding: 20,
    paddingVertical: 32,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#8B4513', // ciepły brąz
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  // 📘 Panel informacyjny
  infoPanel: {
    backgroundColor: '#FFE8D6', // bardzo jasny brzoskwiniowy
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  infoText: {
    fontSize: 15,
    color: '#4E342E', // ciemniejszy brąz
    lineHeight: 22,
    marginBottom: 10,
  textAlign: 'center', 
  },
  card: {
    backgroundColor: '#FFF3E0', // jasny kremowy
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#5D4037', // ciemny brąz
  },
});
