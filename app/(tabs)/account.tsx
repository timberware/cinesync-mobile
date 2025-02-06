import { View, Text, StyleSheet, Button } from 'react-native';
import { useAuth } from '../auth/context/AuthContext';

const AccountScreen = () => {
  const { user, signOut } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.email}>Logged in as: {user?.id}</Text>
      <Text style={styles.email}>Logged in as: {user?.accessToken}</Text>
      <Text style={styles.email}>Logged in as: {user?.username}</Text>
      <Text style={styles.email}>Logged in as: {user?.email}</Text>
      <Button title="Sign Out" onPress={signOut} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  email: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default AccountScreen;
