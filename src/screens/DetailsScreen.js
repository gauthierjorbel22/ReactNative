import React from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';

const DetailsScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Button title="Go To Home" onPress={() => navigation.navigate('Home')} />
      <Button
        title="Go To Books"
        onPress={() => navigation.navigate('Books')}
      />
      <Text>You can read details about your books here</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
  },
});
export default DetailsScreen;
