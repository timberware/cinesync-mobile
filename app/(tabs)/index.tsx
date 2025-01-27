import { View, Text, StyleSheet } from 'react-native';

const Tab = () => {
  return (
    <View style={styles.container}>
      <Text>Tab [Lists]</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Tab;
