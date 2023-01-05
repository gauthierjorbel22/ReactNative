import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Title: Love or Hate?</Text>
      <Text style={styles.text}>Author: Harmony Windell</Text>
      <Text style={styles.text}>Genre: Romance</Text>
      <Text style={styles.text}>Pages: 612</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'green',
  },
  text: {
    color: 'white',
  },
});
export default Header;
