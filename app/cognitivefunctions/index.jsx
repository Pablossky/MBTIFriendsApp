import { Link } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { cognitiveFunctions } from '../../data/functionsData';

export default function CognitiveFunctionsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Funkcje poznawcze MBTI</Text>
        <Text style={styles.paragraph}>
          W teorii MBTI, każda osoba korzysta z czterech funkcji poznawczych, które wpływają na sposób, w jaki
          postrzega świat i podejmuje decyzje.
        </Text>
        <Text style={styles.paragraph}>
          Funkcje dzielą się na: Percepcyjne (Sensing, Intuition) i Decyzyjne (Thinking, Feeling), a także na formy:
          Ekstrawertyczna (e) i Introwertyczna (i).
        </Text>
        <Text style={styles.paragraph}>
          Przykład: Typ INFJ korzysta z funkcji Ni (intuicja introwertyczna) jako dominującej, a Fe (uczucia
          ekstrawertyczne) jako pomocniczej.
        </Text>

        {/* 🧠 Funkcje poznawcze jako karty */}
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
    marginBottom: 16,
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
    lineHeight: 22,
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
    color: '#5D4037',
  },
});
