import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Button,
  Text,
} from 'react-native';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'MainDB',
    location: 'default',
  },
  () => {},
  error => {
    console.log(error);
  },
);
export default function BooksScreen({navigation, route}) {
  useEffect(() => {
    getData();
  }, []);
  const [results, setResults] = useState('');

  const getData = async () => {
    try {
      await db.transaction(tx => {
        tx.executeSql('SELECT * FROM Books', [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; i++) {
            temp.push(results.rows.item(i));
          }
          setResults(temp);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'whitesmoke'}}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Button
          title="Go To Home"
          onPress={() => navigation.navigate('Home')}
        />
        <View style={{padding: 20}}>
          <Text style={{textAlign: 'center', fontSize: 25, padding: 5}}>
            Books
          </Text>
          <View style>
            {Object.values(results).map(data => (
              <Text style={{backgroundColor: 'green', padding: 10}}>
                <Text style={styles.text}>Title: {data.Title}</Text> {'\n'}
                <Text style={styles.text}>Author: {data.Author}</Text>
                {'\n'}
                <Text style={styles.text}>Genre: {data.Genre}</Text>
                {'\n'}
                <Text style={styles.text}>
                  {' '}
                  Number Of Pages: {data.Pages}
                </Text>{' '}
                {'\n'}
                {console.log(data)}
              </Text>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#0080ff',
  },
  logo: {
    width: 200,
    height: 100,
    margin: 20,
  },
  text: {
    fontSize: 15,
    marginBottom: 30,
  },
  input: {
    width: 300,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
  },
});
