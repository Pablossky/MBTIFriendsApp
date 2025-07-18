import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView, StyleSheet } from 'react-native';
import AvatarEditor from '../avatar-editor';

export default function EditAvatar() {
  const params = useLocalSearchParams();
  const friendId = params.id;

  return (
    <SafeAreaView style={styles.container}>
      <AvatarEditor friendId={friendId} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});
