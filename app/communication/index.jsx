import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function CommunicationScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Tytuł główny */}
      <Text style={styles.mainTitle}>Komunikacja</Text>

      {/* Wstęp teoretyczny */}
      <View style={styles.introBox}>
        <Text style={styles.introText}>
          Komunikacja jest kluczowym elementem interakcji międzyludzkich. 
          Typy MBTI wpływają na to, jak uczestniczymy w rozmowach, 
          jakie role pełnimy oraz jaki styl komunikacji preferujemy. 
          Poznanie tych różnic pomaga lepiej zrozumieć siebie i innych.
        </Text>
      </View>

      {/* 🧠 Sekcja: Rola Komunikacyjna */}
      <Text style={styles.sectionTitle}>🧠 Rola Komunikacyjna</Text>
      <View style={styles.table}>
        <Row headers={['Rola', 'Opis', 'Typowe MBTI']} />
        <Row data={['Zarządzający', 'Kierują rozmową, liderzy.', 'ENTJ, ESTJ, ENFJ, ESTP']} />
        <Row data={['Zaczynający', 'Wprowadzają nowe tematy.', 'ENFP, ESFP, ENTP, ESFJ']} />
        <Row data={['Finalizujący', 'Zamykają tematy, podsumowują.', 'ISTJ, INFJ, INTJ, ISTP']} />
        <Row data={['Tło', 'Analizują, wspierają z boku.', 'ISFJ, INFP, INTP, ISFP']} />
      </View>

      {/* 💬 Sekcja: Styl Komunikacji */}
      <Text style={styles.sectionTitle}>💬 Styl Komunikacji</Text>
      <View style={styles.table}>
        <Row headers={['Styl', 'Opis']} />
        <Row data={['Inicjujący', 'Zaczynają rozmowy, zagadują.']} />
        <Row data={['Odpowiadający', 'Reagują na pytania, nie inicjują.']} />
        <Row data={['Ruch', 'Zmieniają tematy, są elastyczni.']} />
        <Row data={['Kontrola', 'Trzymają się tematu, mają plan.']} />
        <Row data={['Informujący', 'Sugerują, opisują, wrzucają dane.']} />
        <Row data={['Bezpośredni', 'Mówią jasno i konkretnie.']} />
      </View>

      {/* 👥 Sekcja: Grupy Komunikacyjne */}
      <Text style={styles.sectionTitle}>👥 Grupy Komunikacyjne</Text>
      <View style={styles.table}>
        <Row headers={['Grupa', 'Typy MBTI', 'Cechy']} />
        <Row data={['Strażnicy (SJ)', 'ISTJ, ISFJ, ESTJ, ESFJ', 'Zorganizowani, lojalni, praktyczni']} />
        <Row data={['Rzemieślnicy (SP)', 'ISTP, ISFP, ESTP, ESFP', 'Szybcy, spontaniczni, działający']} />
        <Row data={['Analitycy (NT)', 'INTJ, INTP, ENTJ, ENTP', 'Logiczni, niezależni, strategiczni']} />
        <Row data={['Dyplomaci (NF)', 'INFJ, INFP, ENFJ, ENFP', 'Empatyczni, kreatywni, relacyjni']} />
      </View>
    </ScrollView>
  );
}

function Row({ headers, data }) {
  return (
    <View style={[styles.row, headers ? styles.headerRow : styles.dataRow]}>
      {(headers || data).map((cell, index) => (
        <View key={index} style={styles.cell}>
          <Text style={[styles.cellText, headers ? styles.headerText : styles.dataText]}>
            {cell}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F5E1C9', // Ciepły beż
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#8B4513', // Ciepły brąz
    textAlign: 'center',
    marginBottom: 16,
    marginTop: 32,
  },
  introBox: {
    backgroundColor: '#FFE8D6',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  introText: {
    fontSize: 16,
    color: '#4E342E',
    lineHeight: 22,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B4513', // Ciepły brąz
    marginBottom: 12,
    marginTop: 24,
    textAlign: 'center',
  },
  table: {
    backgroundColor: '#FFE8D6',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
  },
  headerRow: {
    backgroundColor: '#FFCCB6',
  },
  dataRow: {
    backgroundColor: '#FFF3E0',
    borderTopWidth: 1,
    borderTopColor: '#F5CBA7',
  },
  cell: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#FFDAB9',
  },
  cellText: {
    fontSize: 14,
  },
  headerText: {
    fontWeight: 'bold',
    color: '#5D4037',
    fontSize: 15,
    textAlign: 'center',
  },
  dataText: {
    color: '#4E342E',
    textAlign: 'center',
  },
});
